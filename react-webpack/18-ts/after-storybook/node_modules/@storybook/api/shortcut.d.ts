export type KeyCollection = string[];

export function shortcutToHumanString(shortcut: KeyCollection): string
export function eventToShortcut(e: KeyboardEvent): KeyCollection | null
export function shortcutMatchesShortcut(inputShortcut: KeyCollection,
  shortcut: KeyCollection): boolean
