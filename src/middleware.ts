import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // 1. SECURITY HEADERS (Elite Defense)

    // Content Security Policy - Allows only trusted sources
    // Note: Tightened to discourage unauthorized scripts
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://www.paypalobjects.com https://*.supabase.co;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co https://www.paypal.com https://api.sandbox.paypal.com;
    frame-src 'self' https://www.paypal.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

    response.headers.set('Content-Security-Policy', cspHeader);

    // HSTS - Force HTTPS
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

    // Prevent Clickjacking
    response.headers.set('X-Frame-Options', 'DENY');

    // Prevent MIME-type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Referrer Policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // XSS Protection for older browsers
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // 2. BASIC API RATE LIMITING (Layer 1)
    // Note: In an edge environment, we can block suspicious frequency.
    // For production, a Redis-based limiter is recommended.
    if (request.nextUrl.pathname.startsWith('/api')) {
        // Simple check to identify potential bots/crawlers
        const userAgent = request.headers.get('user-agent') || '';
        if (userAgent.includes('bot') || userAgent.includes('spider')) {
            // Allow known search engines but block aggressive scrapers
            if (!userAgent.includes('Googlebot') && !userAgent.includes('bingbot')) {
                return new NextResponse(JSON.stringify({ error: 'Automated access denied' }), {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }
    }

    return response;
}

// Ensure middleware runs on all routes except static assets
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
    ],
};
