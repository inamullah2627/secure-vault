export default function Shield({ compact = false }: { compact?: boolean }) {
  const size = compact ? 32 : 46;
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11l16-6Z" stroke="#5EEAD4" strokeWidth="3"/><path d="m17 24 5 4 9-9" stroke="#5EEAD4" strokeWidth="3" strokeLinecap="round"/></svg>;
}
