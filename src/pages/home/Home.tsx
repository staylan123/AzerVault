import { motion } from "framer-motion"
import { SiLionair } from "react-icons/si"
import bg from "@/assets/HomePageBackground.jpg"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const Home = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    <div className="relative flex flex-1 items-center justify-center">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#0B0D12]/80" />

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

    <Footer />
  </div>
)

export default Home
