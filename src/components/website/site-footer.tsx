import Link from "next/link";
import BrandMark from "./brand-mark";
import styles from "./website-shell.module.css";

const groups = [
  { title: "Product", links: [["Open Vault", "/app"], ["Password Generator", "/password-generator"]] },
  { title: "Learn", links: [["Blog", "/blog"], ["Security", "/security"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"]] },
  { title: "Legal", links: [["Privacy policy", "/privacy-policy"], ["Terms and conditions", "/terms-and-conditions"]] },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <BrandMark />
          <strong>SecureVault</strong>
        </div>
        <div className={styles.footerGrid}>
          {groups.map((group) => (
            <div className={styles.footerGroup} key={group.title}>
              <strong>{group.title}</strong>
              {group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
        <p className={styles.disclaimer}>
          Security disclaimer: SecureVault is designed to keep data on your device, but no software is risk-free. Use
          a strong master password, keep encrypted backups and have the app reviewed independently before trusting it
          with critical data.
        </p>
        <p className={styles.copyright}>© 2026 SecureVault. All rights reserved.</p>
      </div>
    </footer>
  );
}
