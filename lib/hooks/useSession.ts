'use client';

import { useCookiesNext } from 'cookies-next/client';
import { USER_COOKIE } from '../utils/auth';
import { UserDTO } from '@osu-tournament-rating/otr-api-client';

/**
 * Type guard to check if an object is a valid UserDTO
 */
export function isUserDTO(obj: unknown): obj is UserDTO {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'player' in obj &&
    'scopes' in obj &&
    'settings' in obj &&
    Array.isArray((obj as UserDTO).scopes)
  );
}

/**
 * A client-side function which attempts to read user session data from a cookie
 */
export function useSession(): UserDTO | null {
  const { getCookie, hasCookie } = useCookiesNext();

  if (!hasCookie(USER_COOKIE)) {
    return null;
  }

  const userCookie = getCookie(USER_COOKIE);
  const cookieJson = JSON.stringify(userCookie);

  // Parse cookie into JSON and ensure it's a UserDTO
  try {
    const parsedUser = JSON.parse(cookieJson);

    if (!isUserDTO(parsedUser)) {
      console.error('Invalid user cookie');
      return null;
    }

    return parsedUser;
  } catch (error) {
    console.error('Failed to parse user cookie:', error);
    return null;
  }
}
