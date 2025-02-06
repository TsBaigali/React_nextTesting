export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">🚀 Welcome to Broker Finder</h1>
      <p className="text-lg text-gray-500 mt-2">Find the best brokers for trading!</p>
      <a href="/brokers" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        View Brokers
      </a>
    </main>
  );
}