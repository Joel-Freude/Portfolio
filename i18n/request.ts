import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export const { locales, defaultLocale } = routing;

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale ?? defaultLocale,
    messages: (await import(`../messages/${(locale ?? defaultLocale)}.json`)).default,
  };
});

export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch {
    return (await import('../messages/en.json')).default;
  }
}
