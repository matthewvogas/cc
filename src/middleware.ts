export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!register|login|api|privacy-policy|terms-of-service).*)'],
}
