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

async function getHistoryContent(): Promise<string | null> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "html",
    "about",
    "history-of-cucs.html"
  )

  try {
    return await readFile(filePath, "utf8")
  } catch {
    return null
  }
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const t = Dictionary[lang]
  const content = await getHistoryContent()

  if (!content) {
    notFound()
  }

  return (
    <div>
      <BreadcrumbPlugin
        items={[
          { label: t.home, href: `./..` },
          { label: t.about, href: `.` },
        ]}
      />

      <article className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  )
}
