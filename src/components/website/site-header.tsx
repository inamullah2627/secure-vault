"use client";

import Link from "next/link";
import { useState } from "react";
import BrandMark from "./brand-mark";
import styles from "./website-shell.module.css";

const links = [
  ["Password Generator", "/password-generator"],
  ["Security", "/security"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function SiteHeader({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link className={styles.brand} href="/" aria-label="SecureVault home" onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span>SecureVault</span>
        </Link>
        <div className={styles.links}>
          {links.map(([label, href]) => (
            <Link className={active === href ? styles.active : undefined} aria-current={active === href ? "page" : undefined} key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <Link className={styles.openVault} href="/app">Open Vault</Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>

        {menuOpen && (
          <div className={styles.mobileMenu} id="mobile-navigation">
            {links.map(([label, href]) => (
              <Link className={active === href ? styles.active : undefined} aria-current={active === href ? "page" : undefined} key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link className={styles.mobileVault} href="/app" onClick={() => setMenuOpen(false)}>Open Vault</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
