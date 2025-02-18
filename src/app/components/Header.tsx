'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the search logic here, such as navigating to a search results page
    console.log("Search query submitted:", searchQuery);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link href="/">
          <h1 style={styles.logo}>Mongolian Brokers</h1>
        </Link>
        <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search brokers..."
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            🔍
          </button>
        </form>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#fff',
    width: '100%',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
    boxSizing: 'border-box' as const, // Use 'as const' instead of type assertion
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px',
    marginRight: '10px',
  },
  searchButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Header;
