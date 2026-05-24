import Link from 'next/link'

const SECTIONS = [
  { title: 'Getting Started', href: '/docs/getting-started', description: 'Install and configure MaxDraft in minutes.' },
  { title: 'Installation', href: '/docs/installation', description: 'Step-by-step setup for Next.js, Vite, and CRA.' },
  { title: 'Usage', href: '/docs/usage', description: 'Basic and advanced editor usage examples.' },
  { title: 'Themes', href: '/docs/themes', description: 'CSS variable-based theming system.' },
  { title: 'Extensions', href: '/docs/extensions', description: 'Slash commands, image upload, callouts, and more.' },
  { title: 'API Reference', href: '/docs/api', description: 'Full props, hooks, and commands reference.' },
]

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
          Max<span className="text-blue-600">Draft</span>
        </h1>
        <p className="mt-4 text-xl text-zinc-500">
          A modern publishing editor with the familiarity of classic WordPress editing
          and the flexibility of the modern React ecosystem.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/docs/getting-started"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            Get Started →
          </Link>
          <a
            href="https://github.com/maxdraft/editor"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Install snippet */}
      <div className="mb-16 rounded-xl bg-zinc-900 px-6 py-4 text-center">
        <code className="text-sm text-zinc-300">
          <span className="text-zinc-500">$</span> pnpm add @maxdraft/react
        </code>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-xl border border-zinc-200 p-6 hover:border-blue-500 hover:shadow-sm transition-all"
          >
            <h2 className="text-base font-semibold text-zinc-900 group-hover:text-blue-600">
              {s.title}
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500">{s.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
