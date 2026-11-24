import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "SecureVault | Private Offline Password Manager",
  description:
    "Store passwords, bank details, and private notes in an encrypted vault that stays on your device.",
};

const steps = [
  {
    title: "Create a master password",
    body: "Choose one long, unique password to unlock your vault. We cannot recover it for you, so keep it somewhere safe.",
  },
  {
    title: "Save your information",
    body: "Add logins, bank details, recovery codes or private notes. Each item is encrypted before it is saved on your device.",
  },
  {
    title: "Access it locally",
    body: "Open your vault with the master password whenever you need it. Once loaded, your saved data can be accessed offline.",
  },
];

const features = [
  ["Encrypted password storage", "Keep every login in its own AES-256 encrypted record instead of reusing passwords or leaving them in unprotected notes."],
  ["Banking information", "Store account details in one private place and reveal sensitive information only when you need it."],
  ["Secure notes", "Keep recovery codes, API keys and information that does not belong in an ordinary notes app."],
  ["Password generator", "Create long, random passwords in your browser without trying to invent a memorable pattern."],
  ["Password health", "Quickly spot short or reused passwords so you know which accounts need attention first."],
  ["Encrypted backup", "Export an encrypted copy of your vault and use it to restore your information when needed."],
];

const reasons = [
  ["Local-first privacy", "Your working vault stays on your device instead of being stored in a SecureVault online account."],
  ["Simple by design", "Create a vault and start saving information in minutes. No technical setup or complicated menus."],
  ["A private vault experience", "There are no analytics or advertisements inside the screens where you manage sensitive information."],
  ["Your backup, your choice", "You decide when to create an encrypted backup and where that file should be kept."],
];

const faqs = [
  ["Where is my data stored?", "Your encrypted vault is stored in the browser’s local database on the device you are using. It is not saved in a SecureVault cloud account."],
  ["Can SecureVault see my passwords?", "No. Encryption happens on your device, and your saved vault data is not sent to SecureVault servers."],
  ["What if I forget my master password?", "It cannot be recovered or reset for you. Keep it safe and maintain an encrypted backup of the vault."],
  ["Can I use SecureVault offline?", "Yes. After the app has loaded, you can unlock and use your locally stored vault without an internet connection."],
  ["How do encrypted backups work?", "Export the vault as an encrypted file and store it somewhere you trust. Restoring it still requires the correct master password."],
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
              <span className={styles.tag}>Private, local-first password manager</span>
              <h1>Keep your passwords private and close to you</h1>
              <p>
                SecureVault gives you one encrypted place for passwords, bank details and private notes. Your vault is
                protected in your browser and stored on your device. No online account is required.
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
            <p className={styles.sectionIntro}>Start with one master password, then let the vault handle the rest.</p>
            <div className={styles.threeColumnGrid}>
              {steps.map((step, index) => (
                <ContentCard key={step.title} title={`${index + 1}. ${step.title}`} body={step.body} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.alternateSection}`}>
          <div className={styles.container}>
            <h2>Everything important, in one private vault</h2>
            <p className={styles.sectionIntro}>Useful tools for organizing sensitive information without making security feel complicated.</p>
            <div className={styles.threeColumnGrid}>
              {features.map(([title, body]) => <ContentCard key={title} title={title} body={body} />)}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Why people choose SecureVault</h2>
            <p className={styles.sectionIntro}>Privacy should be understandable. You should know where your data lives and who controls it.</p>
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
                Your master password is used to create the key that unlocks your vault. Encryption happens inside your
                browser, and only encrypted vault data is stored on the device. SecureVault does not receive your master
                password or a readable copy of the information you save.
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
              <h2>Ready to create your private vault?</h2>
              <p>Start with one strong master password. No signup or online account required.</p>
              <Link className={styles.primaryButton} href="/app">Open Vault</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
