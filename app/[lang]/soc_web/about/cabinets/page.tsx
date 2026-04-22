import { BreadcrumbPlugin } from "@/components/soc_web/BreadcrumbPlugin"
import { Dictionary } from "@/components/soc_web/Translation"
import CabinetPageClient from "./page-client"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function Page( { params }: PageProps) {
  const { lang } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const cabinets = await prisma.cabinet.findMany({
    orderBy: {
      year: "desc",
    },
  })

  return (
    <div className="p-10 lg:w-1/2">
      <BreadcrumbPlugin
        items={[
          { label: Dictionary[lang].home, href: `./..` },
          { label: Dictionary[lang].about, href: `.` },
          { label: Dictionary[lang].pastCabinets, href: `.` },
        ]}
      />

      <CabinetPageClient
        lang={lang}
        cabinets={cabinets}
        isLoggedIn={Boolean(session?.user?.id)}
      />
    </div>
  )
}
