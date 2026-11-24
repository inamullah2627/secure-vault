import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms and Conditions | SecureVault",
  description: "Read the terms that apply when using the SecureVault website, local password vault, password generator and security content.",
};

const sections = [
  ["acceptance", "Acceptance of these terms"],
  ["service", "The SecureVault service"],
  ["responsibilities", "Your responsibilities"],
  ["acceptable-use", "Acceptable use"],
  ["security", "Security and backups"],
  ["content", "Website content"],
  ["intellectual-property", "Intellectual property"],
  ["third-parties", "Third-party services"],
  ["disclaimers", "Disclaimers"],
  ["liability", "Limitation of liability"],
  ["changes", "Changes and termination"],
  ["law", "Applicable law"],
];

export default function TermsPage() {
  return (
    <div className={styles.site}>
      <SiteHeader />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Terms and Conditions</span>
      </nav>

      <main className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.tag}>Legal</span>
          <h1>Terms and Conditions</h1>
          <p>These terms explain the rules and responsibilities that apply when you access the SecureVault website and use its local vault, password tools and educational content.</p>
          <div className={styles.dates}><span>Effective: 24 Nov 2026</span><span>Last updated: 24 Nov 2026</span></div>
        </header>

        <div className={styles.notice}>By using SecureVault, you agree to these terms. If you do not agree, do not use the website or store information in the vault.</div>

        <nav className={styles.toc} aria-label="Terms and conditions contents">
          <strong>On this page</strong>
          <div>{sections.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}</div>
        </nav>

        <div className={styles.content}>
          <section className={styles.section} id="acceptance">
            <h2>1. Acceptance of these terms</h2>
            <p>These Terms and Conditions form an agreement between you and the SecureVault project owner. They apply to the website, installable web app, local password vault, password generator, blog and related features.</p>
            <p>You must be legally able to accept these terms in your location. If you use SecureVault on behalf of an organization, you confirm that you have authority to bind that organization.</p>
          </section>

          <section className={styles.section} id="service">
            <h2>2. The SecureVault service</h2>
            <p>SecureVault provides tools for creating and locally storing encrypted passwords, banking information and private notes. It also provides password generation and educational security content.</p>
            <p>The active vault is stored in the browser profile on your device. SecureVault is not a remote recovery service and does not maintain a readable server copy of your vault or master password.</p>
          </section>

          <section className={styles.section} id="responsibilities">
            <h2>3. Your responsibilities</h2>
            <p>You are responsible for:</p>
            <ul>
              <li>Choosing and protecting a strong, unique master password.</li>
              <li>Keeping your device, browser and extensions secure and updated.</li>
              <li>Creating encrypted backups and storing them safely away from the original device.</li>
              <li>Confirming that restored backups work before relying on them.</li>
              <li>Checking information before using it for financial, professional or security decisions.</li>
              <li>Using SecureVault in compliance with applicable laws and the rights of others.</li>
            </ul>
          </section>

          <section className={styles.section} id="acceptable-use">
            <h2>4. Acceptable use</h2>
            <p>You must not use SecureVault to:</p>
            <ul>
              <li>Break the law, facilitate fraud or store information you have no right to possess.</li>
              <li>Attempt unauthorized access to systems, accounts, devices or another person’s information.</li>
              <li>Introduce malware, interfere with website operation or bypass reasonable security controls.</li>
              <li>Scrape, overload or abuse the public website in a way that harms the service or other visitors.</li>
              <li>Misrepresent your identity or use the service to violate intellectual property or privacy rights.</li>
            </ul>
          </section>

          <section className={styles.section} id="security">
            <h2>5. Security, passwords and backups</h2>
            <p>No password manager can remove every security risk. Malware, a compromised browser, unsafe extensions, physical device access and weak master passwords may expose information after a vault is unlocked.</p>
            <p>A forgotten master password cannot be reset by SecureVault. Clearing browser data, uninstalling a browser, changing profiles or losing a device may permanently remove the local vault unless you have a usable encrypted backup.</p>
          </section>

          <section className={styles.section} id="content">
            <h2>6. Website and educational content</h2>
            <p>Security articles, password strength estimates and other website content are provided for general information. They do not constitute legal, financial or professional security advice and may not address your particular risks.</p>
            <p>You should independently evaluate important security decisions and use additional safeguards where appropriate.</p>
          </section>

          <section className={styles.section} id="intellectual-property">
            <h2>7. Intellectual property</h2>
            <p>The SecureVault name, website design, original text, graphics and software are protected by applicable intellectual property laws unless stated otherwise. These terms allow personal use of the service but do not transfer ownership of the product or content.</p>
            <p>You may not copy, sell, license or redistribute substantial parts of SecureVault without permission, except where applicable law or an identified open-source license allows it.</p>
          </section>

          <section className={styles.section} id="third-parties">
            <h2>8. Third-party services and links</h2>
            <p>Public pages may include third-party services, advertisements or links to other websites. Their content, availability and data practices are controlled by their respective providers. Review their terms and privacy policies before using them.</p>
            <p>SecureVault is not responsible for third-party websites or services merely because a link or advertisement appears on a public page.</p>
          </section>

          <section className={styles.section} id="disclaimers">
            <h2>9. Disclaimers</h2>
            <p>SecureVault is provided on an “as available” basis. To the fullest extent allowed by law, no warranty is made that the service will always be available, error-free, suitable for every purpose or immune from every security threat.</p>
            <p>You use the service at your own risk. Nothing in these terms excludes a warranty or consumer right that cannot legally be excluded.</p>
          </section>

          <section className={styles.section} id="liability">
            <h2>10. Limitation of liability</h2>
            <p>To the fullest extent permitted by law, the SecureVault project owner will not be liable for indirect, incidental, special or consequential loss arising from use of the service. This includes loss of passwords, vault data, access, business information, profits or opportunities.</p>
            <p>These limitations do not apply where liability cannot legally be limited or excluded.</p>
          </section>

          <section className={styles.section} id="changes">
            <h2>11. Changes, availability and termination</h2>
            <p>SecureVault may change, suspend or discontinue features to improve security, maintain the service or respond to legal and technical requirements. Reasonable efforts may be made to communicate material changes, but continuous availability is not guaranteed.</p>
            <p>Your permission to use the service may end if you seriously or repeatedly violate these terms. Provisions that should logically survive termination, including intellectual property, disclaimers and liability limits, will continue to apply.</p>
          </section>

          <section className={styles.section} id="law">
            <h2>12. Applicable law and disputes</h2>
            <p>These terms are governed by applicable law. Any dispute should first be raised through the Contact page so the parties can attempt a reasonable informal resolution. Mandatory consumer protections and jurisdiction rules in your location continue to apply where they cannot legally be changed by agreement.</p>
          </section>

          <section className={styles.contact}>
            <h2>Contact</h2>
            <p>Questions about these Terms and Conditions can be sent through the <Link href="/contact">Contact page</Link>.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
