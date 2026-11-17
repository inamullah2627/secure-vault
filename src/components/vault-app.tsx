"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createVault, importVault, saveVault, unlockVault, vaultExists, type VaultData, type VaultEntry } from "@/lib/vault";
import AccessScreen from "./vault/access-screen";
import EntryForm from "./vault/entry-form";
import { BottomNavigation, Sidebar } from "./vault/navigation";
import PasswordGenerator from "./vault/password-generator";
import PasswordHealth from "./vault/password-health";
import SettingsScreen from "./vault/settings-screen";
import type { Page } from "./vault/types";
import { createEmptyEntry } from "./vault/utils";
import VaultWorkspace from "./vault/vault-workspace";

const listPages: Page[] = ["vault", "favorites", "logins", "banking", "notes"];

export default function VaultApp() {
  const [exists,setExists]=useState<boolean|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState("");
  const [key,setKey]=useState<CryptoKey|null>(null),[data,setData]=useState<VaultData|null>(null);
  const [page,setPage]=useState<Page>("vault"),[selected,setSelected]=useState(""),[query,setQuery]=useState("");
  const [editing,setEditing]=useState<VaultEntry|null>(null),[revealed,setRevealed]=useState(false),[toast,setToast]=useState("");
  const fileRef=useRef<HTMLInputElement>(null),timerRef=useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(()=>{vaultExists().then(setExists)},[]);
  const lock=useCallback(()=>{setKey(null);setData(null);setSelected("");setRevealed(false)},[]);
  const notify=(message:string)=>{setToast(message);setTimeout(()=>setToast(""),2200)};
  const persist=useCallback(async(next:VaultData)=>{if(!key)return;setData(next);await saveVault(key,next)},[key]);

  useEffect(()=>{if(!data)return;const reset=()=>{if(timerRef.current)clearTimeout(timerRef.current);timerRef.current=setTimeout(lock,data.settings.autoLockMinutes*60_000)};reset();addEventListener("pointerdown",reset);addEventListener("keydown",reset);return()=>{removeEventListener("pointerdown",reset);removeEventListener("keydown",reset);if(timerRef.current)clearTimeout(timerRef.current)}},[data,lock]);
  useEffect(()=>{if(!data?.settings.lockWhenHidden)return;const hidden=()=>document.hidden&&lock();document.addEventListener("visibilitychange",hidden);return()=>document.removeEventListener("visibilitychange",hidden)},[data,lock]);

  async function access(password:string){setBusy(true);setError("");try{const result=exists?await unlockVault(password):await createVault(password);setKey(result.key);setData(result.data);setExists(true)}catch{setError("Unable to open vault. Check your master password.")}finally{setBusy(false)}}

  const filtered=useMemo(()=>{if(!data)return[];return data.entries.filter(entry=>{const pageMatch=page==="vault"||page==="favorites"&&entry.favorite||page==="logins"&&entry.kind==="login"||page==="banking"&&entry.kind==="bank"||page==="notes"&&entry.kind==="note";return pageMatch&&JSON.stringify(entry).toLowerCase().includes(query.toLowerCase())})},[data,page,query]);
  const current=data?.entries.find(entry=>entry.id===selected)||filtered[0];

  if(!data||!key)return <AccessScreen exists={exists} busy={busy} error={error} onSubmit={access}/>;

  async function saveEntry(entry:VaultEntry){const found=data!.entries.some(item=>item.id===entry.id);await persist({...data!,entries:found?data!.entries.map(item=>item.id===entry.id?entry:item):[entry,...data!.entries]});setEditing(null);setSelected(entry.id);setPage(entry.kind==="login"?"logins":entry.kind==="bank"?"banking":"notes");notify("Item saved")}
  async function removeEntry(entry:VaultEntry){if(!confirm(`Delete “${entry.title}”?`))return;await persist({...data!,entries:data!.entries.filter(item=>item.id!==entry.id)});setSelected("");notify("Item deleted")}
  async function copy(value:string){await navigator.clipboard.writeText(value);notify("Copied to clipboard");setTimeout(()=>navigator.clipboard.writeText("").catch(()=>{}),data!.settings.clearClipboardSeconds*1000)}

  const workspace=listPages.includes(page)&&<VaultWorkspace page={page} setPage={setPage} query={query} setQuery={setQuery} entries={filtered} current={current} select={setSelected} add={kind=>setEditing(createEmptyEntry(kind))} lock={lock} revealed={revealed} reveal={()=>setRevealed(value=>!value)} copy={copy} edit={()=>current&&setEditing(current)} remove={()=>current&&void removeEntry(current)} favorite={()=>current&&void persist({...data,entries:data.entries.map(item=>item.id===current.id?{...item,favorite:!item.favorite}:item)})}/>;

  return <div className="shell"><Sidebar page={page} setPage={setPage} lock={lock}/>{workspace}{page==="generator"&&<PasswordGenerator notify={notify} savePassword={value=>setEditing({...createEmptyEntry("login"),password:value})}/>} {page==="health"&&<PasswordHealth entries={data.entries}/>} {page==="settings"&&<SettingsScreen data={data} persist={persist} lock={lock} restore={async event=>{const file=event.target.files?.[0];if(!file)return;await importVault(await file.text());lock();setExists(true)}} fileRef={fileRef}/>}<BottomNavigation page={page} setPage={setPage}/>{editing&&<EntryForm initial={editing} close={()=>setEditing(null)} save={entry=>void saveEntry(entry)}/>} {toast&&<div className="toast">{toast}</div>}</div>;
}
