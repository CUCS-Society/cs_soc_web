import { NextRequest, NextResponse } from "next/server"; 

let locales = ['en-US', 'zh-HK']


function getLocale(request : NextRequest) { 
    const referer = request.headers.get('next-url') || null;
    const defaultLocale = 'zh-HK'
    const languages = request.headers.get('accept-language')?.split(',')[0] || defaultLocale;

    if(referer){
        for (const locale of locales) {
            if (referer.startsWith(`/${locale}/`) || referer === `/${locale}`) {
                return locale;
            }
        }
    }
    
    if(locales.includes(languages)) return languages;
    else return defaultLocale;
}

export function proxy( request : NextRequest ) {
    const  { pathname } = request.nextUrl;
    const pathnameHasSoc_web = pathname.startsWith(`/soc_web`) || pathname === `/soc_web`

    console.log(pathname, pathnameHasSoc_web);

    if(!pathnameHasSoc_web) return;
    
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