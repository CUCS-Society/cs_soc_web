import { Dictionary } from "@/components/soc_web/Translation"
import { CreateCabinetDialog } from "@/components/ui/create-cabinet-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Cabinet } from "@/generated/prisma/client"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

function CabinetPreview({ lang, cabinet }: { lang: string; cabinet: Cabinet }) {
  const ordinal = `${cabinet.editionNumber}th`
  const basePath = process.env.__NEXT_BASE_PATH ?? ""

  const href = `/soc_web/about/cabinets/${cabinet.year}`

  const iconSrc = cabinet.iconSrc
    ? `${basePath}${cabinet.iconSrc}`
    : `${basePath}/doc/${cabinet.editionNumber}th_${cabinet.year}/logo_${cabinet.editionNumber}.png`

  return (
    <Link href={href}>
      <div className="flex items-center gap-4 rounded-lg border p-4 shadow-sm">
        <div className="relative h-12 w-12">
          <img
            src={iconSrc}
            alt={`${cabinet.zhName || cabinet.enName || "No name"}`}
            sizes="48px"
            className="object-contain"
          />
        </div>
        <div>
          <div className="font-semibold">{cabinet.zhName || cabinet.enName || "No name"}</div>
          <div>
            {ordinal}
            {Dictionary[lang].cabinet}
          </div>
          <div className="text-sm text-gray-500">cabinets/{ordinal}</div>
        </div>
      </div>
    </Link>
  )
}

export default async function Page({
  lang,
  cabinets,
  isLoggedIn,
}: {
  lang: string
  cabinets: Cabinet[]
  isLoggedIn: boolean
}) {

  return (
    <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">

      <div className="grid gap-4">
        {isLoggedIn && (
          <CreateCabinetDialog
            lang={lang}
            trigger={
              <Card className="cursor-pointer border-dashed bg-muted/20 transition-colors hover:bg-muted/40">
                <CardContent className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                  <PlusIcon className="size-4" />
                  <span className="font-medium">Add cabinet</span>
                </CardContent>
              </Card>
            }
          />
        )}

        {cabinets.map((cabinet) => {
          return (
            <CabinetPreview
              lang={lang}
              cabinet={cabinet}
              key={cabinet.id}
            />
          )
        })}
      </div>
    </div>
  )
}
