// /app/brokers/cfd.tsx
import React from 'react';
import Link from 'next/link';

const CfdBrokers = () => {
  const cfdBrokers = [
    { id: 5, name: "Broker 5" },
    { id: 6, name: "Broker 6" },
  ];

  return (
    <div>
      <h1>CFD Brokers</h1>
      <ul>
        {cfdBrokers.map((broker) => (
          <li key={broker.id}>
            <Link href={`/brokers/${broker.id}`}>
              {broker.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CfdBrokers;
