"use client"

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Dictionary } from "@/components/soc_web/Translation"

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface Navbar1Props {
  className?: string
  lang: string
}

const Navbar = ({ className, lang }: Navbar1Props) => {
  const t = Dictionary[lang]

  const menu: MenuItem[] = [
    {
      title: t.about,
      url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/about`,
      items: [
        {
          title: t.history,
          description: "The history of cucs",
          icon: <Book className="size-5 shrink-0" />,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/about`,
        },
        {
          title: t.pastCabinets,
          description: "Our past cabinets",
          icon: <Trees className="size-5 shrink-0" />,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/about/cabinets`,
        },
      ],
    },
    {
      title: t.news,
      url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/news`,
      items: [
        {
          title: t.all,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/news/all`,
        },
        {
          title: t.notice,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/news/notice`,
        },
        {
          title: t.college,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/news/college`,
        },
        {
          title: t.event,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/news/event`,
        },
        {
          title: t.other,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/news/other`,
        },
      ],
    },
    {
      title: t.documents,
      url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/docs`,
      items: [
        {
          title: "Learn",
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/docs/learn`,
        },
        {
          title: t.archive,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/docs/archive`,
        },
        {
          title: t.constitution,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/soc_web/docs/constitution`,
        },
      ],
    },
  ]

  return (
    <div>
      {/* Desktop Menu */}
      <nav className="items-center justify-between">
        <div className="flex w-full items-center justify-center gap-6">
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </div>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title}>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  )
}

export { Navbar }
