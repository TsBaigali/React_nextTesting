import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import styles from './styles/Home.module.css';

const Home: React.FC = () => {
  return (
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
            <p>Монголын дотоод брокеруудыг судалж үзнэ үү.</p>
            <div className={styles.cardOverlay}>Дотоод Брокеруудыг Судлах</div>
          </Link>
          <Link href="/brokers/outside" className={styles.card}>
            <h3>Гадаад Брокерууд</h3>
            <p>Монголын гаднаас брокеруудыг судалж үзнэ үү.</p>
            <div className={styles.cardOverlay}>Гадаад Брокеруудыг Судлах</div>
          </Link>
          <Link href="/brokers/cfd" className={styles.card}>
            <h3>CFD Брокерууд</h3>
            <p>CFD арилжааны сонголт санал болгож буй брокеруудыг олж мэднэ үү.</p>
            <div className={styles.cardOverlay}>CFD Брокеруудыг Судлах</div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
