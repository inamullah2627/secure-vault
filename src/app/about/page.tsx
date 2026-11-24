import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About SecureVault – Local-First Password Security",
  description: "Learn why SecureVault was built and how its privacy-first, local-control approach keeps password security simple and transparent.",
};

const principles = [
  ["Privacy first", "Collect nothing we do not need."],
  ["Local control", "Your data stays on your device."],
  ["Transparency", "We state clearly what the app can and cannot do."],
  ["Simplicity", "Security that is easy to use gets used."],
];

const story = [
  ["The problem", "[Describe the problem you saw with how people store passwords.]"],
  ["The solution", "[Describe how the local-first approach developed.]"],
  ["Who it is for", "Individuals, developers and freelancers who want control of their data."],
];

const transparency = [
  ["Data storage model", "Encrypted data stays in your browser."],
  ["Limitations", "See the full list on the Security page."],
  ["Roadmap", "[Short version, for example optional encrypted sync later.]"],
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
          <p>Most password tools ask you to trust someone else&apos;s server. SecureVault was built so you do not have to.</p>
        </section>

        <section className={styles.mission}>
          <h2>Our mission</h2>
          <p>Simple, private and accessible password security for everyone.</p>
        </section>

        <CardSection title="Product principles" items={principles} columns={4} />
        <CardSection title="Project story" items={story} columns={3} />

        <section className={styles.section}>
          <h2>Developer</h2>
          <article className={styles.developerCard}>
            <div className={styles.photo} aria-label="Developer photo placeholder">[Photo]</div>
            <div><h3>[Your name or brand]</h3><p>[Short introduction and relevant experience.]</p></div>
          </article>
        </section>

        <CardSection title="Transparency" items={transparency} columns={3} />

        <section className={styles.cta}>
          <h2>Try SecureVault</h2>
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
