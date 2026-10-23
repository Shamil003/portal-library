// src/pages/Library/progress.js

const key = (scope) => `libraryProgress:${scope}`;

export const readProgress = (scope) => {
  if (!scope) return [];
  try {
    const raw = localStorage.getItem(key(scope));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeProgress = (scope, ids) => {
  if (!scope) return;
  localStorage.setItem(key(scope), JSON.stringify(ids));
};

export const markCompleted = (scope, id) => {
  const current = readProgress(scope);
  if (!current.includes(id)) writeProgress(scope, [...current, id]);
};

export const unmarkCompleted = (scope, id) => {
  const current = readProgress(scope);
  writeProgress(
    scope,
    current.filter((x) => x !== id),
  );
};