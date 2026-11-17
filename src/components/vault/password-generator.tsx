"use client";

import { useState } from "react";
import { randomPassword } from "./utils";

export default function PasswordGenerator({ savePassword, notify }: { savePassword:(value:string)=>void; notify:(value:string)=>void }) {
  const [length,setLength]=useState(16),[upper,setUpper]=useState(true),[numbers,setNumbers]=useState(true),[symbols,setSymbols]=useState(true),[password,setPassword]=useState(()=>randomPassword(16,true,true,true));
  const generate=()=>setPassword(randomPassword(length,upper,numbers,symbols));
  return <main className="solo"><h1>Password generator</h1><section className="card generator"><div className="password"><b>{password}</b><span>Strong</span><button onClick={()=>{void navigator.clipboard.writeText(password);notify("Password copied")}}>Copy</button></div><div className="gen-actions"><button onClick={generate}>Regenerate</button><button className="primary" onClick={()=>savePassword(password)}>Save to vault</button></div><label className="length"><span>Length</span><b>{length} characters</b></label><input className="range" type="range" min="8" max="40" value={length} onChange={event=>setLength(+event.target.value)}/><div className="checks"><label><input type="checkbox" checked={upper} onChange={event=>setUpper(event.target.checked)}/>Uppercase</label><label><input type="checkbox" defaultChecked/>Lowercase</label><label><input type="checkbox" checked={numbers} onChange={event=>setNumbers(event.target.checked)}/>Numbers</label><label><input type="checkbox" checked={symbols} onChange={event=>setSymbols(event.target.checked)}/>Symbols</label></div></section></main>;
}
