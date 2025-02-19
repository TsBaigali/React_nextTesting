// /app/brokers/outside.tsx
'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "@/app/styles/BrokerList.module.css";

const OutsideBrokers = () => {
  const [brokers, setBrokers] = useState<any[]>([]);

  useEffect(() => {
    const fetchBrokers = async () => {
      const q = query(collection(db, "brokers"), where("type", "==", "out"));
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
      <h1 className={styles.title}>Гадаад Брокерууд</h1>
      <div className={styles.brokerList}>
        {brokers.map((broker) => (
          <Link key={broker.id} href={`/brokers/${broker.id}`} className={styles.brokerItem}>
            <div className={styles.brokerCard}>
              <h3 className={styles.brokerName}>{broker.name}</h3>
              <p className={styles.brokerDescription}>Танилцуулга</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OutsideBrokers;
