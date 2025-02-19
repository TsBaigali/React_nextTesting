// components/Auth.tsx
/*
"use client";

import { auth, googleProvider } from "@/app/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

const Auth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", auth.currentUser);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Auth;*/
"use client";

import { auth, googleProvider } from "@/app/lib/firebase";
import { signInWithPopup, signOut, User } from "firebase/auth"; // Import the User type from firebase/auth
import { useState, useEffect } from "react";

const Auth = () => {
  const [user, setUser] = useState<User | null>(null); // Specify User type from Firebase

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", auth.currentUser);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Auth;

