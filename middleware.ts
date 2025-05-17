import { NextRequest, NextResponse } from 'next/server';
import { Roles } from '@osu-tournament-rating/otr-api-client';

export default async function middleware(req: NextRequest) {
  // Sanitize headers
  // for (const header of Object.keys(OTR_HEADERS)) {
  //   req.headers.delete(header);
  // }

  // Try to read raw session data from the incoming request cookies
  // const session = await getSession();
  // const session = req.headers.getSetCookie();
  // console.log(req.cookies);
  // If there is no session data (not logged in), always redirect early
  // if (!session) {
  //   return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin));
  // }

  // // Permission check
  // if (!session.scopes?.includes(Roles.Whitelist)) {
  //   return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin));
  // }

  return;
}

export const config = {
  matcher: [
    /*
     * Middleware runs on all paths except:
     * - '/api/*' API routes
     * - '/unauthorized/*' Access control redirect
     * - '/_next/*' Next.js internals
     * - '/[static, decorations, icons, images, logos, favicon]/*' Static assets / public dir
     */
    '/((?!api|unauthorized|_next|static|decorations|icons|images|logos|favicon.ico).*)',
  ],
};
