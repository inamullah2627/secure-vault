export type Page = "vault" | "favorites" | "logins" | "banking" | "notes" | "generator" | "health" | "settings";

export const pageLabels: Record<Page, string> = {
  vault: "All items",
  favorites: "Favorites",
  logins: "Logins",
  banking: "Banking",
  notes: "Secure notes",
  generator: "Generator",
  health: "Password health",
  settings: "Settings",
};
