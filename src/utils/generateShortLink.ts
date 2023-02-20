import { customAlphabet } from "nanoid";

export function generateShortLink(host: string) {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxzy", 5);
  const shortCode = nanoid();
  return {
    shortCode,
    shortUrl: `https://${host}/api/${shortCode}`,
  };
}
