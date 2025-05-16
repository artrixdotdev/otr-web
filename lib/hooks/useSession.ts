import { cookies } from 'next/headers';
import { useCookies } from 'next-client-cookies';
import { UserDTO } from '@osu-tournament-rating/otr-api-client';
import { me } from '../api';
import { USER_COOKIE } from '../utils/auth';

/**
 * Type guard to check if an object is a valid UserDTO
 */
function isUserDTO(obj: unknown): obj is UserDTO {
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
 * Fetches user data and stores it in a session cookie
 * @returns The fetched user
 */
export async function createSession(): Promise<UserDTO | null> {
  const cookieStore = await cookies();
  const { result } = await me.get();

  const userJson = JSON.stringify(result);
  cookieStore.set(USER_COOKIE, userJson);

  return result;
}

/**
 * A client-side function which attempts to read user session data from stored cookie
 */
export function useSession(): UserDTO | null {
  const clientCookies = useCookies();
  const userCookie = clientCookies.get(USER_COOKIE);

  if (!userCookie) {
    return null;
  }

  // Parse cookie into JSON and ensure it as a UserDTO
  try {
    const parsedUser = JSON.parse(userCookie);

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
