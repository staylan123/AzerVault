import { Link } from "react-router-dom"
import { SiLionair } from "react-icons/si"

const Navbar = () => (
  <nav className="fixed left-0 right-0 top-0 z-50 flex items-center gap-8 border-b border-white/[0.06] bg-[#0B0D12]/70 px-6 py-3 backdrop-blur-md">
    <Link to="/" className="group flex shrink-0 items-center gap-2.5">
      <SiLionair className="text-2xl text-primary transition-colors group-hover:text-primary-hover" />
      <span className="text-lg font-semibold tracking-tight text-text-primary transition-colors group-hover:text-primary-hover">
        AzerVault
      </span>
    </Link>

    <Link
      to="/character"
      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
    >
      Character Lookup
    </Link>
  </nav>
)

export default Navbar
