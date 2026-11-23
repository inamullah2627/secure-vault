import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "SecureVault — Private Offline Password Manager",
  description:
    "Store passwords, bank details, and private notes in an encrypted vault that stays on your device.",
};

const steps = [
  {
    title: "Create a master password",
    body: "Choose one strong password. It is never stored and cannot be recovered.",
  },
  {
    title: "Save your information",
    body: "Add logins, bank details and notes. Each item is encrypted before it is stored.",
  },
  {
    title: "Access it locally",
    body: "Unlock with your master password, even without an internet connection.",
  },
];

const features = [
  ["Encrypted password storage", "Logins stored as AES-256 encrypted records on your device."],
  ["Banking information", "Bank accounts and details, hidden until you choose to show them."],
  ["Secure notes", "Recovery codes, API keys and private notes in one place."],
  ["Password generator", "Create strong, random passwords in your browser."],
  ["Password health", "Find weak and reused passwords in your vault."],
  ["Encrypted backup", "Export an encrypted file and restore it any time."],
];

const reasons = [
  ["Local-first privacy", "Your vault lives on your device, not on our servers."],
  ["Simple interface", "Set up in minutes, with no technical knowledge needed."],
  ["No tracking inside the vault", "No analytics or ads in the vault screens."],
  ["You control your backup", "You decide where your encrypted backup is kept."],
];

const faqs = [
  ["Where is my data stored?", "In your browser’s local database on your own device, encrypted."],
  ["Can you see my passwords?", "No. Your vault is encrypted on your device and never sent to us."],
  ["What happens if I forget the master password?", "It cannot be recovered, so keep it safe and keep an encrypted backup."],
  ["Can I use it offline?", "Yes. Once loaded, the vault works without an internet connection."],
  ["How do backups work?", "You export an encrypted file and restore it later with your master password."],
];

function ContentCard({ title, body }: { title: string; body: string }) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function VaultPreview() {
  const entries = [
    ["G", "GitHub", "dev@example.com"],
    ["B", "Bank account", "Account ending 4821"],
    ["A", "API key", "Production"],
  ];

  return (
    <div className={styles.preview} role="img" aria-label="SecureVault app preview">
      <div className={styles.previewHeader}>
        <strong>Vault</strong>
        <span className={styles.tag}>Auto-locks in 4:32</span>
      </div>
      {entries.map(([letter, title, description]) => (
        <div className={styles.previewEntry} key={title}>
          <span className={styles.previewIcon}>{letter}</span>
          <span>
            <strong>{title}</strong>
            <small>{description}</small>
          </span>
        </div>
      ))}
      <div className={styles.healthTrack} aria-hidden="true">
        <span />
      </div>
      <small className={styles.previewHealth}>Password health: 78 / 100</small>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.site}>
      <SiteHeader />
      <main>
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.tag}>Offline-first password manager</span>
              <h1>Your passwords stay on your device</h1>
              <p>
                SecureVault encrypts your passwords, bank details and notes with AES-256 in your browser. No account,
                no server and no tracking inside the vault.
              </p>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} href="/app">Open Secure Vault</Link>
                <Link className={styles.secondaryButton} href="/password-generator">Generate Password</Link>
              </div>
            </div>
            <VaultPreview />
          </div>
        </section>

        <section className={styles.trustBar} aria-label="SecureVault benefits">
          <ul className={styles.container}>
            <li>AES-256 encryption</li>
            <li>Works offline</li>
            <li>No account required</li>
            <li>No data sent to a server</li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>How it works</h2>
            <p className={styles.sectionIntro}>Three steps, all inside your browser.</p>
            <div className={styles.threeColumnGrid}>
              {steps.map((step, index) => (
                <ContentCard key={step.title} title={`${index + 1}. ${step.title}`} body={step.body} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.alternateSection}`}>
          <div className={styles.container}>
            <h2>Main features</h2>
            <p className={styles.sectionIntro}>Everything you need to keep sensitive information organized and private.</p>
            <div className={styles.threeColumnGrid}>
              {features.map(([title, body]) => <ContentCard key={title} title={title} body={body} />)}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Why SecureVault</h2>
            <div className={styles.twoColumnGrid}>
              {reasons.map(([title, body]) => <ContentCard key={title} title={title} body={body} />)}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.protectionSection}`}>
          <div className={styles.container}>
            <div className={styles.protectionCopy}>
              <span className={styles.tag}>Designed for privacy</span>
              <h2>How your data is protected</h2>
              <p className={styles.sectionIntro}>
                Your master password derives an encryption key. Your data is encrypted with that key in your browser
                and only the encrypted result is stored on your device. Nothing is sent to a server.
              </p>
              <Link className={styles.secondaryButton} href="/security">Learn about security</Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.container} ${styles.faqContainer}`}>
            <h2>Frequently asked questions</h2>
            <div className={styles.faqList}>
              {faqs.map(([question, answer]) => (
                <details className={styles.faq} key={question} name="home-faq">
                  <summary>
                    <span>{question}</span>
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <h2>Create your private vault</h2>
              <p>Free to use, no account needed.</p>
              <Link className={styles.primaryButton} href="/app">Open Vault</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
