'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export default function Mainbody() {
  const dumplingRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      dumplingRef.current,
      { rotate: 0 },
      { rotate: 180, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="py-10 grid grid-cols-5 gap-4 h-screen relative overflow-hidden">
      {/* Left-side text and Explore Now button */}
      <div className="col-span-2 flex flex-col justify-center pl-6 z-10">
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Take a taste<br />
          Come join us.
        </h2>
        <p className="text-lg text-gray-700 mb-2 font-medium">
          Life is so endlessly delicious.
        </p>
        <p className="text-xs text-gray-400 mb-7 max-w-xs">
          Dumpling is a broad classification for a dish that consists of pieces of dough made from a variety of starch sources wrapped around a filling, or of dough with no filling.
        </p>
        <button className="bg-[#ff7a27] hover:bg-[#ff974f] transition text-white font-semibold px-7 py-3 rounded-xl shadow w-max">
          Explore Now
        </button>
      </div>

      {/* Main Image (Dumpling dish + chopsticks) */}
      <div className="col-span-3 flex justify-center items-center relative">
        {/* Dumpling plate */}
        <img
          ref={dumplingRef}
          src="/dumplings-plate.png"
          alt="Dumplings on Plate"
          className="w-[270px] md:w-[350px] z-20"
        />
        {/* Chopsticks overlay */}
        <img
          src="/chopsticks.png"
          alt="Chopsticks"
          className="absolute left-1/4 top-1/4 w-[190px] md:w-[220px] z-30"
        />
      </div>

      {/* Top-Left Spices */}
      <img src="/spoon-spices.png" alt="Spices" className="absolute left-0 top-0 w-40 sm:w-48 z-10" />
      {/* Top-Right Tomatoes */}
      <img src="/tomato-vine.png" alt="Tomatoes" className="absolute right-6 top-6 w-24 sm:w-28 z-10" />
      {/* Bottom-Left Sauce Bowl */}
      <img src="/sauce-bowl.png" alt="Sauce Bowl" className="absolute left-20 bottom-12 w-28 sm:w-32 z-10" />

      {/* Navigation Bar Over Content */}
      <div className="absolute top-6 left-10 flex items-center gap-8 z-20">
        <span className="text-lg font-bold">luscious</span>
      </div>
      <div className="absolute top-6 right-12 flex items-center gap-8 z-20">
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Dumplings</a>
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Recipes</a>
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Food Menu</a>
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Order Now</a>
        <button className="ml-3 px-6 py-2 border-2 border-[#ff7a27] text-[#ff7a27] rounded-full font-semibold hover:bg-[#ff7a27] hover:text-white transition">Login</button>
      </div>
    </div>
  );
}
