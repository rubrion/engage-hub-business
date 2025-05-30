const seen = new Set<string>();

export function prefetch(importer: () => Promise<unknown>) {
  if (seen.has(importer.toString())) return;
  importer();
  seen.add(importer.toString());
}
