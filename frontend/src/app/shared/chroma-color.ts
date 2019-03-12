import * as chroma from 'chroma-js';

const MIN_CONTRAST = 4.5;

export function chromaColor(domain): any {
  return chroma
    .scale(['orange', 'white', 'green', 'skyblue', 'violet'])
    .domain(domain);
}

export function chromaInvertBW(color): string {
  if (chroma.contrast(color, 'black') < MIN_CONTRAST) {
    return 'white';
  }
  return 'black';
}
