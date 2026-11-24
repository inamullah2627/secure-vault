import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/website/brand-mark";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found | SecureVault",
  description: "The page you requested could not be found.",
};

const popularPages = [
  ["Password Generator", "Create a strong password in your browser.", "/password-generator"],
  ["Security & Privacy", "How SecureVault protects your data.", "/security"],
  ["Password guides", "Practical articles about staying safe online.", "/blog"],
];

export default function NotFound() {
  return (
    <div className={styles.site}>
      <SiteHeader />
      <main>
        <section className={`${styles.container} ${styles.errorSection}`}>
          <div className={styles.errorMark} aria-hidden="true"><BrandMark /></div>
          <p className={styles.code}>404</p>
          <h1>This page could not be found</h1>
          <p className={styles.message}>The link may be broken or the page may have moved. Your vault is not affected: its data stays encrypted on your device.</p>
          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/">Back to home</Link>
            <Link className={styles.secondaryButton} href="/app">Open Vault</Link>
          </div>

          <form className={styles.search} action="/blog" method="get" role="search">
            <label htmlFor="guide-search">Search guides</label>
            <div>
              <input id="guide-search" name="search" type="search" placeholder="Search guides" />
              <button type="submit">Search</button>
            </div>
          </form>
        </section>

        <section className={`${styles.container} ${styles.popular}`}>
          <h2>Popular pages</h2>
          <p>These might help you find what you were looking for.</p>
          <div className={styles.cardGrid}>
            {popularPages.map(([title, body, href]) => (
              <Link className={styles.card} href={href} key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
