/*
// src/app/components/Header.tsx
'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/app/lib/firebase"; // Import Firebase auth instance
import { signOut } from "firebase/auth";
import styles from "@/app/styles/Header.module.css"; // Import the CSS module

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);

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
    console.log("Search query submitted:", searchQuery);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <h1 className={styles.logo}>Mongolian Brokers</h1>
        </Link>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search brokers..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className={styles.searchIcon}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="20" y2="20" />
              </svg>
            </button>
          </div>
        </form>
        <div className={styles.authContainer}>
          {user ? (
            <>
              <p className={styles.userName}>Welcome, {user.displayName}!</p>
              <button onClick={handleLogout} className={styles.authButton}>
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button className={styles.authButton}>Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;*/
'use client';

// src/app/components/Header.tsx
import { useRouter } from "next/navigation"; // Correct hook for Next.js App Router
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import styles from "@/app/styles/Header.module.css";

const Header: React.FC = () => {
  const router = useRouter(); // Always call hooks at the top level
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
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
          <h1 className={styles.logo}>Mongolian Brokers</h1>
        </Link>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search brokers..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>🔍</button>
          </div>
        </form>
        <div className={styles.authContainer}>
          {user ? (
            <>
              <p className={styles.userName}>Welcome, {user.displayName}!</p>
              <button onClick={handleLogout} className={styles.authButton}>
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button className={styles.authButton}>Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
