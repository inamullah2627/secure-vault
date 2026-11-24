import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./security.module.css";

export const metadata: Metadata = {
  title: "SecureVault Security | How Your Vault Is Protected",
  description: "Learn how SecureVault uses local encryption, secure key derivation and browser storage to protect passwords and private vault information.",
};

const howItWorks = [
  ["You enter the master password", "The password is used on your device to unlock the vault. SecureVault does not save a readable copy of it."],
  ["A secure key is created", "PBKDF2 with SHA-256, 600,000 iterations and a random salt derives the encryption key from your master password."],
  ["The complete vault is encrypted", "AES-GCM with a 256-bit key encrypts the vault before it is written to browser storage."],
  ["Encrypted data is stored locally", "IndexedDB stores the encrypted vault record in the browser profile you are currently using."],
];

const encryptionDetails = [
  ["AES-GCM with a 256-bit key", "This authenticated encryption protects confidentiality and causes decryption to fail when encrypted data has been altered."],
  ["PBKDF2 with SHA-256", "The key derivation process performs 600,000 iterations to make repeated master password guesses more expensive."],
  ["Random vault salt", "A new random salt is created when the vault is set up, so the same master password does not produce the same derived key across separate vaults."],
  ["Fresh IV for every save", "SecureVault creates a new random initialization vector whenever the complete vault record is encrypted and saved."],
  ["Local IndexedDB storage", "The encrypted record remains in the current browser profile unless you export it yourself as an encrypted backup."],
];

const protections = [
  ["Someone reading browser storage", "The saved record is encrypted rather than stored as readable passwords, account details or notes."],
  ["A lost encrypted backup", "The exported backup remains encrypted and still requires the correct master password to open."],
  ["Casual access to an open device", "Auto-lock settings, hidden sensitive fields and the option to lock when the tab is hidden help reduce accidental exposure."],
];

const limitations = [
  ["Malware or a compromised browser", "Malicious software may capture information after you unlock the vault. SecureVault cannot make an infected device safe."],
  ["A forgotten master password", "There is no password reset or recovery back door. If you lose the master password, the encrypted vault may become inaccessible."],
  ["A weak or reused master password", "Encryption cannot compensate for an easy password. Use a long, unique passphrase that is never used on another account."],
  ["Shared or unlocked devices", "Anyone with access to an unlocked vault may view or copy its contents. Lock the vault and the device when you step away."],
];

const bestPractices = [
  ["Create a strong master password", "Use a long and unique passphrase. Do not reuse it for email, social media or any other account."],
  ["Keep encrypted backups", "Export a current backup and store it away from the original device. Test your recovery process before you need it."],
  ["Use a device you trust", "Avoid unlocking the vault on public or shared computers, and keep your own device protected with a screen lock."],
  ["Install security updates", "Keep the browser, operating system and extensions updated. Remove extensions you no longer use or trust."],
];

function Card({ title, body }: { title: string; body: string }) {
  return <article className={styles.card}><h3>{title}</h3><p>{body}</p></article>;
}

function CardSection({ title, intro, items, columns = 4 }: { title: string; intro?: string; items: string[][]; columns?: 3 | 4 }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {intro && <p className={styles.intro}>{intro}</p>}
      <div className={columns === 3 ? styles.threeGrid : styles.fourGrid}>
        {items.map(([itemTitle, body]) => <Card key={itemTitle} title={itemTitle} body={body} />)}
      </div>
    </section>
  );
}

export default function SecurityPage() {
  return (
    <div className={styles.site}>
      <SiteHeader active="/security" />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Security</span>
      </nav>

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Security built around an encrypted local vault</h1>
          <p>SecureVault protects your saved passwords, banking details and private notes with encryption inside your browser. The encrypted vault remains in your browser profile, and the master password is not stored as readable text.</p>
        </section>

        <section className={styles.section}>
          <h2>How it works</h2>
          <p className={styles.flow}>Master password <span>→</span> Key derivation <span>→</span> Encryption <span>→</span> Browser storage</p>
          <div className={styles.fourGrid}>
            {howItWorks.map(([title, body]) => <Card key={title} title={title} body={body} />)}
          </div>
        </section>

        <CardSection title="How SecureVault encryption works" intro="These are the protections currently used by the vault, explained without hiding the technical details." items={encryptionDetails} />

        <section className={styles.section}>
          <h2>Your vault remains local and encrypted</h2>
          <div className={styles.deviceCard}>
            <div><span>Readable vault contents</span><strong>Not sent</strong></div>
            <div><span>Master password</span><strong>Not sent</strong></div>
            <div><span>Encrypted backup</span><strong className={styles.warning}>Exported and stored only when you choose</strong></div>
          </div>
        </section>

        <CardSection title="What SecureVault helps protect" intro="These safeguards reduce common risks, but no password manager can remove every threat." items={protections} columns={3} />
        <CardSection title="Important security limitations" intro="Understanding these limits helps you use the vault safely and choose the right protection for your information." items={limitations} />
        <CardSection title="How to protect your vault" items={bestPractices} />

        <section className={styles.report}>
          <h2>Report a vulnerability</h2>
          <p>If you discover a security issue, share a clear description, the affected page and safe steps for reproducing it with the SecureVault project owner. Please avoid including real passwords or private vault data in your report, and allow reasonable time for investigation before public disclosure.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
