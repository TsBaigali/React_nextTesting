// /app/brokers/outside.tsx
import React from 'react';
import Link from 'next/link';

const OutsideBrokers = () => {
  const outsideBrokers = [
    { id: 3, name: "Broker 3" },
    { id: 4, name: "Broker 4" },
  ];

  return (
    <div>
      <h1>Outside Brokers</h1>
      <ul>
        {outsideBrokers.map((broker) => (
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

export default OutsideBrokers;
