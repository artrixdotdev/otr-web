import {
  AdminNotesWrapper,
  GameScoresWrapper,
  GamesWrapper,
  LeaderboardsWrapper,
  MatchesWrapper,
  MeWrapper,
  SearchWrapper,
  TournamentsWrapper,
  ProblemDetails,
  HttpValidationProblemDetails,
  AuthWrapper,
} from '@osu-tournament-rating/otr-api-client';
import { configuration } from './actions/api';


interface ValidationProblemDetails<T extends object>
  extends HttpValidationProblemDetails {
  errors?: { [key in keyof Partial<T>]: string[] };
}

/** Type guard for determining if an object is {@link ProblemDetails} */
export function isProblemDetails(obj: unknown): obj is ProblemDetails {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    'title' in obj &&
    'status' in obj
  );
}

/** Type guard for determining if an object is {@link HttpValidationProblemDetails} */
export function isValidationProblemDetails<T extends object = object>(
  obj: unknown
): obj is ValidationProblemDetails<T> {
  return (
    isProblemDetails(obj) &&
    'errors' in obj &&
    typeof obj.errors === 'object' &&
    Object.values(obj.errors).every(
      (value) =>
        Array.isArray(value) && value.every((v) => typeof v === 'string')
    )
  );
}

export const adminNotes = new AdminNotesWrapper(configuration);
export const auth = new AuthWrapper(configuration);
export const games = new GamesWrapper(configuration);
export const leaderboards = new LeaderboardsWrapper(configuration);
export const matches = new MatchesWrapper(configuration);
export const scores = new GameScoresWrapper(configuration);
export const search = new SearchWrapper(configuration);
export const tournaments = new TournamentsWrapper(configuration);
