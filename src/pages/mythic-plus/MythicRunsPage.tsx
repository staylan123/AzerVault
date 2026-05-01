import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

const MythicRunsPage = () => (
  <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-12 pt-24">
    <Link
      to="/mythic-plus"
      className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
    >
      <ChevronLeft size={15} />
      Mythic+
    </Link>
  </main>
)

export default MythicRunsPage
