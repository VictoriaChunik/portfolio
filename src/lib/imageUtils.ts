export function withParams(src: string, params: Record<string, string | number>) {
  const url = new URL(src);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  return url.toString();
}

export function buildSrcSet(src: string, widths: number[] = [400, 612, 800, 1200, 1640], quality = 90) {
  return widths
    .map((w) => `${withParams(src, { w, q: quality, auto: 'format', fit: 'crop' })} ${w}w`)
    .join(', ');
}
