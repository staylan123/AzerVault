import { Routes, Route } from "react-router-dom"
import Home from "@/pages/home/Home"
import CharacterSearch from "@/pages/character/CharacterSearch"
import CharacterPage from "@/pages/character/CharacterPage"
import AffixesPage from "@/pages/affixes/AffixesPage"
import GuildSearch from "@/pages/guild/GuildSearch"
import GuildPage from "@/pages/guild/GuildPage"
import About from "@/pages/about/About"
import RaidPage from "@/pages/raid/RaidPage"
import HallOfFamePage from "@/pages/raid/HallOfFamePage"
import BossRankingsPage from "@/pages/raid/BossRankingsPage"
import RaidRankingsPage from "@/pages/raid/RaidRankingsPage"

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/character" element={<CharacterSearch />} />
    <Route path="/character/:region/:realm/:name" element={<CharacterPage />} />
    <Route path="/affixes" element={<AffixesPage />} />
    <Route path="/guild" element={<GuildSearch />} />
    <Route path="/guild/:region/:realm/:name" element={<GuildPage />} />
    <Route path="/raid" element={<RaidPage />} />
    <Route path="/raid/hall-of-fame" element={<HallOfFamePage />} />
    <Route path="/raid/hall-of-fame/:expansionId/:raid/:difficulty/:region" element={<HallOfFamePage />} />
    <Route path="/raid/boss-rankings" element={<BossRankingsPage />} />
    <Route path="/raid/boss-rankings/:expansionId/:raid/:boss/:difficulty/:region" element={<BossRankingsPage />} />
    <Route path="/raid/raid-rankings" element={<RaidRankingsPage />} />
    <Route path="/raid/raid-rankings/:expansionId/:raid/:difficulty/:region" element={<RaidRankingsPage />} />
    <Route path="/about" element={<About />} />
  </Routes>
)

export default App
