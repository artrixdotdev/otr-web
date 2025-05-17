'use server';

import {
  IOtrApiWrapperConfiguration,
  MeWrapper,
} from '@osu-tournament-rating/otr-api-client';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export async function me() {
  return new MeWrapper(await configuration());
}

export async function configuration() {
  return {
    baseUrl: process.env.OTR_API_ROOT as string,
    postConfigureClientMethod(instance) {
      // Add authorization header
      instance.interceptors.request.use(
        async (config) => {
          const cookieThing = await cookies();
          const foo = cookieThing.get('otr-session');

          config.withCredentials = true;
          config.headers.set('cookie', `otr-session=${foo?.value}`);

          if (!config.requiresAuthorization) {
            return config;
          }

          return config;
        },
        (error) => Promise.reject(error)
      );

      // Automatically handle 404s with a redirect
      // https://nextjs.org/docs/app/api-reference/functions/not-found
      instance.interceptors.response.use(
        (res) => res,
        (error) => {
          if (
            'status' in error &&
            typeof error.status === 'number' &&
            error.status === 404
          ) {
            return notFound();
          }

          return Promise.reject(error);
        }
      );
    },
  } as IOtrApiWrapperConfiguration;
}
