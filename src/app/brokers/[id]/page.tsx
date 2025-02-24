"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, auth } from "@/app/lib/firebase";
import { doc, getDoc, collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import styles from "@/app/styles/BrokerDetail.module.css";
import Image from "next/image";
import Link from "next/link";

// Define types
interface Broker {
  name: string;
  country: string;
  rating: number;
  logo: string;
  regulation: string;
  registeredRegion: string;
  operatingPeriod: string;
  companyName: string;
  contact: string;
  website?: string;
  facebook?: string;
  relatedSoftware: string[];
}

interface Rating {
  username: string;
  rating: number;
  comment: string;
}

const BrokerDetail = () => {
  const { id } = useParams();
  const [broker, setBroker] = useState<Broker | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("basic"); // Add this line to define activeTab state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUsername(currentUser.displayName || currentUser.email || "Anonymous");
      } else {
        setUser(null);
        setUsername("");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBroker = async () => {
      if (!id) return;
      const docRef = doc(db, "brokers", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBroker(docSnap.data() as Broker);
      } else {
        setBroker(null);
      }
    };

    const fetchRatings = async () => {
      if (!id) return;
      const ratingsRef = collection(db, "brokers", id as string, "ratings");
      const q = query(ratingsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const ratingsData = querySnapshot.docs.map((doc) => doc.data() as Rating);
      setRatings(ratingsData);
    };

    fetchBroker();
    fetchRatings();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit a rating.");
      return;
    }
    try {
      const ratingsRef = collection(db, "brokers", id as string, "ratings");
      await addDoc(ratingsRef, {
        userId: user.uid,
        username,
        rating,
        comment,
        timestamp: new Date(),
      });

      setRating(0);
      setComment("");
      const q = query(ratingsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      setRatings(querySnapshot.docs.map((doc) => doc.data() as Rating));
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (!broker) return <p className={styles.noData}>Broker not found</p>;

  return (
    <div className={styles.container}>
      {/* Broker Header Section */}
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={broker.logo} alt={broker.name} width={120} height={120} />
        </div>
        <div className={styles.headerInfo}>
          <h1>{broker.name}</h1>
          <div className={styles.headerRating}>
            <span>{broker.rating} ⭐</span>
            <span>{broker.country}</span>
          </div>
        </div>
      </div>

      {/* Broker Info Section (Tabs-style) */}
      <div className={styles.tabs}>
        <div className={styles.tab} onClick={() => setActiveTab("basic")}>Ерөнхий мэдээлэл</div>
        <div className={styles.tab} onClick={() => setActiveTab("contact")}>Холбоо барих</div>
        <div className={styles.tab} onClick={() => setActiveTab("software")}>Холбоотой программ хангамж</div>
      </div>

      {/* Broker Detail Sections */}
      {activeTab === "basic" && (
        <div className={styles.infoSection}>
          <h2>Ерөнхий мэдээлэл</h2>
          <ul>
            <li><strong>Улс:</strong> {broker.country}</li>
            <li><strong>Regulation:</strong> {broker.regulation}</li>
            <li><strong>Бүртгэгдсэн бүс нутаг:</strong> {broker.registeredRegion}</li>
            <li><strong>Үйл ажиллагааны хугацаа:</strong> {broker.operatingPeriod}</li>
            <li><strong>Компаний нэр:</strong> {broker.name}</li>
            <li><strong>Холбоо барих:</strong> {broker.contact}</li>
            <li><strong>Website:</strong> {broker.website ? <Link href={broker.website}>{broker.website}</Link> : "N/A"}</li>
            <li><strong>Facebook:</strong> {broker.facebook ? <Link href={broker.facebook}>ҮФэйсбүүкээрж</Link> : "N/A"}</li>
          </ul>
        </div>
      )}

      {activeTab === "contact" && (
        <div className={styles.infoSection}>
          <h2>Холбогдох мэдээлэл</h2>
          <ul>
            <li><strong>Улс:</strong> {broker.contact}</li>
            <li><strong>Website:</strong> {broker.website ? <Link href={broker.website}>{broker.website}</Link> : "N/A"}</li>
            <li><strong>Facebook:</strong> {broker.facebook ? <Link href={broker.facebook}>Facebook</Link> : "N/A"}</li>
          </ul>
        </div>
      )}

      {activeTab === "software" && (
        <div className={styles.infoSection}>
          <h2>Холбоотой программ хангамж</h2>
          <ul>
          {(broker.relatedSoftware || []).map((software, index) => (
            <li key={index}>{software}</li>
          ))}

          </ul>
        </div>
      )}

      {/* Rating & Reviews Section */}
      <div className={styles.reviewsContainer}>
        <h2>Үнэлгээ & Сэтгэгдэл</h2>
        {user ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Үнэлгээ:</label>
              <input type="number" value={rating} min="1" max="5" onChange={(e) => setRating(Number(e.target.value))} required />
            </div>
            <div className={styles.formGroup}>
              <label>Сэтгэгдэл:</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
            </div>
            <button type="submit">Нийтлэх</button>
          </form>
        ) : (
          <p>Шүүмж үлдээхийн тулд нэвтэрнэ үү.</p>
        )}
      </div>

      {/* Display Ratings */}
      <div className={styles.reviewsList}>
        <h2>Үнэлгээ</h2>
        {ratings.length === 0 ? (
          <p>Одоогоор шүүмж алга</p>
        ) : (
          <ul>
            {ratings.map((ratingData, index) => (
              <li key={index} className={styles.reviewItem}>
                <p><strong>{ratingData.username}</strong>: ⭐ {ratingData.rating}</p>
                <p>{ratingData.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BrokerDetail;

