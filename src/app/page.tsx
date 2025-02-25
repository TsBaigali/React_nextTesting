import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import News from "./components/News"
import Link from "next/link";
import styles from "./styles/Home.module.css";
import { ReactLenis } from "lenis/react";
import SmokeEffect from "./components/SmokeEffect";

const Home: React.FC = () => {
  return (
    <ReactLenis root>
    <div className={styles.container}>
      <Header />
      <section className={styles.introduction}>
        <h1>Broker.mn Тавтай Морилно Уу</h1>
        <p>Энд та бүх брокерийн мэдээллийг олох боломжтой.</p>
      </section>

      <section className={styles.categories}>
        <h2>Ангилал</h2>
        <div className={styles.cardContainer}>
          <Link href="/brokers/inside" className={styles.card}>
            <h3>Дотоод Брокерууд</h3>
            <div className={styles.cardOverlay}>Дотоод Брокеруудыг Судлах</div>
          </Link>

          <Link href="/brokers/outside" className={styles.card}>
            <h3>Гадаад Брокерууд</h3>
          </Link>

          <Link href="/brokers/cfd" className={styles.card}>
            <h3>CFD Брокерууд</h3>
            <div className={styles.cardOverlay}>CFD Брокеруудыг Судлах</div>
          </Link>
        </div>
      </section>
      <News />
      <div className="relative min-h-screen bg-black">
      <h1 className="text-white text-center text-4xl pt-20">Mouse Smoke Effect</h1>
      <div>
      <SmokeEffect />
      <h1 style={{ position: "absolute", top: "20px", left: "50px", color: "white" }}>
        WebGL Smoke Simulation
      </h1>
    </div>
    </div>
      <Footer />
    </div>
    </ReactLenis>
  );
};

export default Home;

