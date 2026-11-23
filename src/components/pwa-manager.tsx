"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PwaManager() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [updateWorker, setUpdateWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const iosHelpTimer = window.setTimeout(() => setShowIOSHelp(ios && !standalone), 0);

    const captureInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const installed = () => {
      setInstallPrompt(null);
      setShowIOSHelp(false);
    };

    window.addEventListener("beforeinstallprompt", captureInstallPrompt);
    window.addEventListener("appinstalled", installed);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).then((registration) => {
        if (registration.waiting) setUpdateWorker(registration.waiting);
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) setUpdateWorker(worker);
          });
        });
      }).catch(() => {});

      let reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloading) return;
        reloading = true;
        window.location.reload();
      });
    }

    if ("storage" in navigator && "persist" in navigator.storage) {
      navigator.storage.persist().catch(() => false);
    }

    return () => {
      window.clearTimeout(iosHelpTimer);
      window.removeEventListener("beforeinstallprompt", captureInstallPrompt);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  if (updateWorker) {
    return (
      <aside className="pwa-prompt" aria-live="polite">
        <strong>SecureVault update ready</strong>
        <p>Reload to use the latest offline version.</p>
        <button onClick={() => updateWorker.postMessage({ type: "SKIP_WAITING" })}>Update</button>
      </aside>
    );
  }

  if (installPrompt) {
    return (
      <aside className="pwa-prompt" aria-live="polite">
        <strong>Install SecureVault</strong>
        <p>Use your private vault like an app, even offline.</p>
        <button onClick={() => void install()}>Install</button>
      </aside>
    );
  }

  if (showIOSHelp) {
    return (
      <aside className="pwa-prompt" aria-live="polite">
        <strong>Install SecureVault</strong>
        <p>In Safari, tap Share and then “Add to Home Screen”.</p>
        <button className="secondary" onClick={() => setShowIOSHelp(false)}>Got it</button>
      </aside>
    );
  }

  return null;
}
