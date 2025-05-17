'use server';

import { leaderboards, me } from '@/lib/api';
import { SESSION_COOKIE } from '@/lib/utils/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  console.log(request);
  return redirect('/');
}
