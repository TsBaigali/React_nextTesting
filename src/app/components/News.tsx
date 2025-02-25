"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const newsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      newsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: newsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={newsRef} className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((news) => (
          <div
            key={news}
            className="bg-white p-6 shadow-lg rounded-lg transform hover:scale-105 transition-all"
          >
            <h3 className="text-xl font-semibold">News Title {news}</h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <a href="#" className="text-blue-600 mt-3 inline-block">
              Read more →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
