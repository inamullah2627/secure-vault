import Link from "next/link";
import BrandMark from "./brand-mark";
import styles from "./website-shell.module.css";

const groups = [
  { title: "Product", links: [["Open Vault", "/app"], ["Password Generator", "/password-generator"]] },
  { title: "Company", links: [["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]] },
  { title: "Legal", links: [["Security", "/security"], ["Privacy Policy", "/privacy-policy"], ["Terms and Conditions", "/terms-and-conditions"]] },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div className={styles.footerAbout}>
            <div className={styles.footerBrand}>
              <BrandMark />
              <strong>SecureVault</strong>
            </div>
            <p>A private, offline-first password manager. Your data is encrypted on your device and stays there.</p>
          </div>
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
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2026 SecureVault. All rights reserved.</p>
          <a href="#">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
