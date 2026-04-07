import { NextRequest, NextResponse } from "next/server"; 
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'

let locales = ['en-US', 'zh-HK']


function getLocale(request : NextRequest) { 
    const headers = { 'accept-language': request.headers.get('accept-language')};
    const referer = request.headers.get('next-url');

    const languages = new Negotiator({ headers : headers }).languages()
    const defaultLocale = 'zh-HK'


    console.log(referer);
    
    if(referer){
        for (const locale of locales) {
            if (referer.startsWith(`/${locale}/`) || referer === `/${locale}`) {
                return locale;
            }
        }
    }

    return match(languages, locales, defaultLocale);
}

export function proxy( request : NextRequest ) {
    const  { pathname } = request.nextUrl;
    
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return;

    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}