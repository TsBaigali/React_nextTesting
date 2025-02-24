
'use client';

import { useRouter } from "next/navigation"; // Correct hook for Next.js App Router
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/app/lib/firebase";
import { signOut, User } from "firebase/auth"; // Import User type
import styles from "@/app/styles/Header.module.css";

const Header: React.FC = () => {
  const router = useRouter(); // Always call hooks at the top level
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null); // Use User type instead of any
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isMounted) return null; // Prevent hydration errors

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <h1 className={styles.logo}>BrokerMN</h1>
        </Link>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Брокер хайх..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>🔍</button>
          </div>
        </form>
        <div className={styles.authContainer}>
          {user ? (
            <>
              <p className={styles.userName}>Тавтай морил, {user.displayName}!</p>
              <button onClick={handleLogout} className={styles.authButton}>
                Гарах
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button className={styles.authButton}>Нэвтрэх</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

