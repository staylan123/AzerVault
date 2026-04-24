import { Routes, Route } from "react-router-dom"
import Home from "@/pages/home/Home"
import CharacterSearch from "@/pages/character/CharacterSearch"
import CharacterPage from "@/pages/character/CharacterPage"

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/character" element={<CharacterSearch />} />
    <Route path="/character/:region/:realm/:name" element={<CharacterPage />} />
  </Routes>
)

export default App
