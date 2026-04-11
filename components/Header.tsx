import Link from "next/link"
import { Dictionary } from "@/components/Translation"
import { LanguageToggle } from "./LanguageToggle"
import { ModeToggle } from "./ModeToggle"
import { Navbar } from "./Navbar"
import { headers } from "next/headers"
import { auth } from "@/lib/auth/auth"
import { SignoutButton } from "./SignoutButton"
import { SigninButton } from "./SigninButton"

async function IconName({ lang }: { lang: string }) {
  const t = Dictionary[lang]
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="mx-auto max-w-4xl px-7 py-5">
      <div className="flex items-start justify-between gap-4">
        <Link href={`/soc_web`} className="mb-3 flex items-center gap-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg">
            <span className="text-sm font-bold">CS</span>
          </div>
          <div>
            <h1 className="text-base font-bold">CUCS</h1>
            <p className="text-xs">{t.cucs}</p>
          </div>
        </Link>

        <div className="flex gap-2">
          <LanguageToggle lang={lang} />
          <ModeToggle lang={lang} />
          {session ? <SignoutButton /> : <SigninButton />}
        </div>
      </div>
    </div>
  )
}

export async function Header({ lang }: { lang: string }) {
  return (
    <header className="w-full">
      <IconName lang={lang} />
      <div className="w-full">
        <Navbar lang={lang} />
      </div>
    </header>
  )
}
