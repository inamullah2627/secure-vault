import type { VaultEntry } from "@/lib/vault";

export default function PasswordHealth({ entries }: { entries: VaultEntry[] }) {
  const logins=entries.filter(entry=>entry.kind==="login");
  const weak=logins.filter(entry=>(entry.password?.length||0)<12).length;
  const reused=logins.filter((entry,index,all)=>entry.password&&all.findIndex(other=>other.password===entry.password)!==index).length;
  return <main className="solo"><h1>Password health</h1><section className="card health"><div className="score"><strong>{Math.max(0,100-weak*15-reused*10)}</strong><div><h2>{weak||reused?"Needs attention":"Looking strong"}</h2><p>Review weak and reused passwords regularly.</p></div></div><div className="stats"><div><b>{weak}</b><span>Weak passwords</span></div><div><b>{reused}</b><span>Reused passwords</span></div><div><b>{logins.length}</b><span>Total logins</span></div></div></section></main>;
}
