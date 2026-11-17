import type { EntryKind, VaultEntry } from "@/lib/vault";
import EntryDetail from "./entry-detail";
import { pageLabels, type Page } from "./types";
import { entryIcon, entrySubtitle } from "./utils";

type Props = { page: Page; query: string; setQuery: (value:string)=>void; entries: VaultEntry[]; current?: VaultEntry; select:(id:string)=>void; add:(kind:EntryKind)=>void; lock:()=>void; revealed:boolean; reveal:()=>void; copy:(value:string)=>void; edit:()=>void; remove:()=>void; favorite:()=>void };
export default function VaultWorkspace(props: Props) {
  const { page,query,setQuery,entries,current,select,add,lock,revealed,reveal,copy,edit,remove,favorite }=props;
  const kind:EntryKind=page==="banking"?"bank":page==="notes"?"note":"login";
  return <main className="workspace"><div className="mobile-top"><b>{pageLabels[page]}</b><button onClick={lock}>Lock now</button></div><div className="search"><span>⌕</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search vault"/></div><div className="split"><section className="list"><div>{entries.map(entry=><button key={entry.id} className={`item ${current?.id===entry.id?"selected":""}`} onClick={()=>select(entry.id)}><i>{entryIcon(entry.kind)}</i><span><b>{entry.title}</b><small>{entrySubtitle(entry)}</small></span></button>)}{!entries.length&&<p className="empty">No items here yet.</p>}</div><button className="primary add" onClick={()=>add(kind)}>Add item</button></section><section className="detail-pane">{current?<EntryDetail entry={current} revealed={revealed} reveal={reveal} copy={copy} edit={edit} remove={remove} favorite={favorite}/>:<div className="empty-detail"><h2>Your vault is empty</h2><p>Add your first secure item to get started.</p></div>}</section></div></main>;
}
