import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from '../cookies/cookiesConfig';

export async function middleware(request: NextRequest) {
  const cookieStorage = cookies();
  const token = await getCookie({
    cookieStorage,
    cookieCategory: 'authToken',
  });

  // Redirecione para a página inicial se o token não existir/estiver disponível
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};