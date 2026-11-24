import type { EntryKind, VaultEntry } from "@/lib/vault";

export function createEmptyEntry(kind: EntryKind): VaultEntry {
  return { id: crypto.randomUUID(), kind, title: "", favorite: false, updatedAt: new Date().toISOString() };
}

export function entryIcon(kind: EntryKind) { return kind === "bank" ? "B" : kind === "note" ? "N" : "L"; }

export function entrySubtitle(entry: VaultEntry) {
  if (entry.kind === "login") return entry.username || entry.website || "Login";
  if (entry.kind === "bank") return `Account ending ${entry.accountNumber?.slice(-4) || "not added"}`;
  return `Updated ${new Date(entry.updatedAt).toLocaleDateString()}`;
}

export function randomPassword(length: number, upper: boolean, numbers: boolean, symbols: boolean) {
  const characters = "abcdefghijklmnopqrstuvwxyz" + (upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") + (numbers ? "0123456789" : "") + (symbols ? "!@#$%^&*_-+=" : "");
  return Array.from(crypto.getRandomValues(new Uint32Array(length)), number => characters[number % characters.length]).join("");
}
