import Link from "next/link";
import BrandMark from "./brand-mark";
import styles from "./website-shell.module.css";

const links = [
  ["Password Generator", "/password-generator"],
  ["Security & Privacy", "/security"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link className={styles.brand} href="/" aria-label="SecureVault home">
          <BrandMark />
          <span>SecureVault</span>
        </Link>
        <div className={styles.links}>
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <Link className={styles.openVault} href="/app">Open Vault</Link>
      </nav>
    </header>
  );
}
