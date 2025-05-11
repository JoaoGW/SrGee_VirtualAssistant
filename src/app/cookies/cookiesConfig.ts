'use server';
import { cookies } from 'next/headers';

type CookiesInfos = {
  cookieStorage: ReturnType<typeof cookies>;
  cookieCategory: string;
  cookieValue?: string;
};

export async function getCookie({ cookieStorage, cookieCategory }: CookiesInfos) {
  const cookieStore = cookieStorage;
  return (await cookieStore).get(cookieCategory)?.value || null;
}

export async function createCookie({ cookieStorage, cookieCategory, cookieValue }: CookiesInfos) {
  const cookieStore = cookieStorage;
  (await cookieStore).set(cookieCategory, cookieValue || '', { secure: true });
}

export async function hasCookie({ cookieStorage, cookieCategory }: CookiesInfos) {
  const cookieStore = cookieStorage;
  return (await cookieStore).has(cookieCategory);
}

export async function deleteCookie({ cookieStorage, cookieCategory }: CookiesInfos) {
  const cookieStore = cookieStorage;
  (await cookieStore).set(cookieCategory, '', { maxAge: 0 });
}