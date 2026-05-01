import { Outlet } from "react-router-dom"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const Layout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
)

export default Layout
