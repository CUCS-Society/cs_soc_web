import { BreadcrumbPlugin } from "@/components/soc_web/BreadcrumbPlugin"
import { Dictionary } from "@/components/soc_web/Translation"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

interface CabinetPreviewProps {
  year: string
  name: string
  t: Record<string, string>
}

function CabinetPreview({ year, name, t }: CabinetPreviewProps) {
  const index = Number(year) - 1978
  const ordinal = `${index}th`
  const href = `/soc_web/about/cabinets/${year}`
  const iconSrc = `${process.env.__NEXT_BASE_PATH}/doc/${index}th_${year}/logo_${index}.png`

  return (
    <Link href={href}>
      <div className="flex items-center gap-4 rounded-lg border p-4 shadow-sm">
        <div className="relative h-12 w-12">
          <img
            src={iconSrc}
            alt={`${name}${t.logoAlt}`}
            sizes="48px"
            className="object-contain"
          />
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div>
            {ordinal}
            {t.cabinet}
          </div>
          <div className="text-sm text-gray-500">cabinets/{ordinal}</div>
        </div>
      </div>
    </Link>
  )
}

const CabinetsPropsList = [
  {
    year: "2025",
    name: "Cohaesio",
  },
  {
    year: "2024",
    name: "IDK",
  },
]

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const t = Dictionary[lang]

  return (
    <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">
      <BreadcrumbPlugin
        items={[
          { label: t.home, href: `./..` },
          { label: t.about, href: `.` },
          { label: t.pastCabinets, href: `.` },
        ]}
      />

      {CabinetsPropsList.map((Cabinet) => {
        return (
          <CabinetPreview
            key={Cabinet.year}
            year={Cabinet.year}
            name={Cabinet.name}
            t={t}
          />
        )
      })}
    </div>
  )
}
