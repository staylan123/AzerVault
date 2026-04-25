import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, Menu, X } from "lucide-react"
import { SiLionair } from "react-icons/si"
import { useTheme } from "@/context/ThemeContext"

const NAV_LINKS = [
  { to: "/character", label: "Character Lookup" },
  { to: "/guild", label: "Guild Lookup" },
  { to: "/affixes", label: "Affixes" },
  { to: "/about", label: "About" },
]

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const close = () => setMenuOpen(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link to="/" onClick={close} className="group flex shrink-0 items-center gap-2.5">
            <SiLionair className="text-2xl text-primary transition-colors group-hover:text-primary-hover" />
            <span className="text-lg font-semibold tracking-tight text-text-primary transition-colors group-hover:text-primary-hover">
              AzerVault
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm transition-colors hover:text-text-primary ${
                  location.pathname.startsWith(to) ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text-primary md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col border-t border-border px-6 py-4 gap-1 md:hidden">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={close}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface hover:text-text-primary ${
                location.pathname.startsWith(to)
                  ? "bg-surface text-text-primary"
                  : "text-text-secondary"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
