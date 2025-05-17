'use server';

import { UserDTO } from '@osu-tournament-rating/otr-api-client';
import { SESSION_COOKIE, USER_COOKIE } from './auth';
import { setCookie, deleteCookie } from 'cookies-next/server';
import { me } from '../actions/api';

/**
 * Fetches user data and stores it in a session cookie
 * @returns The fetched user
 */
export async function createSession(): Promise<UserDTO | null> {
  const { result } = await (await me()).get();

  const userJson = JSON.stringify(result);
  setCookie(USER_COOKIE, userJson);

  return result;
}

export async function clearSession() {
  deleteCookie(USER_COOKIE);
  deleteCookie(SESSION_COOKIE);
}
