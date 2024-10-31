import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // Если путь начинается с /proxy-api, перенаправляем на внешний API
  if (url.pathname.startsWith('/proxy-api')) {
    url.hostname = 'api.mangadex.org'
    url.pathname = url.pathname.replace('/proxy-api', '')

    // Устанавливаем необходимые заголовки для CORS
    const headers = new Headers(req.headers)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    )
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    // Проксируем запрос и возвращаем результат
    const response = await fetch(url.toString(), {
      headers,
      method: req.method,
      body: req.method !== 'GET' ? req.body : undefined,
    })
    return new NextResponse(response.body, {
      headers: response.headers,
      status: response.status,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/proxy-api/:path*',
}
