import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request) {
  let jwt_token = request.cookies.get('jwt_token');

  if (jwt_token) {
    const apiEndpoint = `${process.env.API_URL}user/check_auth`;

    try {
      const requestBody = {
        token: process.env.MYKEY,
      };

      const apiResponse = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt_token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
      

        if (data.error) {
          return NextResponse.redirect(new URL('/account/user_login', request.url));
        } else {
          const response = NextResponse.next();
          response.cookies.set('api_data', JSON.stringify(data), {
            httpOnly: true,
            secure: request.url.startsWith('https'),
            sameSite: 'lax',
            maxAge: 86400,
          });
          return response;
        }
      } else {
        return NextResponse.redirect(new URL('/account/user_login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/account/user_login', request.url));
    }
  } else {
    return NextResponse.redirect(new URL('/account/user_login', request.url));
  }
}

export const config = {
  matcher: ['/feeds/:path*','/user/:path*'],
};
