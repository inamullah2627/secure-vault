import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | SecureVault",
  description: "Read how SecureVault handles local vault data, website information, cookies, advertising services and your privacy choices.",
};

const sections = [
  ["information", "Information we handle"],
  ["vault-data", "Local vault data"],
  ["website-data", "Website and contact data"],
  ["cookies", "Cookies and local storage"],
  ["advertising", "Google advertising"],
  ["consent", "Consent and privacy choices"],
  ["sharing", "Data sharing"],
  ["retention", "Data retention and security"],
  ["children", "Children’s privacy"],
  ["rights", "Your privacy rights"],
  ["changes", "Policy changes"],
];

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.site}>
      <SiteHeader />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Privacy Policy</span>
      </nav>

      <main className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.tag}>Legal</span>
          <h1>Privacy Policy</h1>
          <p>This policy explains what information SecureVault handles, what remains on your device and how third-party services may process data on public website pages.</p>
          <div className={styles.dates}><span>Effective: 24 Nov 2026</span><span>Last updated: 24 Nov 2026</span></div>
        </header>

        <div className={styles.notice}>SecureVault is designed around local vault storage. Your master password and readable vault contents are not sent to SecureVault servers. Public website pages may use separate services such as advertising, which are explained below.</div>

        <nav className={styles.toc} aria-label="Privacy policy contents">
          <strong>On this page</strong>
          <div>{sections.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}</div>
        </nav>

        <div className={styles.content}>
          <section className={styles.section} id="information">
            <h2>1. Information we handle</h2>
            <p>SecureVault handles information in two different contexts: information you save inside the private vault, and limited information connected with your use of public website pages or direct communication.</p>
            <p>The way data is handled depends on which part of SecureVault you use. The local vault is designed to operate without sending readable vault contents to us.</p>
          </section>

          <section className={styles.section} id="vault-data">
            <h2>2. Local vault data</h2>
            <p>Passwords, usernames, banking details, secure notes and vault settings are encrypted in your browser and stored in that browser profile using IndexedDB. Your master password is used locally to derive the encryption key.</p>
            <ul>
              <li>SecureVault does not receive or store a readable copy of your master password.</li>
              <li>SecureVault does not receive readable copies of the passwords, notes or banking details stored in your vault.</li>
              <li>Encrypted backups are created and saved only when you choose to export them.</li>
              <li>Clearing browser data, changing browser profiles or losing the device may remove access to a local vault unless you have an encrypted backup.</li>
            </ul>
          </section>

          <section className={styles.section} id="website-data">
            <h2>3. Website and contact data</h2>
            <p>When you browse public pages, hosting and security providers may process standard technical information such as IP address, browser type, device type, requested page, timestamps and diagnostic logs. This information may be needed to deliver pages, prevent abuse and maintain reliability.</p>
            <p>If you contact SecureVault, we may receive the name, email address, subject and message you choose to provide. Do not send passwords, recovery codes, banking details or vault backup files through the contact form or email.</p>
          </section>

          <section className={styles.section} id="cookies">
            <h2>4. Cookies and local storage</h2>
            <p>SecureVault uses browser storage to provide core features such as the local encrypted vault and installable web app behavior. This essential storage is separate from advertising cookies.</p>
            <p>Public pages may use cookies, web beacons, IP addresses or similar identifiers when third-party advertising or measurement services are enabled. Your browser settings may allow you to block or delete cookies, although doing so can affect some website features.</p>
          </section>

          <section className={styles.section} id="advertising">
            <h2>5. Google advertising</h2>
            <p>Public information pages may display advertisements provided by Google AdSense. Ads are not intended to appear inside the private vault screens.</p>
            <ul>
              <li>Third-party vendors, including Google, may use cookies to serve ads based on a visitor’s previous visits to this website or other websites.</li>
              <li>Google’s use of advertising cookies enables Google and its partners to serve personalized or non-personalized ads, depending on settings, consent and applicable law.</li>
              <li>Third parties may place or read cookies in your browser, or use web beacons, IP addresses and other identifiers as a result of ad serving.</li>
              <li>You can review or control personalized advertising through <a href="https://adssettings.google.com/" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>.</li>
              <li>You can learn how Google uses information from partner sites on <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">Google’s partner sites policy page</a>.</li>
            </ul>
          </section>

          <section className={styles.section} id="consent">
            <h2>6. Consent and privacy choices</h2>
            <p>Where required, visitors will be asked for consent before nonessential cookies or personalized advertising technologies are used. Visitors in the EEA, United Kingdom and Switzerland may be shown a consent message provided through a Google-certified consent management platform.</p>
            <p>You may adjust choices through an available consent control, Google Ads Settings or your browser settings. Withdrawing consent does not affect processing that was lawful before withdrawal.</p>
          </section>

          <section className={styles.section} id="sharing">
            <h2>7. Data sharing</h2>
            <p>We do not sell readable vault contents because those contents are designed to remain on your device. Limited website or communication data may be processed by service providers that help with hosting, security, email delivery, advertising or legal compliance.</p>
            <p>Information may also be disclosed when reasonably necessary to comply with law, protect rights, investigate abuse or protect users and the public.</p>
          </section>

          <section className={styles.section} id="retention">
            <h2>8. Data retention and security</h2>
            <p>Local vault data remains in your browser until you delete the vault, clear browser storage or remove the relevant browser profile. Any contact information or technical logs processed outside the vault should be retained only as long as needed for communication, security, legal obligations and service operation.</p>
            <p>Reasonable safeguards are used, but no website, device or storage method can be guaranteed completely secure. You are responsible for protecting your master password, device and encrypted backups.</p>
          </section>

          <section className={styles.section} id="children">
            <h2>9. Children’s privacy</h2>
            <p>SecureVault is not directed to children under 13, or a higher minimum age where required by local law. We do not knowingly collect personal information from children through the website. A parent or guardian who believes a child has provided personal information should contact us.</p>
          </section>

          <section className={styles.section} id="rights">
            <h2>10. Your privacy rights</h2>
            <p>Depending on your location, you may have rights to request access, correction, deletion, restriction or objection regarding personal information processed outside the local vault. You may also have the right to withdraw consent or complain to a data protection authority.</p>
            <p>Because readable vault data is not held by SecureVault, we cannot access, correct or recover the contents of your local encrypted vault for you.</p>
          </section>

          <section className={styles.section} id="changes">
            <h2>11. Changes to this policy</h2>
            <p>This policy may be updated when SecureVault features, service providers, advertising practices or legal requirements change. The updated version will be posted on this page with a revised date.</p>
          </section>

          <section className={styles.contact}>
            <h2>Contact</h2>
            <p>Questions about this Privacy Policy can be sent through the <Link href="/contact">Contact page</Link>.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
