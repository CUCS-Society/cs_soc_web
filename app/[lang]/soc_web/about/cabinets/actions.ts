"use server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

function parseOptionalString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length ? trimmed : null
}

function parseRequiredInt(value: FormDataEntryValue | null, fieldName: string) {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} is required`)
  }

  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    throw new Error(`${fieldName} must be an integer`)
  }

  return parsed
}

export async function createCabinet(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const lang = parseOptionalString(formData.get("lang"))
  const year = parseRequiredInt(formData.get("year"), "Year")
  const editionNumber = parseRequiredInt(
    formData.get("editionNumber"),
    "Edition number"
  )

  if (year < 1900 || year > 2100) {
    throw new Error("Year must be between 1900 and 2100")
  }

  if (editionNumber < 0 || editionNumber > 1000) {
    throw new Error("Edition number looks invalid")
  }

  const enName = parseOptionalString(formData.get("enName"))
  const zhName = parseOptionalString(formData.get("zhName"))
  const htmlhref = parseOptionalString(formData.get("htmlhref"))
  const iconSrc = parseOptionalString(formData.get("iconSrc"))

  if (!enName && !zhName) {
    throw new Error("At least one of English name or Chinese name is required")
  }

  const existing = await prisma.cabinet.findFirst({
    where: { year },
    select: { id: true },
  })

  if (existing) {
    throw new Error(`Cabinet for year ${year} already exists`)
  }

  await prisma.cabinet.create({
    data: {
      year,
      editionNumber,
      ...(enName ? { enName } : {}),
      ...(zhName ? { zhName } : {}),
      htmlhref,
      iconSrc,
    },
  })

  if (lang && !lang.includes("/")) {
    revalidatePath(`/${lang}/soc_web/about/cabinets`)
  }
  revalidatePath(`/[lang]/soc_web/about/cabinets`)
}
