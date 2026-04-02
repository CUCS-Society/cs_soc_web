import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin";

async function getHistoryContent(): Promise<string | null> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "html",
    "about",
    "history-of-cucs.html"
  );

  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export default async function Page() {
  const content = await getHistoryContent();

  if (!content) {
    notFound();
  }

  return (
    <div className="mx-auto w-[90%] lg:w-1/2 max-w-none py-10">
        <BreadcrumbPlugin
        items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
        ]}
        />

      <article className="prose max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}
