import type { Metadata } from "next";
import Link from "next/link";
import PasswordGeneratorTool from "@/components/website/password-generator-tool";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./password-generator.module.css";

export const metadata: Metadata = {
  title: "Free Secure Password Generator | SecureVault",
  description: "Create a strong random password for free. Choose the length and character types, then copy it securely from your browser.",
};

const tips = [
  ["Choose 16 characters or more", "A longer password gives attackers far more combinations to guess. Use the longest length the website supports."],
  ["Create a new one for every account", "Your email, bank and social accounts should never share the same password."],
  ["Keep personal details out", "Names, birthdays, phone numbers and familiar words are easier to predict than random characters."],
  ["Save it in a password manager", "A secure vault remembers random passwords for you, so there is no reason to make them simple or reusable."],
];

const guides = [
  ["How to create a strong password", "Nine practical tips for stronger, more secure logins."],
  ["What is a password manager?", "Learn how an encrypted vault stores and organizes your passwords."],
  ["Password security guide", "Protect your most important accounts in the right order."],
];

const faqs = [
  ["Is a generated password secure?", "A long password created with secure browser randomness is much harder to predict than one based on a name, word or date. Use it for only one account."],
  ["How long should my password be?", "Choose at least 16 characters. For important accounts, use 20 or more characters when the website allows it."],
  ["Should I include numbers and symbols?", "Yes, when the website accepts them. Using several character types increases the number of possible passwords, while length and uniqueness remain most important."],
  ["Does SecureVault save generated passwords?", "No. The password is created in your browser and stays on the screen until you copy it or save it yourself."],
  ["Can I use the same generated password twice?", "No. Generate a fresh password for every account so a breach on one website cannot unlock another."],
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
            <h1>Free Secure Password Generator</h1>
            <p>Create a strong, random password in seconds. Choose your preferred length and character types, then copy the result when it feels right for the account.</p>
          </div>
        </section>

        <section className={styles.toolSection}>
          <div className={styles.container}>
            <PasswordGeneratorTool />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Your password stays private</h2>
            <div className={styles.privacyCard}>
              <span className={styles.privacyIcon} aria-hidden="true">✓</span>
              <p>The generator runs inside your browser. Your password is not sent to a SecureVault server or automatically saved anywhere.</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.alternate}`}>
          <div className={styles.container}>
            <h2>How to use your new password safely</h2>
            <div className={styles.twoColumnGrid}>
              {tips.map(([title, body]) => <InfoCard key={title} title={title} body={body} />)}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Learn more about password security</h2>
            <div className={styles.threeColumnGrid}>
              {guides.map(([title, body]) => <InfoCard key={title} title={title} body={body} />)}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`}>
          <div className={styles.container}>
            <h2>Secure password generator FAQs</h2>
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
              <h2>Do not lose your new password</h2>
              <p>Save it in an encrypted vault on your device instead of writing it in an unprotected note.</p>
              <Link href="/app">Open Vault</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
