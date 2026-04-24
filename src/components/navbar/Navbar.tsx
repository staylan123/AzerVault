import { Link } from "react-router-dom"
import { SiLionair } from "react-icons/si"

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4 bg-[#0B0D12]/60 backdrop-blur-md border-b border-white/[0.06]">
      <Link to="/" className="flex items-center gap-2.5 group">
        <SiLionair className="text-2xl text-primary transition-colors group-hover:text-primary-hover" />
        <span className="text-lg font-semibold tracking-tight text-text-primary transition-colors group-hover:text-primary-hover">
          AzerVault
        </span>
      </Link>
    </nav>
  )
}

export default Navbar
