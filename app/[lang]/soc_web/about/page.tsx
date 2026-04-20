import { notFound } from "next/navigation"
import { readFile } from "fs/promises"
import path from "path"
import { BreadcrumbPlugin } from "@/components/soc_web/BreadcrumbPlugin"
import { Dictionary } from "@/components/soc_web/Translation"

interface PageProps {
  params: Promise<{
    lang: string
  }>
}


export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const t = Dictionary[lang]

  return (
    <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">
      <BreadcrumbPlugin
        items={[
          { label: t.home, href: `./..` },
          { label: t.about, href: `.` },
        ]}
      />

      <article className="prose dark:prose-invert max-w-none">

      </article>
    </div>
  )
}
