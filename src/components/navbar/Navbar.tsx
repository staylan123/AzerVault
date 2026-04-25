import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { SiLionair } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/70 px-6 py-3 backdrop-blur-md">
      <div className="flex items-center gap-8">
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
        <Link
          to="/guild"
          className="text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          Guild Lookup
        </Link>
        <Link
          to="/affixes"
          className="text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          Affixes
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </nav>
  );
};

export default Navbar;
