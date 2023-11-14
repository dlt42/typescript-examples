const tileSets: Record<string, number> = {
  AEIOULNRST: 1,
  DG: 2,
  BCMP: 3,
  FHVWY: 4,
  K: 5,
  JX: 8,
  QZ: 10,
};

const tiles: Record<string, number> = {};

Object.keys(tileSets).forEach((key) =>
  key.split(``).forEach((char) => (tiles[char] = tileSets[key]))
);

const score = (word: string | undefined | null): number =>
  !word
    ? 0
    : word
      .toUpperCase()
      .replace(/[^A-Z]/gi, ``)
      .split(``)
      .reduce((total, char) => total + tiles[char], 0);

export default score;
