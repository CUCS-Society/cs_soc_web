import { ComponentProps } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import Link from "next/link";
import { Dictionary } from "./Translation";

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


function NavbarPlugin({ contents }: NavbarProps) {
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




export function Navbar( { lang } : { lang : string }){
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

    return <NavbarPlugin contents={CS_NavbarContents} />
};