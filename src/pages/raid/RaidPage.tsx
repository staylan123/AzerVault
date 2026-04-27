import { Link } from "react-router-dom"
import { Trophy, Swords } from "lucide-react"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const CARDS = [
  {
    to: "/raid/hall-of-fame",
    icon: Trophy,
    title: "Hall of Fame",
    description: "Browse world, region, and realm rankings for mythic raid clears.",
  },
  {
    to: "/raid/boss-rankings",
    icon: Swords,
    title: "Boss Rankings",
    description: "See which guilds rank highest for a specific boss kill.",
  },
]

const RaidPage = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />

    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-12 pt-24">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Raiding</h1>
        <p className="mt-1 text-sm text-text-muted">Raid progression and rankings</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ to, icon: Icon, title, description }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40 hover:bg-surface/80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <Icon size={18} />
            </div>
            <div>
              <p className="font-semibold text-text-primary">{title}</p>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>

    <Footer />
  </div>
)

export default RaidPage
