import Link from 'next/link'
import { Dictionary } from '@/components/Translation'
import { LanguageToggle } from './LanguageToggle'
import { ModeToggle } from './ModeToggle'
import { Navbar } from './Navbar'


function IconName({ lang }: { lang: string }) {
  const t = Dictionary[lang];

  return (
      <div className="max-w-4xl mx-auto px-7 py-5">
        <div className="flex items-start justify-between gap-4">
          <Link href={`/soc_web`} className="flex items-center gap-5 mb-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm">CS</span>
            </div>
            <div>
              <h1 className="text-base font-bold">CUCS</h1>
              <p className="text-xs">{t.cucs}</p>
            </div>
          </Link>
          
          <div className="flex gap-2">
            <LanguageToggle lang={lang} />
            <ModeToggle lang={lang} />
          </div>
        </div>

      </div>
  )
}



export function Header({ lang }: { lang: string }) {
  const t = Dictionary[lang];

  return (
    <header className="w-full">
      <IconName lang={lang} />
      <div className="w-full">
        <Navbar lang={lang}/>
      </div>

    </header>
  )
}
