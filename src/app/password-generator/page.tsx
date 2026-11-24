import type { Metadata } from "next";
import Link from "next/link";
import PasswordGeneratorTool from "@/components/website/password-generator-tool";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./password-generator.module.css";

export const metadata: Metadata = {
  title: "Free Secure Password Generator | SecureVault",
  description: "Create strong, random passwords privately in your browser. Choose length, numbers, symbols and character options.",
};

const tips = [
  ["Use a long password", "Aim for 16 characters or more."],
  ["Make each one unique", "One password per account."],
  ["Never reuse passwords", "One leak should not open every account."],
  ["Use a password manager", "You only remember one master password."],
];

const guides = [
  ["How to create a strong password", "A practical step-by-step guide."],
  ["Passphrase vs password", "Which one should you use?"],
  ["The risks of password reuse", "What happens when one site is breached."],
];

const faqs = [
  ["Is a generated password safe?", "Yes, when it is long, random and used on only one account."],
  ["What is the recommended length?", "At least 16 characters for most accounts."],
  ["Is the generated password saved?", "No. It exists only on your screen until you save it yourself."],
];

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className={styles.infoCard}>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export default function PasswordGeneratorPage() {
  return (
    <div className={styles.site}>
      <SiteHeader active="/password-generator" />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Password Generator</span>
      </nav>
      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1>Secure Password Generator</h1>
            <p>Create strong, random passwords in your browser. Choose the length and character types, then copy the result. Nothing is sent or saved.</p>
          </div>
        </section>

        <section className={styles.toolSection}>
          <div className={styles.container}>
            <PasswordGeneratorTool />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Your privacy</h2>
            <div className={styles.privacyCard}>
              <span className={styles.privacyIcon} aria-hidden="true">✓</span>
              <p>This password is generated in your browser. It is not sent to a server and it is not saved.</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.alternate}`}>
          <div className={styles.container}>
            <h2>Password tips</h2>
            <div className={styles.twoColumnGrid}>
              {tips.map(([title, body]) => <InfoCard key={title} title={title} body={body} />)}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Related guides</h2>
            <div className={styles.threeColumnGrid}>
              {guides.map(([title, body]) => <InfoCard key={title} title={title} body={body} />)}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`}>
          <div className={styles.container}>
            <h2>Password generator FAQ</h2>
            <div className={styles.faqList}>
              {faqs.map(([question, answer]) => (
                <details className={styles.faq} name="generator-faq" key={question}>
                  <summary><span>{question}</span><span className={styles.faqIcon} aria-hidden="true" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <h2>Save passwords securely</h2>
              <p>Store your new password in an encrypted vault on your device.</p>
              <Link href="/app">Open Vault</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
