// /app/brokers/inside.tsx
import React from 'react';
import Link from 'next/link';

const  InsideBrokers = () => {
  const insideBrokers = [
    { id: 1, name: "Broker 1" },
    { id: 2, name: "Broker 2" },
  ];

  return (
    <div>
      <h1>Outside Brokers</h1>
      <ul>
        {insideBrokers.map((broker) => (
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

export default InsideBrokers;
