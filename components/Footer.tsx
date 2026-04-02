'use client'

export function Footer() {
  return (
    <footer className="w-full border-t mt-auto">
      <div className="max-w-4xl mx-auto px-7 py-8">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="font-medium mb-1">© 2014-2026 CUHK Computer Science Society</p>
            <p className="text-xs">Powered by modern design</p>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com" className="hover:text-black font-medium">
              Instagram
            </a>
            <a href="mailto:contact@cscs.hk" className="hover:text-black font-medium">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
