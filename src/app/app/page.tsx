import type { Metadata } from "next";
import VaultApp from "@/components/vault-app";
import PwaManager from "@/components/pwa-manager";

export const metadata: Metadata = {
  title: "Open Vault | SecureVault",
  description: "Open your private, encrypted SecureVault on this device.",
  robots: { index: false, follow: false },
  manifest: "/vault.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SecureVault",
  },
};

export default function VaultPage() {
  return <><VaultApp /><PwaManager /></>;
}
