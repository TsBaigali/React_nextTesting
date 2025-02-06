import { useRouter } from "next/router";

const brokers = {
  binance: { name: "Binance", rating: 4.8, description: "Best for crypto trading." },
  etoro: { name: "eToro", rating: 4.5, description: "Best for social trading." },
  forex: { name: "Forex.com", rating: 4.7, description: "Best for forex trading." },
};

export default function BrokerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const broker = brokers[id as keyof typeof brokers];

  if (!broker) return <p>Broker not found</p>;

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold">{broker.name}</h1>
      <p className="text-gray-600">{broker.description}</p>
      <p className="font-bold">⭐ {broker.rating}</p>
      <a href="/brokers" className="text-blue-500 hover:underline">← Back to Brokers</a>
    </main>
  );
}
