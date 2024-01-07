import { NextRequest, NextResponse } from 'next/server';

import { Role } from '@shared/constants/role';

export async function withAuth(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie'); // 쿠키 추출

    const url = req.nextUrl.clone();
    const currentPath = url.pathname.slice(1);
    url.pathname = '/login';
    url.searchParams.set('from', currentPath);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/authenticate`, {
      headers: {
        Cookie: cookies || '', // 추출한 쿠키를 요청에 추가
      },
    });

    const response = await res.json();

    if (response.status === 200) {
      return NextResponse.next();
    }
    if (response.status === 401) {
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.log('err: ', error);
    throw new Error(`Couldn't check authentication`);
  }
}

export async function withAdmin(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie'); // 쿠키 추출

    const url = req.nextUrl.clone();
    url.pathname = '/admin';

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/authenticate`, {
      headers: {
        Cookie: cookies || '', // 추출한 쿠키를 요청에 추가
      },
    });

    const response = await res.json();

    console.log('response: ', response);

    if (response.status === 200) {
      if (response.data.role !== Role.ADMIN) {
        // alert('관리자만 접근 가능합니다.'); SSR에서는 alert 사용 불가
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    if (response.status === 401) {
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.log('err: ', error);
    throw new Error(`Couldn't check authentication`);
  }
}
