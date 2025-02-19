
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, auth } from "@/app/lib/firebase";
import { doc, getDoc, collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth method
import styles from "@/app/styles/BrokerDetail.module.css";

const BrokerDetail = () => {
  const { id } = useParams();
  const [broker, setBroker] = useState<any>(null);
  const [ratings, setRatings] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<any>(null); // Track the current user
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
        setBroker(docSnap.data());
      } else {
        setBroker(null);
      }
    };

    const fetchRatings = async () => {
      if (!id) return;
      const ratingsRef = collection(db, "brokers", id as string, "ratings");
      const q = query(ratingsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const ratingsData = querySnapshot.docs.map((doc) => doc.data());
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
      const newRatingsData = querySnapshot.docs.map((doc) => doc.data());
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





 