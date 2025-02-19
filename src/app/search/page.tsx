/*

'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Fuse from "fuse.js"; // Import Fuse.js
import styles from "@/app/styles/Search.module.css";

interface Broker {
  id: string;
  name: string;
  category: string;
  description: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase().trim() || "";
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrokers = async () => {
      if (!searchQuery) return;
      setLoading(true);

      try {
        const brokersRef = collection(db, "brokers");
        const querySnapshot = await getDocs(brokersRef);
        let allBrokers: Broker[] = [];

        querySnapshot.forEach((doc) => {
          allBrokers.push({ id: doc.id, ...doc.data() } as Broker);
        });

        // Fuzzy Search using optimized Fuse.js settings
        const fuse = new Fuse(allBrokers, {
          keys: ["name"], 
          threshold: 0.4, // Allow more flexible matches
          distance: 100, // Increase match range
          minMatchCharLength: 2, 
        });

        const fuzzyResults = fuse.search(searchQuery).map((result) => result.item);
        setBrokers(fuzzyResults);
      } catch (error) {
        console.error("Error fetching brokers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
  }, [searchQuery]);

  return (
    <div className={styles.searchPage}>
      <h1>Search Results for "{searchQuery}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : brokers.length === 0 ? (
        <p>No brokers found.</p>
      ) : (
        <ul className={styles.brokerList}>
          {brokers.map((broker) => (
            <li key={broker.id} className={styles.brokerItem}>
              <Link href={`/brokers/${broker.id}`}>
                <h3>{broker.name}</h3>
              </Link>
              <p>{broker.category}</p>
              <p>{broker.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;*/
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
        <p>Loading...</p>
      ) : (
        <ul className={styles.brokerList}>
          {filteredBrokers.length === 0 ? (
            <li>No brokers found.</li>
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
