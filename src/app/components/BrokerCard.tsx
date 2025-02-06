import Link from "next/link";

export default function BrokerCard({ broker }: { broker: any }) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{broker.name}</h2>
      <p className="text-gray-600">{broker.description}</p>
      <p className="font-bold">⭐ {broker.rating}</p>
      <Link href={`/brokers/${broker.id}`} className="text-blue-500 hover:underline">
        View Details →
      </Link>
    </div>
  );
}
