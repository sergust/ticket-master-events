import EventsSearch from "./_components/events-search";

export default async function Home() {
  return (
    <main className="min-h-screen bg-yellow-50/50">
      <header className="container bg-yellow-500/80 py-4">
        <h1 className="text-4xl font-semibold">
          🔍 Ticket Master Search Event
        </h1>
      </header>
      <section className="container mt-6">
        <EventsSearch />
      </section>
    </main>
  );
}
