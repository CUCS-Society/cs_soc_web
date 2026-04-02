import { notFound } from "next/navigation";
import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin";
import { readFile } from "fs/promises";
import path from "path";
import Image from "next/image";

interface CabinetPreviewProps {
  year: string;
  name: string;
}

function CabinetPreview({ year, name }: CabinetPreviewProps) {
  const index = Number(year) - 1978;
  const ordinal = `${index}th`;
  const href = `/about/cabinets/${year}`;
  const iconSrc = `/doc/${index}th_${year}/logo_${index}.png`;

  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg shadow-sm">
      <div className="relative h-12 w-12">
        <Image
          src={iconSrc}
          alt={`${name} logo`}
          fill
          sizes="48px"
          className="object-contain"
        />
      </div>
      <div>
        <div className="font-semibold">{name}</div>
        <div>
          <a href={href} className="text-blue-600 hover:underline">
            {ordinal} Cabinet
          </a>
        </div>
        <div className="text-sm text-gray-500">
          cabinets/{ordinal}
        </div>
      </div>
    </div>
  );
}


const CabinetsPropsList : CabinetPreviewProps[] = [
  {
    year: "2025",
    name: "Cohaesio"
  },
  {
    year: "2024",
    name: "IDK"
  }
];

export default async function Page() {
      return (
        <div className="mx-auto w-[90%] lg:w-1/2 max-w-none py-10">
            <BreadcrumbPlugin
            items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about/history-of-cucs"},
                { label: "Past Cabinet", href: "/about/cabinets" },
            ]}
            />

            {
              CabinetsPropsList.map((Cabinet) => {
                return (
                  <CabinetPreview year={Cabinet.year} name={Cabinet.name}/>
                )
              })
            }
        </div>
      );
}

