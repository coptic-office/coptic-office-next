
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['ar', 'en'], // Supported languages
    defaultLocale: 'ar',   // Default language
    localeDetection: false // We'll handle detection manually
});

export async function middleware (req) {
    const { nextUrl: url } = req;
    const { pathname } = url;

    // If the URL already includes a locale, continue
    if (pathname.startsWith('/en') || pathname.startsWith('/ar')) {
        return NextResponse.next();
    }

    // Get the preferred language from the browser
    const acceptLanguage = req.headers.get('accept-language');
    const preferredLocale = 'ar';

    // Redirect to the preferred locale if supported
    const locale = ['en', 'ar'].includes(preferredLocale) ? preferredLocale : 'ar';
    const redirectUrl = new URL(`/${locale}${pathname}`, req.url);

    return NextResponse.redirect(redirectUrl);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};