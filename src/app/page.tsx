import EventsSearch from "./_components/events-search";

/**
 * Renders the Home page component.
 * @returns The JSX element representing the Home page.
 */
export default async function Home() {
  return (
    <main className="min-h-screen bg-yellow-50/50">
      <header className="bg-yellow-500/80 py-4">
        <nav className="container">
          <h1 className="text-4xl font-semibold">
            🔍 Ticket Master Search Event
          </h1>
        </nav>
      </header>
      <section className="container mt-6">
        <EventsSearch />
      </section>
    </main>
  );
}
