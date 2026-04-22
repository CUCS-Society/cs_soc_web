import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const categories = ["learn", "archive", "constitution"] as const;

export default async function CategoryLayout({ children, params } : { children: React.ReactNode, params: Promise<{ lang : string, category: string }> }) {
  const { category } = await params;

    if (!categories.includes(category as any)) {
        notFound();
    }

  return (
    <div>
      {children}
    </div>
  );
}