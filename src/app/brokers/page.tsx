import BrokerCard from "../components/BrokerCard";

const brokers = [
  { id: "binance", name: "Binance", rating: 4.8, description: "Best for crypto trading." },
  { id: "etoro", name: "eToro", rating: 4.5, description: "Best for social trading." },
  { id: "forex", name: "Forex.com", rating: 4.7, description: "Best for forex trading." },
];

export default function BrokersPage() {
  return (
    <main className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">🔥 Top Brokers</h1>
      <div className="grid gap-6">
        {brokers.map((broker) => (
          <BrokerCard key={broker.id} broker={broker} />
        ))}
      </div>
    </main>
  );
}
