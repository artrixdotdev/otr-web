'use server';

import { redirect } from 'next/navigation';
import { auth } from '../api';
import { clearSession } from '../utils/session';

export async function login() {
  const redirectUri = process.env.OTR_WEB_ROOT + '/auth/login';
  redirect(
    `${process.env.OTR_API_ROOT}/api/v1/auth/login?redirectUri=${redirectUri}`
  );
}

export async function logout() {
  const redirectUri = process.env.OTR_WEB_ROOT;
  const { result } = await auth.logout({
    redirectUri,
  });

  await clearSession();
  return result;
}
