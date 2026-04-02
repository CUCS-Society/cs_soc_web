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

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
      <NavigationMenuLink asChild>
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

function IconName() {
  return (
      <div className="max-w-4xl mx-auto px-7 py-5">
        <div className="flex items-start justify-between gap-4">
          <Link href="/" className="flex items-center gap-5 mb-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm">CS</span>
            </div>
            <div>
              <h1 className="text-base font-bold">CUCS</h1>
              <p className="text-xs">Computer Science Society</p>
            </div>
          </Link>
          <ModeToggle />
        </div>

      </div>
  )
}

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header() {

  const CS_NavbarContents: NavbarContent[] =
  [
    {
      title: "About", 
      href: "/about",
      children: [
        {
          title: "History",
          href: "/about/history-of-cucs",
        },
        {
          title: "Past Cabinets",
          href: "/about/cabinets"
        }
      ]
    },
    {
      title: "News", 
      href: "/posts/all",
      children: [
        {
          title: "Notice",
          href: "/posts/notice",
        },
        {
          title: "Event",
          href: "/posts/event"
        },
        {
          title: "College",
          href: "/posts/college"
        },
        { 
          title: "Other",
          href: "/posts/other"
        }
      ]
    },
    {
      title: "Documents",
      href: "/docs",
      children: [
        {
          title: "Constitution",
          href: "/docs/constitution"
        }
      ]
    }
  ];


  return (
    <header className="w-full">
      <IconName />
      <div className="w-full">
        <Navbar contents={CS_NavbarContents}/>
      </div>

    </header>
  )
}
