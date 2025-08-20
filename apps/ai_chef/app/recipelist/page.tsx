'use client'
import { useState, useRef } from "react";
import gsap from "gsap";

const coffeeList = [
  {
    name: "Black Coffee",
    description: "Delicious coffee should be simply coffee with nothing added, unless you add it yourself.",
    img: "/black-coffee.png",
    color: "#6A5031"
  },
  {
    name: "Latte",
    description: "A creamy blend of espresso and steamed milk, topped with a light layer of foam.",
    img: "/latte.png",
    color: "#E3Cfa2"
  },
  {
    name: "Cappuccino",
    description: "Espresso with steamed milk and thick foam; a popular Italian favorite.",
    img: "/cappuccino.png",
    color: "#A7825e"
  },
  {
    name: "Mocha",
    description: "Chocolate, milk, espresso — a bittersweet delight for any time of day.",
    img: "/mocha.png",
    color: "#6e605b"
  },
  {
    name: "Flat White",
    description: "Rich espresso mixed with steamed milk for a smooth, velvety taste.",
    img: "/flatwhite.png",
    color: "#eee7dd"
  },
];

export default function Recipelist() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cupRef = useRef(null);
  const descRef = useRef(null);

  function handleSelect(idx) {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    // Animation for cup image
    if (cupRef.current) {
      gsap.fromTo(
        cupRef.current,
        { opacity: 0, y: 60, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
    // Animation for description content
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#ede9e3] font-serif">
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-xl flex overflow-hidden relative">
        {/* Left Visual Column */}
        <div
          className="flex-1 flex flex-col justify-center items-center bg-[#f7f5f0] p-12 relative"
          style={{ minHeight: 500 }}
        >
          <img
            ref={cupRef}
            src={coffeeList[activeIdx].img}
            alt={coffeeList[activeIdx].name}
            className="w-72 h-72 rounded-full shadow-2xl transition-all duration-700 bg-[#d0cbc5] object-contain"
            key={activeIdx}
            draggable={false}
          />
          {/* scattered beans/forks can be added as absolute images for more decoration */}
          <img src="/spoon.png" alt="spoon" className="absolute left-16 bottom-24 w-14 opacity-80" />
          <img src="/bean.png" alt="bean" className="absolute top-10 left-28 w-8 opacity-80" />
          <img src="/bean.png" alt="bean" className="absolute right-16 top-32 w-7 opacity-80" />
        </div>

        {/* Center Coffee Selector Dots */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
          {coffeeList.map((coffee, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-5 h-5 rounded-full border-2 border-gray-300"
              style={{
                background: coffee.color,
                outline: activeIdx === idx ? "2px solid #d47a37" : undefined,
                boxShadow: activeIdx === idx ? "0 0 8px #d47a37" : undefined,
                transition: "all .2s",
              }}
              aria-label={coffee.name}
            />
          ))}
        </div>

        {/* Right Description Column */}
        <div className="flex-1 flex items-center justify-center bg-[#ede9e3] p-14 relative">
          <div ref={descRef} key={activeIdx}>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-gray-500 tracking-widest">
                {String(activeIdx + 1).padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-400">/</span>
              <span className="text-xs text-gray-400">{String(coffeeList.length).padStart(2, '0')}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-[#251c17]">{coffeeList[activeIdx].name}</h1>
            <p className="text-gray-600 mb-7 max-w-md leading-relaxed">
              {coffeeList[activeIdx].description}
            </p>
            <button className="bg-[#c89a6b] hover:bg-[#b37e47] transition text-white font-semibold px-7 py-3 rounded-lg shadow w-max">
              ORDER NOW
            </button>
          </div>

          {/* Social icons */}
          <div className="absolute top-7 right-10 flex gap-4">
            <a href="#" className="text-gray-400 hover:text-black"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="text-gray-400 hover:text-black"><i className="fab fa-instagram" /></a>
            <a href="#" className="text-gray-400 hover:text-black"><i className="fab fa-youtube" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
