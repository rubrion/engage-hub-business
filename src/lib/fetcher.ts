/**
 * Utility for making JSON HTTP requests with error handling
 * @param url The URL to fetch from
 * @param init Optional request init options
 * @returns Promise of the parsed JSON response
 * @throws Error if the response is not ok
 */
export async function fetchJson<T>(
  url: string,
  init?: globalThis.RequestInit
): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} – ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
