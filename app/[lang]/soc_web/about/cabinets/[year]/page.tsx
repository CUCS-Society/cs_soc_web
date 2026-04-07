import { notFound } from "next/navigation";
import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin";
import { readFile } from "fs/promises";
import path from "path";
import { Dictionary } from "@/components/Translation";

interface CabinetProps {
  params: Promise<{
    lang: string;
    year: string;
  }>;
}

async function getCabinetContent( year : string ): Promise<string | null> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "doc",
    `${Number(year) - 1978}th_${year}`,
    `${Number(year) - 1978}th.html`
    );

  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export default async function Page({ params }  : CabinetProps) {
    const { lang, year } = await params;
    const t = Dictionary[lang];
    const content = await getCabinetContent(year);

  if (!content) {
    notFound();
  }

  return (
    <div className="mx-auto w-[90%] lg:w-1/2 max-w-none py-10">
        <BreadcrumbPlugin
        items={[
            { label: t.home, href: `/${lang}` },
            { label: t.about, href: `/${lang}/about/history-of-cucs`},
            { label: t.pastCabinet, href: `/${lang}/about/cabinets` },
            { label: year, href: `/${lang}/about/cabinets/${year}`}
        ]}
        />

      <article className="prose max-w-none dark:prose-invert">
        <base href="/"/>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}
