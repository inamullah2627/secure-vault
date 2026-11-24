import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact SecureVault | Questions, Feedback and Security Reports",
  description: "Contact SecureVault with product questions, feedback or a responsible security report. Never include passwords or private vault data.",
};

const contactReasons = [
  ["Product questions", "Ask how local storage, encrypted backups or the password tools work before you begin."],
  ["Feedback and ideas", "Share what feels useful, what feels unclear and which practical improvement would help you most."],
  ["Security reports", "Report a possible vulnerability privately with clear and safe steps that help us investigate it."],
];

const beforeSending = [
  ["Protect private information", "Never send your master password, generated passwords, recovery codes, banking details or an exported vault file."],
  ["Include useful context", "Mention the page, browser and device involved, what you expected to happen and what happened instead."],
  ["Keep security testing safe", "Do not access another person’s data, disrupt the service or publicly disclose an issue before it can be reviewed."],
];

function Card({ title, body }: { title: string; body: string }) {
  return <article className={styles.card}><h3>{title}</h3><p>{body}</p></article>;
}

export default function ContactPage() {
  return (
    <div className={styles.site}>
      <SiteHeader active="/contact" />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact</span>
      </nav>

      <main className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.tag}>Contact SecureVault</span>
          <h1>How can we help?</h1>
          <p>Send a question, share honest product feedback or report a security concern. A little context helps us understand your message and respond more effectively.</p>
        </section>

        <section className={styles.contactLayout}>
          <div className={styles.formCard}>
            <div className={styles.formHeading}>
              <h2>Send a message</h2>
              <p>Complete the form and your email app will prepare the message for you.</p>
            </div>

            <form action="mailto:contact@securevault.app" method="post" encType="text/plain">
              <div className={styles.fieldRow}>
                <label>
                  <span>Your name</span>
                  <input type="text" name="name" autoComplete="name" placeholder="Enter your name" required />
                </label>
                <label>
                  <span>Email address</span>
                  <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
                </label>
              </div>

              <label>
                <span>What is this about?</span>
                <select name="topic" defaultValue="" required>
                  <option value="" disabled>Select a topic</option>
                  <option value="Product question">Product question</option>
                  <option value="Feedback or suggestion">Feedback or suggestion</option>
                  <option value="Technical issue">Technical issue</option>
                  <option value="Security report">Security report</option>
                  <option value="Something else">Something else</option>
                </select>
              </label>

              <label>
                <span>Subject</span>
                <input type="text" name="subject" placeholder="A short summary of your message" required />
              </label>

              <label>
                <span>Message</span>
                <textarea name="message" rows={7} placeholder="Tell us what happened, what you expected and any safe steps that may help us understand it." required />
              </label>

              <p className={styles.privacyNote}>Do not include passwords, recovery codes, banking details or vault backup files.</p>
              <button type="submit">Prepare email</button>
            </form>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}>
              <h2>Before you contact us</h2>
              <p>SecureVault cannot recover a forgotten master password or remotely open a local vault. The <Link href="/security">Security page</Link> explains why.</p>
            </section>
            <section className={`${styles.sideCard} ${styles.securityCard}`}>
              <span className={styles.tag}>Security issue?</span>
              <h2>Report it responsibly</h2>
              <p>Choose “Security report” in the form and provide only the minimum information needed to reproduce the issue safely.</p>
            </section>
          </aside>
        </section>

        <section className={styles.section}>
          <h2>What can you contact us about?</h2>
          <div className={styles.threeGrid}>
            {contactReasons.map(([title, body]) => <Card key={title} title={title} body={body} />)}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Help us understand your message</h2>
          <div className={styles.threeGrid}>
            {beforeSending.map(([title, body]) => <Card key={title} title={title} body={body} />)}
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Looking for an immediate answer?</h2>
          <p>Our security guides explain local storage, password protection, encrypted backups and common account safety questions.</p>
          <div>
            <Link className={styles.primaryButton} href="/security">Read Security Guide</Link>
            <Link className={styles.secondaryButton} href="/blog">Browse Blog</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
