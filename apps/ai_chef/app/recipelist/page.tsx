'use client'
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const coffeeList = [
  {
    name: "Black Coffee",
    description: "Delicious coffee should be simply coffee with nothing added, unless you add it yourself.",
    img: "/pulao-removebg-preview.png",
    color: "#6A5031"
  },
  {
    name: "Latte",
    description: "A creamy blend of espresso and steamed milk, topped with a light layer of foam.",
    img: "/pulao-removebg-preview.png",
    color: "#E3Cfa2"
  },
  {
    name: "Cappuccino",
    description: "Espresso with steamed milk and thick foam; a popular Italian favorite.",
    img: "/pulao-removebg-preview.png",
    color: "#A7825e"
  },
  {
    name: "Mocha",
    description: "Chocolate, milk, espresso — a bittersweet delight for any time of day.",
    img: "/pulao-removebg-preview.png",
    color: "#6e605b"
  },
  {
    name: "Flat White",
    description: "Rich espresso mixed with steamed milk for a smooth, velvety taste.",
    img: "/pulao-removebg-preview.png",
    color: "#eee7dd"
  },
];

export default function Recipelist() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cupRef = useRef(null);
  const descRef = useRef(null);
  const leftOnionRef1 = useRef(null);
  const leftOnionRef2 = useRef(null);
  const rightOnionRef = useRef(null);

  useEffect(() => {
    // Animate big pulao image from top
    if (cupRef.current) {
      gsap.fromTo(
        cupRef.current,
        { y: -150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Animate left onions from left
    if (leftOnionRef1.current) {
      gsap.fromTo(
        leftOnionRef1.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    }
    if (leftOnionRef2.current) {
      gsap.fromTo(
        leftOnionRef2.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
      );
    }

    // Animate right onion from right
    if (rightOnionRef.current) {
      gsap.fromTo(
        rightOnionRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.7, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  function handleSelect(idx) {
    if (idx === activeIdx) return;
    setActiveIdx(idx);

    // Different animation directions for cup image on change
    if (cupRef.current) {
      let fromVars;
      switch (idx % 3) {
        case 0:
          fromVars = { opacity: 0, x: -80, scale: 0.8 };
          break;
        case 1:
          fromVars = { opacity: 0, y: 60, scale: 0.8 };
          break;
        case 2:
          fromVars = { opacity: 0, x: 80, scale: 0.8 };
          break;
      }
      gsap.fromTo(
        cupRef.current,
        fromVars,
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    // Text animation
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
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
            draggable={false}
          />
          {/* Onions with animation refs */}
          <img
            ref={leftOnionRef1}
            src="./different-aromatic-spices-falling-on-260nw-2422414553__1_-removebg-preview.png"
            alt="onion left 1"
            className="absolute left-16 bottom-24 w-14 opacity-80"
          />
          <img
            ref={leftOnionRef2}
            src="./different-aromatic-spices-falling-on-260nw-2422414553__1_-removebg-preview.png"
            alt="onion left 2"
            className="absolute top-10 left-28 w-8 opacity-80"
          />
          <img
            ref={rightOnionRef}
            src="./different-aromatic-spices-falling-on-260nw-2422414553__1_-removebg-preview.png"
            alt="onion right"
            className="absolute right-16 top-32 w-7 opacity-80"
          />
        </div>

        {/* Center Coffee Selector Dots */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
          {coffeeList.map((coffee, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer"
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
          <div ref={descRef}>
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
            <button className="bg-[#c89a6b] hover:bg-[#b37e47] transition text-white font-semibold px-7 py-3 rounded-lg shadow w-max cursor-pointer">
              VIEW FULL RECIPE
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
