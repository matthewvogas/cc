export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard',
    '/api',
    '/campaigns',
    '/clients',
    '/creators',
    '/reports',
  ],
}
