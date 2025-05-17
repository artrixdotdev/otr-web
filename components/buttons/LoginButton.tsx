'use client';

import { login, logout } from '@/lib/actions/auth';
import { Button } from '../ui/button';
import { useSession } from '@/lib/hooks/useSession';

export default function LoginButton() {
  const session = useSession();
  console.log(session);

  if (session) {
    return (
      <Button
        className="cursor-pointer"
        onClick={logout}
      >
        Logout
      </Button>
    );
  }

  return (
    <Button className="cursor-pointer" onClick={login}>
      Login
    </Button>
  );
}
