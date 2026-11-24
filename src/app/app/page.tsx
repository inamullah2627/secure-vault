import type { Metadata } from "next";
import VaultApp from "@/components/vault-app";
import PwaManager from "@/components/pwa-manager";

export const metadata: Metadata = {
  title: "Open Vault | SecureVault",
  description: "Open your private, encrypted SecureVault on this device.",
  robots: { index: false, follow: false },
};

export default function VaultPage() {
  return <><VaultApp /><PwaManager /></>;
}
