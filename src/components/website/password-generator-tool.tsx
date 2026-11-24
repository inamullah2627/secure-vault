"use client";

import { useState } from "react";
import styles from "@/app/password-generator/password-generator.module.css";

type Options = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  avoidSimilar: boolean;
};

const sets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*_-+=?",
};
const similar = new Set("Il1O0o".split(""));

function secureIndex(limit: number) {
  const ceiling = Math.floor(256 / limit) * limit;
  const value = new Uint8Array(1);
  do crypto.getRandomValues(value); while (value[0] >= ceiling);
  return value[0] % limit;
}

function charactersFor(options: Options) {
  return (Object.keys(sets) as Array<keyof typeof sets>)
    .filter((key) => options[key])
    .map((key) => options.avoidSimilar ? sets[key].split("").filter((character) => !similar.has(character)).join("") : sets[key]);
}

function createPassword(length: number, options: Options) {
  const activeSets = charactersFor(options);
  if (!activeSets.length) return "";
  const pool = activeSets.join("");
  const result = activeSets.map((set) => set[secureIndex(set.length)]);
  while (result.length < length) result.push(pool[secureIndex(pool.length)]);
  for (let index = result.length - 1; index > 0; index--) {
    const swap = secureIndex(index + 1);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result.slice(0, length).join("");
}

function score(length: number, poolSize: number) {
  const entropy = Math.round(length * Math.log2(Math.max(poolSize, 1)));
  if (entropy >= 100) return { label: "Very strong", percent: 100, entropy };
  if (entropy >= 75) return { label: "Strong", percent: 85, entropy };
  if (entropy >= 50) return { label: "Good", percent: 65, entropy };
  return { label: "Weak", percent: 35, entropy };
}

const initialOptions: Options = { uppercase: true, lowercase: true, numbers: true, symbols: true, avoidSimilar: true };

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState(initialOptions);
  const [password, setPassword] = useState("k7#Vq2!mRz9$Lp4x");
  const [copied, setCopied] = useState(false);
  const activeSets = charactersFor(options);
  const strength = score(length, activeSets.join("").length);

  function regenerate(nextLength = length, nextOptions = options) {
    setPassword(createPassword(nextLength, nextOptions));
    setCopied(false);
  }

  function setOption(key: keyof Options, checked: boolean) {
    const next = { ...options, [key]: checked };
    const characterOptionCount = [next.uppercase, next.lowercase, next.numbers, next.symbols].filter(Boolean).length;
    if (!characterOptionCount) return;
    setOptions(next);
    regenerate(length, next);
  }

  async function copyPassword() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <div className={styles.generatorCard}>
        <div className={styles.passwordOutput} aria-live="polite">{password}</div>
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={() => void copyPassword()}>{copied ? "Copied" : "Copy"}</button>
          <button className={styles.secondaryButton} onClick={() => regenerate()}>Generate again</button>
        </div>
        <div className={styles.lengthControl}>
          <label htmlFor="generator-length"><span>Password length</span><span>{length}</span></label>
          <input id="generator-length" type="range" min="8" max="64" value={length} onChange={(event) => { const next = Number(event.target.value); setLength(next); regenerate(next); }} />
        </div>
        <div className={styles.optionGrid}>
          <label><input type="checkbox" checked={options.uppercase} onChange={(event) => setOption("uppercase", event.target.checked)} />Uppercase</label>
          <label><input type="checkbox" checked={options.lowercase} onChange={(event) => setOption("lowercase", event.target.checked)} />Lowercase</label>
          <label><input type="checkbox" checked={options.numbers} onChange={(event) => setOption("numbers", event.target.checked)} />Numbers</label>
          <label><input type="checkbox" checked={options.symbols} onChange={(event) => setOption("symbols", event.target.checked)} />Symbols</label>
          <label><input type="checkbox" checked={options.avoidSimilar} onChange={(event) => setOption("avoidSimilar", event.target.checked)} />Avoid similar characters</label>
        </div>
      </div>

      {/*
        AD SLOT: Password Generator
        Keep this position reserved for the future ad component shown in the design.
        Ads are intentionally disabled for now; render the ad here when needed.
      */}

      <section className={styles.strengthSection} aria-labelledby="strength-heading">
        <h2 id="strength-heading">Your password strength</h2>
        <div className={styles.strengthCard}>
          <strong>{strength.label}</strong>
          <div className={styles.strengthTrack} aria-hidden="true"><span style={{ width: `${strength.percent}%` }} /></div>
          <p>Estimated randomness: about {strength.entropy} bits</p>
          <ul><li>Choose at least 16 characters.</li><li>Use several character types when the website allows them.</li><li>Keep this password unique to one account.</li></ul>
        </div>
      </section>
    </>
  );
}
