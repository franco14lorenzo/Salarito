import { ReactNode } from 'react'

import { Inter } from 'next/font/google'
import Link from 'next/link'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Salarito',
  description: 'Your personal salary visualizer'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} dark`}>
        <header className="mb-4 flex w-full border-b">
          <nav className="container mx-auto px-4 py-2">
            <ul className="flex items-center justify-center">
              <li>
                <Link href="/" className="py-1 text-lg font-medium">
                  💸 Salarito 💸
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
