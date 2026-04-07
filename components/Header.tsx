'use client'

import Link from 'next/link'
import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { ComponentProps } from 'react'

import { Moon, Sun, Languages } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dictionary } from '@/components/Translation'

interface NavbarContent
{
  title: string;
  href: string;
  description?: string;
  children?: NavbarContent[];
}

interface NavbarProps extends ComponentProps<typeof NavigationMenu> {
  contents: NavbarContent[];
}

function ListItem({
  title,
  href,
  description,
  children,
}: NavbarContent) {
  return (
    <li>
      <NavigationMenuLink>
        <Link href={href}>
          <div className="flex flex-col gap-1">
            <div className="leading-none font-medium">{title}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}


function Navbar({ contents }: NavbarProps) {
  return (
    <NavigationMenu className="w-full max-w-none">
      <NavigationMenuList className={`justify-center`}>
        {
          contents.map((content, index) => (
            <NavigationMenuItem key={content.title} className='px-10'>
              <NavigationMenuTrigger>
                <Link href={content.href}>
                {content.title}
                </Link>
              </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-auto">
                    {
                      content.children?.map((child)=>(
                        <ListItem 
                          key={child.title}
                          {...child}
                        >
                        </ListItem>
                      ))
                    }
                  </ul>
                </NavigationMenuContent>
                {/* <ListItem {...content}/> */}
            </NavigationMenuItem>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function IconName({ lang }: { lang: string }) {
  const t = Dictionary[lang];

  return (
      <div className="max-w-4xl mx-auto px-7 py-5">
        <div className="flex items-start justify-between gap-4">
          <Link href={`/soc_web`} className="flex items-center gap-5 mb-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm">CS</span>
            </div>
            <div>
              <h1 className="text-base font-bold">CUCS</h1>
              <p className="text-xs">{t.cucs}</p>
            </div>
          </Link>
          <div className="flex gap-2">
            <LanguageToggle lang={lang} />
            <ModeToggle lang={lang} />
          </div>
        </div>

      </div>
  )
}

export function ModeToggle({ lang }: { lang: string }) {
  const { setTheme } = useTheme()
  const t = Dictionary[lang];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LanguageToggle({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: string) => {
    const newPath = pathname.replace(``, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en-US")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("zh-HK")}>
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header({ lang }: { lang: string }) {
  const t = Dictionary[lang];

  const CS_NavbarContents: NavbarContent[] =
  [
    {
      title: t.about, 
      href: `/soc_web/about`,
      children: [
        {
          title: t.history,
          href: `/soc_web/about`,
        },
        {
          title: t.pastCabinets,
          href: `/soc_web/about/cabinets`
        }
      ]
    },
    {
      title: t.news, 
      href: `/soc_web/posts/all`,
      children: [
        {
          title: t.notice,
          href: `/soc_web/posts/notice`,
        },
        {
          title: t.event,
          href: `/soc_web/posts/event`
        },
        {
          title: t.college,
          href: `/soc_web/posts/college`
        },
        { 
          title: t.other,
          href: `/soc_web/posts/other`
        }
      ]
    },
    {
      title: t.documents,
      href: `/soc_web/docs/constitution`,
      children: [
        {
          title: t.constitution,
          href: `/soc_web/docs/constitution`
        },
        {
          title: t.archive,
          href: `/soc_web/docs/archive`
        }
      ]
    }
  ];


  return (
    <header className="w-full">
      <IconName lang={lang} />
      <div className="w-full">
        <Navbar contents={CS_NavbarContents}/>
      </div>

    </header>
  )
}
