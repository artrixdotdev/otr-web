import { UserDTO } from '@osu-tournament-rating/otr-api-client';
import { USER_COOKIE } from '../utils/auth';
import { isUserDTO } from '../hooks/useSession';
import { cookies } from 'next/headers';

/**
 * Server-side session fetching
 */
export async function getSession(): Promise<UserDTO | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(USER_COOKIE);
  const cookieJson = JSON.stringify(userCookie);

  if (!userCookie) {
    return null;
  }

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
