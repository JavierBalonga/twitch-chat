const cache: Record<string, string> = {};

export default function randomColor(str: string) {
  if (cache[str]) return cache[str];
  const color =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  cache[str] = color;
  return color;
}
