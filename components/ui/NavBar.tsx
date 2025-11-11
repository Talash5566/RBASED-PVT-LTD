"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Menu, X } from "lucide-react"
import Logo from "@/components/ui/Logo"
import { Button } from "@/components/ui/button"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/service" },
  { name: "Projects", href: "/projects" },
  { name: "Workshops", href: "/workshops" },
  { name: "Contact Us", href: "/contact" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()
  const [token, setToken] = React.useState<string | null>(null)

  React.useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  React.useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-black bg-opacity-90 backdrop-blur dark:bg-zinc-950/90 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="hidden sm:block text-xl font-bold text-white">
              RBased Services Pvt. Ltd.
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {menuItems.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className={`text-base font-medium transition-colors ${
                      pathname === href
                        ? "text-cyan-400 font-semibold"
                        : "text-gray-400 hover:text-cyan-400"
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

           
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              className="text-white hover:text-gray-300 focus:outline-none p-2"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-16 md:top-20 w-full bg-black/95 backdrop-blur z-40 transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
          <ul className="flex-grow space-y-4">
            {menuItems.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-lg pl-3 rounded transition ${
                    pathname === href
                      ? "text-white font-semibold border-l-4 border-primary"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>


        </div>
      </div>
    </nav>
  )
}
