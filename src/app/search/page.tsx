'use client';

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase'; // Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import Fuse from 'fuse.js'; // Optional: for fuzzy search
import Link from 'next/link';
import styles from '@/app/styles/Search.module.css';

interface Broker {
  id: string;
  name: string;
  category: string;
  description: string;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [filteredBrokers, setFilteredBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch brokers once on initial load
  useEffect(() => {
    const fetchBrokers = async () => {
      setLoading(true);
      try {
        const brokersRef = collection(db, 'brokers');
        const querySnapshot = await getDocs(brokersRef);
        const allBrokers: Broker[] = [];
        
        querySnapshot.forEach((doc) => {
          allBrokers.push({ id: doc.id, ...doc.data() } as Broker);
        });

        setBrokers(allBrokers);
        setFilteredBrokers(allBrokers); // Set initial filtered brokers to all available brokers
      } catch (error) {
        console.error('Error fetching brokers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  // Handle user typing in search bar
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchQuery(query);

    // If there's no query, reset filtered brokers to all brokers
    if (query === '') {
      setFilteredBrokers(brokers);
    } else {
      // Use Fuse.js for fuzzy searching if needed
      const fuse = new Fuse(brokers, {
        keys: ['name', 'category', 'description'],
        threshold: 0.4, // Allow more flexible matches
      });

      const results = fuse.search(query).map((result) => result.item);
      setFilteredBrokers(results);
    }
  };

  return (
    <div className={styles.searchPage}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search brokers..."
        className={styles.searchInput}
      />

      {loading ? (
        <p>Уншиж байна...</p>
      ) : (
        <ul className={styles.brokerList}>
          {filteredBrokers.length === 0 ? (
            <li>Брокер олдсонгүй.</li>
          ) : (
            filteredBrokers.map((broker) => (
              <li key={broker.id} className={styles.brokerItem}>
                <Link href={`/brokers/${broker.id}`}>
                  <h3>{broker.name}</h3>
                </Link>
                <p>{broker.category}</p>
                <p>{broker.description}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
