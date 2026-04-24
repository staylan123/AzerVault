const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#0B0D12]/80 px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-text-muted sm:flex-row">
        <span>© {year} AzerVault</span>
        <a
          href="https://raider.io/api"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-text-secondary"
        >
          Powered by raider.io
        </a>
      </div>
    </footer>
  )
}

export default Footer
