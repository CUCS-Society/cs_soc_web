import { notFound } from "next/navigation"
import { BreadcrumbPlugin } from "@/components/soc_web/BreadcrumbPlugin"
import { readFile } from "fs/promises"
import path from "path"
import { Dictionary } from "@/components/soc_web/Translation"
import { prisma } from "@/lib/prisma"

interface CabinetProps {
  params: Promise<{
    lang: string
    year: string
  }>
}


export default async function Page({ params }: CabinetProps) {
  const { lang, year } = await params
  const t = Dictionary[lang]
  const cabinet = await prisma.cabinet.findUnique({
    where: {
      year: Number(year),
    },
  })

  const content = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}${process.env.__NEXT_BASE_PATH}${cabinet?.htmlhref}`|| "").then(res => res.ok ? res.text() : null);

  if (!content || !cabinet?.htmlhref) {
    notFound()
  }

  return (
    <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">
      <BreadcrumbPlugin
        items={[
          { label: t.home, href: `` },
          { label: t.about, href: `/about/history-of-cucs` },
          { label: t.pastCabinet, href: `/about/cabinets` },
          { label: year, href: `/about/cabinets/${year}` },
        ]}
      />

      <article className="prose dark:prose-invert max-w-none">
        <base href="/" />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  )
}
