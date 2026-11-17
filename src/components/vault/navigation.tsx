import Shield from "./shield";
import { pageLabels, type Page } from "./types";

export const navigation: [Page, string][] = [["vault","▣"],["favorites","☆"],["logins","↪"],["banking","▥"],["notes","▤"],["generator","✦"],["health","⌁"],["settings","⚙"]];

export function Sidebar({ page, setPage, lock }: { page: Page; setPage: (page: Page) => void; lock: () => void }) {
  return <aside className="sidebar"><div className="brand"><Shield compact/><b>SecureVault</b></div><nav>{navigation.map(([target,icon],index)=><div key={target}>{index===5&&<hr/>}<button className={target===page?"active":""} onClick={()=>setPage(target)}><span>{icon}</span>{pageLabels[target]}</button></div>)}</nav><button className="lock" onClick={lock}>Lock now</button></aside>;
}

export function BottomNavigation({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return <nav className="bottom">{(["vault","generator","health","settings"] as Page[]).map(target=><button key={target} className={target===page?"active":""} onClick={()=>setPage(target)}><span>{navigation.find(item=>item[0]===target)?.[1]}</span><small>{pageLabels[target]}</small></button>)}</nav>;
}
