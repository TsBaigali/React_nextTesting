'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '@/app/styles/BrokerList.module.css';

// ✅ Define TypeScript interface for a Broker
interface Broker {
  id: string;
  name: string;
  category: string;
  rating: number;
  logo: string;
  trustScore: number;
}

const CfdBrokers = () => {
  const [brokers, setBrokers] = useState<Broker[]>([]);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const q = query(collection(db, 'brokers'), where('type', '==', 'cfd'));
        const querySnapshot = await getDocs(q);

        // ✅ Ensure correct typing when fetching Firestore documents
        const brokerList: Broker[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Broker, 'id'>; // Exclude 'id' from doc.data()
          return { id: doc.id, ...data };
        });
        

        setBrokers(brokerList);
      } catch (error) {
        console.error('Error fetching brokers:', error);
      }
    };

    fetchBrokers();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CFD Брокерууд</h1>
      <div className={styles.brokerList}>
        {brokers.map((broker) => (
          <Link key={broker.id} href={`/brokers/${broker.id}`} className={styles.brokerItem}>
            <div className={styles.brokerCard}>
              {/* ✅ Optimized Broker Logo using next/image */}
              <Image
                src={broker.logo}
                alt={broker.name}
                width={100}
                height={100}
                className={styles.brokerLogo}
                priority
              />

              {/* Broker Name & Category */}
              <h3 className={styles.brokerName}>{broker.name}</h3>
              <p className={styles.brokerCategory}>{broker.category}</p>

              {/* Trust Score with Color Coding */}
              <p
                className={`${styles.brokerTrustScore} ${
                  broker.trustScore >= 80
                    ? styles.highTrust
                    : broker.trustScore >= 50
                    ? styles.mediumTrust
                    : styles.lowTrust
                }`}
              >
                Trust Score: {broker.trustScore}%
              </p>

              {/* Star Rating System */}
              <p className={styles.brokerRating}>
                {'★'.repeat(Math.round(broker.rating))}{'☆'.repeat(5 - Math.round(broker.rating))}
              </p>

              {/* View Details Button */}
              <div className={styles.brokerCardFooter}>View Details</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CfdBrokers;
