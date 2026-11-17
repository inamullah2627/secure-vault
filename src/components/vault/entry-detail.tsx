import type { VaultEntry } from "@/lib/vault";

type FieldProps = { label: string; value?: string; secret?: boolean; revealed: boolean; reveal: () => void; copy: (value: string) => void };
function DetailField({ label, value, secret = false, revealed, reveal, copy }: FieldProps) { return <div className="field"><label>{label}</label><div><span>{secret&&!revealed?"••••••••••••":value||"—"}</span>{secret&&<button onClick={reveal}>{revealed?"Hide":"Show"}</button>}<button onClick={()=>copy(value||"")}>Copy</button></div></div>; }

type Props = { entry: VaultEntry; revealed: boolean; reveal: () => void; copy: (value: string) => void; edit: () => void; remove: () => void; favorite: () => void };
export default function EntryDetail({ entry, revealed, reveal, copy, edit, remove, favorite }: Props) {
  const field = (label:string,value?:string,secret=false)=><DetailField label={label} value={value} secret={secret} revealed={revealed} reveal={reveal} copy={copy}/>;
  return <div className="detail"><header className="detail-head"><h2>{entry.title}</h2><div><button onClick={favorite}>{entry.favorite?"★ Favorite":"☆ Favorite"}</button><button onClick={edit}>Edit</button><button className="danger" onClick={remove}>Delete</button></div></header>{entry.kind==="login"&&<>{field("Username",entry.username)}{field("Password",entry.password,true)}{field("Website",entry.website)}</>}{entry.kind==="bank"&&<>{field("Bank name",entry.bankName)}{field("Account title",entry.accountTitle)}{field("Account number",entry.accountNumber,true)}{field("IBAN",entry.iban,true)}</>}{entry.kind==="note"&&<><div className="note-secret">{revealed?entry.note||"Empty note":"•••••••••••••••••••••••••"}</div><div className="note-buttons"><button onClick={reveal}>{revealed?"Hide note":"Show note"}</button><button onClick={()=>copy(entry.note||"")}>Copy</button></div></>}</div>;
}
