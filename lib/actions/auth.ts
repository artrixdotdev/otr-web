'use client';

import { cookies } from 'next/headers';
import { auth, me } from '../api';
import { SESSION_COOKIE, USER_COOKIE } from '../utils/auth';

export async function login() {
  const redirectUri = process.env.OTR_WEB_ROOT;
  const { result } = await auth.login({
    redirectUri,
  });

  // Fetch user data and store
  const cookieStore = await cookies();
  const { result: meResult } = await me.get();
  const meJson = JSON.stringify(meResult);
  cookieStore.set(USER_COOKIE, meJson);

  return result;
}

export async function logout() {
  const redirectUri = process.env.OTR_WEB_ROOT;
  const { result } = await auth.logout({
    redirectUri,
  });

  // Delete cookies
  const cookieStore = await cookies();
  if (cookieStore.has(SESSION_COOKIE)) {
    cookieStore.delete(SESSION_COOKIE);
  }

  if (cookieStore.has(USER_COOKIE)) {
    cookieStore.delete(USER_COOKIE);
  }

  return result;
}
