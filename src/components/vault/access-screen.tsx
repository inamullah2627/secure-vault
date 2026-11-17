"use client";

import { FormEvent, useState } from "react";
import Shield from "./shield";

type Props = { exists: boolean | null; busy: boolean; error: string; onSubmit: (password: string) => void };

export default function AccessScreen({ exists, busy, error, onSubmit }: Props) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); if (!exists && password !== confirmation) return; onSubmit(password); }
  return <main className="unlock"><form className="unlock-card" onSubmit={submit}><Shield/><h1>SecureVault</h1><p>{exists ? "Your passwords, encrypted on this device." : "Create your private offline vault."}</p><label htmlFor="pw">Master password</label><input id="pw" type="password" value={password} onChange={event=>setPassword(event.target.value)} minLength={8} required placeholder={exists ? "Enter master password" : "Minimum 8 characters"} autoComplete={exists?"current-password":"new-password"}/>{exists===false&&<><label htmlFor="confirm" className="second-label">Confirm master password</label><input id="confirm" type="password" value={confirmation} onChange={event=>setConfirmation(event.target.value)} minLength={8} required placeholder="Repeat master password" autoComplete="new-password"/>{confirmation&&password!==confirmation&&<span className="form-error">Passwords do not match.</span>}</>}<button className="primary" disabled={busy||exists===null}>{busy?"Please wait…":exists?"Unlock vault":"Create vault"}</button>{error&&<span className="form-error">{error}</span>}<small>AES-256 encryption. Nothing leaves your device, and it works offline. A forgotten master password cannot be recovered.</small></form></main>;
}
