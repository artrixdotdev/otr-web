import { clearSession } from '@/lib/utils/session';
import { redirect } from 'next/navigation';

export default async function Page() {
  clearSession();
  return redirect('/');
}
