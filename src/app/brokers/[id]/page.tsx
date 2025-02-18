"use client";

import { useParams } from "next/navigation";
import styles from "@/app//styles/BrokerDetail.module.css"; // Import the CSS module

const BrokerDetail = () => {
  const { id } = useParams();

  const brokers = [
    { id: "1", name: "Broker 1", type: "Inside", rating: 4.5, platforms: "MetaTrader 4, MetaTrader 5" },
    { id: "2", name: "Broker 2", type: "Outside", rating: 4.2, platforms: "NinjaTrader" },
    { id: "3", name: "Broker 3", type: "Inside", rating: 4.7, platforms: "MetaTrader 5" },
    { id: "4", name: "Broker 4", type: "Outside", rating: 4.1, platforms: "eToro" },
    { id: "5", name: "Broker 5", type: "CFD", rating: 4.8, platforms: "MetaTrader 4" },
    { id: "6", name: "Broker 6", type: "CFD", rating: 4.3, platforms: "cTrader" },
  ];

  const broker = brokers.find((broker) => broker.id === id);

  if (!broker) return <p style={{ textAlign: "center", color: "#000" }}>Broker not found!</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{broker.name}</h1>
      <div className={styles.card}>
        <p><strong>Type:</strong> {broker.type}</p>
        <p><strong>Rating:</strong> ⭐ {broker.rating}</p>
        <p><strong>Platforms:</strong> {broker.platforms}</p>
      </div>
    </div>
  );
};

export default BrokerDetail;
