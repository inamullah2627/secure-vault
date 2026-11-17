export type EntryKind = "login" | "bank" | "note";

export type VaultEntry = {
  id: string;
  kind: EntryKind;
  title: string;
  favorite: boolean;
  username?: string;
  password?: string;
  website?: string;
  bankName?: string;
  accountTitle?: string;
  accountNumber?: string;
  iban?: string;
  note?: string;
  updatedAt: string;
};

export type VaultSettings = {
  autoLockMinutes: number;
  clearClipboardSeconds: number;
  lockWhenHidden: boolean;
};

export type VaultData = { entries: VaultEntry[]; settings: VaultSettings };

type StoredVault = {
  version: 1;
  salt: string;
  iv: string;
  ciphertext: string;
};

const DB_NAME = "secure-vault";
const STORE = "vault";
const RECORD_ID = "primary";
const ITERATIONS = 600_000;

const encode = (bytes: Uint8Array) => {
  let value = "";
  bytes.forEach((byte) => (value += String.fromCharCode(byte)));
  return btoa(value);
};
const decode = (value: string) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readRecord(): Promise<StoredVault | undefined> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).get(RECORD_ID);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function writeRecord(record: StoredVault): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).put(record, RECORD_ID);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function deriveKey(password: string, salt: Uint8Array) {
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function vaultExists() { return Boolean(await readRecord()); }

export async function createVault(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, salt);
  const data: VaultData = { entries: [], settings: { autoLockMinutes: 5, clearClipboardSeconds: 30, lockWhenHidden: true } };
  await saveVault(key, data, salt);
  return { key, data };
}

export async function unlockVault(password: string) {
  const record = await readRecord();
  if (!record) throw new Error("No vault exists on this device.");
  const key = await deriveKey(password, decode(record.salt));
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: decode(record.iv) }, key, decode(record.ciphertext));
  return { key, data: JSON.parse(new TextDecoder().decode(plaintext)) as VaultData };
}

export async function saveVault(key: CryptoKey, data: VaultData, existingSalt?: Uint8Array) {
  const old = await readRecord();
  const salt = existingSalt ?? (old ? decode(old.salt) : crypto.getRandomValues(new Uint8Array(16)));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(data)));
  await writeRecord({ version: 1, salt: encode(salt), iv: encode(iv), ciphertext: encode(new Uint8Array(ciphertext)) });
}

export async function exportVault() {
  const record = await readRecord();
  if (!record) throw new Error("No vault to export.");
  return JSON.stringify({ format: "securevault-backup", ...record }, null, 2);
}

export async function importVault(text: string) {
  const parsed = JSON.parse(text) as StoredVault & { format?: string };
  if (parsed.format !== "securevault-backup" || parsed.version !== 1 || !parsed.salt || !parsed.iv || !parsed.ciphertext) throw new Error("Invalid backup file.");
  await writeRecord({ version: 1, salt: parsed.salt, iv: parsed.iv, ciphertext: parsed.ciphertext });
}

export async function eraseVault() {
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).delete(RECORD_ID);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
