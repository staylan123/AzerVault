
import { motion } from "framer-motion"
import { SiReact, SiTypescript, SiTailwindcss, SiVite, SiReactrouter, SiFramer } from "react-icons/si"
import { LuPackage } from "react-icons/lu"

const TECH = [
  { icon: SiReact, label: "React 19" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiVite, label: "Vite" },
  { icon: SiReactrouter, label: "React Router" },
  { icon: SiFramer, label: "Framer Motion" },
  { icon: LuPackage, label: "React Icons" },
]

const LINKS = [
  {
    label: "Raider.io",
    href: "https://raider.io",
    description: "The source of all character, guild, and M+ data used in this app.",
  },
  {
    label: "Raider.io API Docs",
    href: "https://raider.io/api",
    description: "Public API documentation for the endpoints powering AzerVault.",
  },
  {
    label: "Wowhead",
    href: "https://wowhead.com",
    description: "Affix and item reference links throughout the app point here.",
  },
]

const About = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-16 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-12"
      >
        {/* Purpose */}
        <section>
          <h1 className="text-3xl font-bold text-text-primary">About AzerVault</h1>
          <p className="mt-4 leading-relaxed text-text-secondary">
            AzerVault is a lightweight World of Warcraft companion tool for quickly looking up
            character profiles, guild rosters, raid progression, Mythic+ runs, and more —
            all without navigating away from a clean interface.
          </p>
          <p className="mt-3 leading-relaxed text-text-secondary">
            Features include character and guild profiles, raid Hall of Fame, boss and raid
            rankings, this week's Mythic+ affixes, and top Mythic+ run leaderboards by season,
            dungeon, and region.
          </p>
          <p className="mt-3 leading-relaxed text-text-secondary">
            All data is fetched live from the{" "}
            <a
              href="https://raider.io/api"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Raider.io public API
            </a>
            , so results always reflect the latest crawled state of the game.
          </p>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-text-muted">Tech Stack</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {TECH.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-xl bg-surface px-4 py-3"
              >
                <Icon className="text-lg text-primary" />
                <span className="text-sm font-medium text-text-primary">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-text-muted">Links &amp; Credits</h2>
          <div className="mt-4 flex flex-col gap-3">
            {LINKS.map(({ label, href, description }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-0.5 rounded-xl bg-surface px-4 py-3 border border-transparent transition-colors hover:border-primary/40"
              >
                <span className="text-sm font-medium text-primary">{label} ↗</span>
                <span className="text-xs text-text-muted">{description}</span>
              </a>
            ))}
          </div>
        </section>
      </motion.div>
  </main>
)

export default About
