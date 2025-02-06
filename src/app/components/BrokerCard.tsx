import Link from "next/link";

// Define a type for broker
type Broker = {
    id: string;
    name: string;
    rating: number;
    description: string;
  };
  
  export default function BrokerCard({ broker }: { broker: Broker }) {
  
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
