'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '@/app/styles/BrokerList.module.css';

const CfdBrokers = () => {
  const [brokers, setBrokers] = useState<any[]>([]);

  useEffect(() => {
    const fetchBrokers = async () => {
      const q = query(collection(db, 'brokers'), where('type', '==', 'cfd'));
      const querySnapshot = await getDocs(q);
      const brokerList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBrokers(brokerList);
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
              {/* Broker Logo */}
              <img src={broker.logo} alt={broker.name} className={styles.brokerLogo} />

              {/* Broker Name & Category */}
              <h3 className={styles.brokerName}>{broker.name}</h3>
              <p className={styles.brokerCategory}>{broker.category}</p>

              {/* Trust Score with Color Coding */}
              <p className={`${styles.brokerTrustScore} ${broker.trustScore >= 80 ? styles.highTrust : broker.trustScore >= 50 ? styles.mediumTrust : styles.lowTrust}`}>
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
