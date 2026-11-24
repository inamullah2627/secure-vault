import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./security.module.css";

export const metadata: Metadata = {
  title: "Security & Privacy – How SecureVault Protects Data",
  description: "Learn how SecureVault encrypts your vault in the browser, what stays on your device, and the limits of local-first security.",
};

const howItWorks = [
  ["Master password", "Typed by you and never stored."],
  ["Key derivation", "PBKDF2-SHA-256 with a random salt creates the key."],
  ["Encryption", "AES-GCM 256-bit with a unique IV for every record."],
  ["Browser storage", "Only encrypted data is saved in IndexedDB."],
];

const encryptionDetails = [
  ["AES-GCM 256-bit", "Authenticated encryption that also detects tampering."],
  ["PBKDF2-SHA-256", "Slows down guessing of the master password."],
  ["Random salt", "Each vault has its own salt."],
  ["Unique IV", "A new initialization vector for every encrypted item."],
  ["IndexedDB", "Encrypted records stay in your browser storage."],
];

const protections = [
  ["Reading the stored vault", "Stored data is unreadable without the master password."],
  ["Exposed device data", "Data on disk is encrypted, not plain text."],
  ["Casual access", "Auto-lock and hidden fields reduce shoulder surfing."],
];

const limitations = [
  ["Malware or a compromised browser", "Cannot be fully protected against."],
  ["Forgotten master password", "It cannot be recovered."],
  ["Weak master password", "It reduces security a lot."],
  ["Shared devices", "Others with access may see an unlocked vault."],
];

const privacySummary = [
  ["What we collect", "[List, for example anonymous page analytics on this website.]"],
  ["What we do not collect", "Vault contents and master passwords."],
  ["Analytics and cookies", "[Describe analytics and cookie use.]"],
  ["Advertising disclosure", "[If AdSense is used: ads appear on public pages only, never inside the vault.]"],
];

const bestPractices = [
  ["Strong master password", "Use a long passphrase."],
  ["Regular encrypted backups", "Keep a copy off the device."],
  ["Trusted device", "Avoid public computers."],
  ["Updated browser", "Install security updates."],
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
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Security &amp; Privacy</span>
      </nav>

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Designed to keep your data on your device</h1>
          <p>SecureVault is local-first: your vault is encrypted in your browser and stored on your device. This page explains what it does, and what it cannot do.</p>
        </section>

        <section className={styles.section}>
          <h2>How it works</h2>
          <p className={styles.flow}>Master password <span>→</span> Key derivation <span>→</span> Encryption <span>→</span> Browser storage</p>
          <div className={styles.fourGrid}>
            {howItWorks.map(([title, body]) => <Card key={title} title={title} body={body} />)}
          </div>
        </section>

        <CardSection title="Encryption details" items={encryptionDetails} />

        <section className={styles.section}>
          <h2>What leaves your device</h2>
          <div className={styles.deviceCard}>
            <div><span>Vault data</span><strong>Nothing</strong></div>
            <div><span>Master password</span><strong>Nothing</strong></div>
            <div><span>Backup</span><strong className={styles.warning}>Encrypted file only, saved by you</strong></div>
          </div>
        </section>

        <CardSection title="What SecureVault protects against" items={protections} columns={3} />
        <CardSection title="Limitations and threat model" intro="We list these openly so you can decide what is right for you." items={limitations} />
        <CardSection title="Privacy policy summary" items={privacySummary} />
        <CardSection title="Security best practices" items={bestPractices} />

        <section className={styles.report}>
          <h2>Report a vulnerability</h2>
          <p>Email security@[yourdomain].com with steps to reproduce. Please allow us a reasonable time to fix the issue before sharing it publicly.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
