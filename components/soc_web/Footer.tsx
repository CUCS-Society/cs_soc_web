"use client"

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t">
      <div className="mx-auto max-w-4xl px-7 py-8">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="mb-1 font-medium">
              © 2014-2026 CUHK Computer Science Society
            </p>
            <p className="text-xs">Powered by modern design</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              className="font-medium hover:text-black"
            >
              Instagram
            </a>
            <a
              href="mailto:contact@cscs.hk"
              className="font-medium hover:text-black"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
