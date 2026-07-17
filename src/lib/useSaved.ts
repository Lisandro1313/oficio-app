"use client";

import { useSyncExternalStore } from "react";

const KEY = "oficio_saved";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function snapshot() {
  return localStorage.getItem(KEY) ?? "[]";
}

export function toggleSaved(id: string) {
  const cur: string[] = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  const next = cur.includes(id)
    ? cur.filter((x) => x !== id)
    : [id, ...cur];
  localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

export function useSaved() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const ids: string[] = JSON.parse(raw);
  return {
    ids,
    isSaved: (id: string) => ids.includes(id),
    toggle: toggleSaved,
  };
}
