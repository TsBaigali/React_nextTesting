"use client"
import React, { useEffect } from "react";
import Header from "./components/Header";
import Link from "next/link";
import styles from "./styles/Home.module.css";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {

  useEffect(() => {
    const ScrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];
      gsap.utils.toArray(".row").forEach((row, index) => {
        const rowElement = row as HTMLElement; // Explicit type assertion
        const cardLeft = rowElement.querySelector(".card-left") as HTMLElement | null;
        const cardRight = rowElement.querySelector(".card-right") as HTMLElement | null;
      
        if (!cardLeft || !cardRight) return; // Ensure elements exist before applying GSAP animations
      
        gsap.to(cardLeft, {
          x: leftXValues[index],
          scrollTrigger: {
            trigger: ".main",
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
      
              cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
            },
          },
        });
      });
        
 
      gsap.to(".line p", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".line",
          start: "top 75%",
          end: "top 25%",
          scrub: true,
          toggleActions: "play none none reverse", // Ensures it hides when scrolling back up
        },
      });
      
    gsap.to(".logo", {
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: ScrollTriggerSettings,
    });
    gsap.to("button", {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: ScrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }

  }, []);
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <img src={`/img-${2 * i - 1}.jpg`} alt="" />
          </div>
          <div className="card card-right">
          <img src={`/img-${2 * i}.jpg`} alt="" />
          </div>
        </div>
      );
    }
    return rows;
  };
  return (
    <ReactLenis root>
    <div className={styles.container}>
      <Header />
      <section className={styles.introduction}>
        <p>Энд та бүх брокерийн мэдээллийг олох боломжтой.</p>
      </section>

      <section className={styles.categories}>
        <div className={styles.cardContainer}>
          <Link href="/brokers/inside" className={styles.card}>
            <h3>Дотоод Брокерууд</h3>
          </Link>

          <Link href="/brokers/outside" className={styles.card}>
            <h3>Гадаад Брокерууд</h3>
          </Link>

          <Link href="/brokers/cfd" className={styles.card}>
            <h3>CFD Брокерууд</h3>
          </Link>
        </div>
      </section>
      <section className="main">
        <div className="main-content">
          <div className="logo"><img src="/logo.jpg" alt=""/></div>
          <div className="copy">
            <div className="line">
              <p>Найдвартай брокероо бидэнтэй хамт ол!</p>
            </div>
            <div className="line">
              <p>Бодит мэдээлэл, найдвартай эх сурвалж.</p>
            </div>
            <div className="line">
              <p>Монголын бүх брокер нэг дор.</p>
            </div>
          </div>
          <div className="btn">
            <button>Get Broker</button>
          </div>
        </div>
        {generateRows()}
      </section>

      <section className="footer">
      <a href="https://www.vantagemarkets.com/mn/" target="_blank" rel="noopener noreferrer">
        Vantage
            </a>
      </section>
      </div>
    </ReactLenis>
  );
};

export default Home;

