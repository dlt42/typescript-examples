export const isPanagram = (str: string): boolean => {
  const lower = str.toLowerCase().replaceAll(` `, ``);
  const characterSet = new Set(lower);
  return [...characterSet].length === 26;
};
