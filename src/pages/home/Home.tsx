import { motion } from "framer-motion"
import { SiLionair } from "react-icons/si"
import bgDark from "@/assets/HomePageBackground.jpg"
import bgLight from "@/assets/HomePageBackgroundLight.jpg"
import { useTheme } from "@/context/ThemeContext"

const Home = () => {
  const { theme } = useTheme()

  return (
    <div className="relative flex flex-1 items-center justify-center">
        <img
          src={theme === "dark" ? bgDark : bgLight}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className={`absolute inset-0 ${theme === "dark" ? "bg-background/80" : "bg-background/40"}`} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
        >
          <SiLionair className="text-6xl text-primary" />
          <h1 className="text-5xl font-bold tracking-tight text-text-primary sm:text-7xl">
            AzerVault
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-text-secondary sm:text-xl">
            Your World of Warcraft character hub. Track Mythic+ scores, raid progression, and gear — powered by real-time data.
          </p>
        </motion.div>
      </div>
  )
}

export default Home
