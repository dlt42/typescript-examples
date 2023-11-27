export const validBraces = (braces: string) => {
  const parts = braces.split(``);
  const open: string[] = [`{`, `[`, `(`];
  const closed: string[] = [`}`, `]`, `)`];
  const lastOpen = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (open.includes(part)) {
      const idx = open.indexOf(part);
      lastOpen.push(idx);
      continue;
    }
    if (!closed.includes(part)) {
      continue;
    }
    if (lastOpen.at(-1) !== closed.indexOf(part)) {
      return false;
    }
    lastOpen.pop();
  }
  return lastOpen.length === 0;
};
