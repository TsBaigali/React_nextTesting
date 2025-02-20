/*"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, auth } from "@/app/lib/firebase";
import { doc, getDoc, collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth"; // Import Firebase Auth method
import styles from "@/app/styles/BrokerDetail.module.css";

// Define types
interface Broker {
  name: string;
  type: string;
  rating: number;
  platforms: string[]; // Assuming platforms is an array of strings
}

interface Rating {
  username: string;
  rating: number;
  comment: string;
}

const BrokerDetail = () => {
  const { id } = useParams();
  const [broker, setBroker] = useState<Broker | null>(null); // Updated type for broker
  const [ratings, setRatings] = useState<Rating[]>([]); // Updated type for ratings
  const [rating, setRating] = useState<number>(0); // Updated type for rating
  const [comment, setComment] = useState<string>(""); // Updated type for comment
  const [user, setUser] = useState<User | null>(null); // Updated type for user
  const [username, setUsername] = useState<string>(""); // Track the username

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
        setUsername(currentUser.displayName || currentUser.email || "Anonymous"); // Use Firebase display name, email, or fallback to 'Anonymous'
      } else {
        setUser(null); // No user, set to null
        setUsername(""); // Reset username when logged out
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    const fetchBroker = async () => {
      if (!id) return;
      const docRef = doc(db, "brokers", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBroker(docSnap.data() as Broker); // Cast to Broker type
      } else {
        setBroker(null);
      }
    };

    const fetchRatings = async () => {
      if (!id) return;
      const ratingsRef = collection(db, "brokers", id as string, "ratings");
      const q = query(ratingsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const ratingsData = querySnapshot.docs.map((doc) => doc.data() as Rating); // Cast to Rating type
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
        username, // Store the username (email if displayName is null)
        rating,
        comment,
        timestamp: new Date(),
      });

      setRating(0);
      setComment("");
      // Re-fetch ratings after submission
      const q = query(ratingsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const newRatingsData = querySnapshot.docs.map((doc) => doc.data() as Rating); // Cast to Rating type
      setRatings(newRatingsData);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (!broker) return <p style={{ textAlign: "center", color: "#000" }}>Брокер олдсонгүй</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{broker.name}</h1>
      <div className={styles.card}>
        <p><strong>Төрөл:</strong> {broker.type}</p>
        <p><strong>Үнэлгээ:</strong> ⭐ {broker.rating}</p>
        <p><strong>Платформууд:</strong> {broker.platforms}</p> 
      </div>
      <div className={styles.ratingForm}>
        {user ? (
          <form onSubmit={handleSubmit}>
            <h2>Үнэлэх</h2>
            <div>
              <label>
                Үнэлгээ:
                <input
                  type="number"
                  value={rating}
                  min="1"
                  max="5"
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Сэтгэгдэл:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Нийтлэх</button>
          </form>
        ) : (
          <p>Энэ брокерт үнэлгээ өгөхийн тулд нэвтэрч ороод сэтгэгдэл бичнэ үү.</p>
        )}
      </div>

      <div className={styles.ratingsList}>
        <h2>Үнэлгээ & Сэтгэгдэл</h2>
        {ratings.length === 0 ? (
          <p>Одоогоор үнэлгээ алга.</p>
        ) : (
          <ul>
            {ratings.map((ratingData, index) => (
              <li key={index}>
                <p><strong>{ratingData.username}</strong> : ⭐ {ratingData.rating}</p>
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
*/
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
        <div className={styles.tab} onClick={() => setActiveTab("basic")}>Basic Info</div>
        <div className={styles.tab} onClick={() => setActiveTab("contact")}>Contact Info</div>
        <div className={styles.tab} onClick={() => setActiveTab("software")}>Related Software</div>
      </div>

      {/* Broker Detail Sections */}
      {activeTab === "basic" && (
        <div className={styles.infoSection}>
          <h2>Basic Information</h2>
          <ul>
            <li><strong>Country:</strong> {broker.country}</li>
            <li><strong>Regulation:</strong> {broker.regulation}</li>
            <li><strong>Registered Region:</strong> {broker.registeredRegion}</li>
            <li><strong>Operating Period:</strong> {broker.operatingPeriod}</li>
            <li><strong>Company Name:</strong> {broker.companyName}</li>
            <li><strong>Contact:</strong> {broker.contact}</li>
            <li><strong>Website:</strong> {broker.website ? <Link href={broker.website}>{broker.website}</Link> : "N/A"}</li>
            <li><strong>Facebook:</strong> {broker.facebook ? <Link href={broker.facebook}>Facebook Page</Link> : "N/A"}</li>
          </ul>
        </div>
      )}

      {activeTab === "contact" && (
        <div className={styles.infoSection}>
          <h2>Contact Information</h2>
          <ul>
            <li><strong>Phone:</strong> {broker.contact}</li>
            <li><strong>Website:</strong> {broker.website ? <Link href={broker.website}>{broker.website}</Link> : "N/A"}</li>
            <li><strong>Facebook:</strong> {broker.facebook ? <Link href={broker.facebook}>Facebook</Link> : "N/A"}</li>
          </ul>
        </div>
      )}

      {activeTab === "software" && (
        <div className={styles.infoSection}>
          <h2>Related Software</h2>
          <ul>
            {broker.relatedSoftware.map((software, index) => (
              <li key={index}>{software}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Rating & Reviews Section */}
      <div className={styles.reviewsContainer}>
        <h2>Rate & Review</h2>
        {user ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Rating:</label>
              <input type="number" value={rating} min="1" max="5" onChange={(e) => setRating(Number(e.target.value))} required />
            </div>
            <div className={styles.formGroup}>
              <label>Comment:</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <p>Please log in to leave a review.</p>
        )}
      </div>

      {/* Display Ratings */}
      <div className={styles.reviewsList}>
        <h2>Reviews</h2>
        {ratings.length === 0 ? (
          <p>No reviews yet.</p>
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

