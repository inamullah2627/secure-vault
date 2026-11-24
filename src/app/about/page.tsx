import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About SecureVault | Private Password Security",
  description: "Learn why SecureVault was created and how its local-first approach makes private password storage simple, clear and accessible.",
};

const principles = [
  ["Privacy first", "SecureVault is designed to work without collecting the personal information stored inside your vault."],
  ["Local control", "Your working vault stays in your browser on the device you use. You remain responsible for access and backups."],
  ["Clear communication", "Security should not depend on vague promises. We explain what the product protects and where its limits begin."],
  ["Useful simplicity", "Good security only helps when people can use it comfortably. Important actions should feel clear and direct."],
];

const story = [
  ["The everyday problem", "Remembering a different strong password for every account is unrealistic. People often respond by reusing passwords, saving them in ordinary notes or choosing patterns that are easy to guess."],
  ["A more private approach", "SecureVault brings passwords, banking details and private notes into one encrypted place. The local-first model keeps the active vault on your device without requiring an online account."],
  ["Who SecureVault is for", "It is built for individuals, developers, freelancers and anyone who wants a straightforward password manager with direct control over their data."],
];

const transparency = [
  ["How data is stored", "Vault information is encrypted in your browser and saved in its local database. SecureVault does not keep a readable copy on its servers."],
  ["Important limitations", "A local vault can be lost if browser data is cleared or the device fails. A forgotten master password cannot be reset, so encrypted backups matter."],
  ["How the product will grow", "Future improvements will focus on safer backups, clearer security guidance and practical features that do not weaken the local-first approach."],
];

function Card({ title, body }: { title: string; body: string }) {
  return <article className={styles.card}><h3>{title}</h3><p>{body}</p></article>;
}

function CardSection({ title, items, columns }: { title: string; items: string[][]; columns: 3 | 4 }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={columns === 4 ? styles.fourGrid : styles.threeGrid}>
        {items.map(([itemTitle, body]) => <Card key={itemTitle} title={itemTitle} body={body} />)}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className={styles.site}>
      <SiteHeader active="/about" />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About</span>
      </nav>

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Why SecureVault was built</h1>
          <p>SecureVault was created to give people a simpler way to protect sensitive information while keeping direct control of where their vault is stored.</p>
        </section>

        <section className={styles.mission}>
          <h2>Our mission</h2>
          <p>Make strong password security easier to understand and practical enough to use every day, without requiring people to hand over more personal data than necessary.</p>
        </section>

        <CardSection title="Product principles" items={principles} columns={4} />
        <CardSection title="Project story" items={story} columns={3} />

        <section className={styles.section}>
          <h2>Developer</h2>
          <article className={styles.developerCard}>
            <div className={styles.photo} aria-label="Inam Ullah initials">IU</div>
            <div><h3>Inam Ullah</h3><p>Inam Ullah is the developer behind SecureVault. He focuses on building practical web tools that make privacy and account security easier to understand and manage.</p></div>
          </article>
        </section>

        <CardSection title="Transparency" items={transparency} columns={3} />

        <section className={styles.cta}>
          <h2>Take control of your passwords</h2>
          <div>
            <Link className={styles.primaryButton} href="/app">Open SecureVault</Link>
            <Link className={styles.secondaryButton} href="/contact">Contact Us</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
