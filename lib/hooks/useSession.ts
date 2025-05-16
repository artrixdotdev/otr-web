import { cookies } from 'next/headers';
import { UserDTO } from '@osu-tournament-rating/otr-api-client';

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
 * Attempts to read user session data from stored cookie
 */
export async function useSession(): Promise<UserDTO | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('otr-user');

  if (!userCookie?.value) {
    return null;
  }

  // Parse cookie into JSON and ensure it is a UserDTO
  try {
    const parsedUser = JSON.parse(userCookie.value);

    if (!isUserDTO(parsedUser)) {
      console.error('Invalid user data structure in cookie');
      return null;
    }

    return parsedUser;
  } catch (error) {
    console.error('Failed to parse user session:', error);
    return null;
  }
}
