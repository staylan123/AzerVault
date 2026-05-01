import { Link } from "react-router-dom"

const NotFoundPage = () => (
  <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-12 pt-24 text-center">
    <p className="text-6xl font-bold text-primary">404</p>
    <h1 className="mt-4 text-2xl font-semibold text-text-primary">Page not found</h1>
    <p className="mt-2 text-sm text-text-muted">The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="mt-8 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
    >
      Back to home
    </Link>
  </main>
)

export default NotFoundPage
