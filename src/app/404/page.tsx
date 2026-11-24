import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = {
  title: "Page not found | SecureVault",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFound />;
}
