'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
export default function Mainbody() {
  const dumplingRef = useRef(null);
  const Router=useRouter();
  useGSAP(() => {
    gsap.fromTo(
      dumplingRef.current,
      { rotate: 0 },
      { rotate: 180, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="relative h-screen w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <div className="absolute top-6 left-10 flex items-center gap-8 z-20">
        <span className="text-lg font-bold">luscious</span>
      </div>
      <div className="absolute top-6 right-12 flex items-center gap-8 z-20">
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Dumplings</a>
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Recipes</a>
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Food Menu</a>
        <a href="#" className="text-base text-gray-700 hover:text-[#ff7a27] font-medium">Order Now</a>
        <button className="ml-3 px-6 py-2 border-2 border-[#ff7a27] text-[#ff7a27] rounded-full font-semibold hover:bg-[#ff7a27] hover:text-white transition cursor-pointer" onClick={()=>{Router.push("/signin")}}>Login</button>
      </div>

      {/* Top-Left Spices */}
      <img src="/spoon-spices.png" alt="Spices" className="absolute left-10 top-20 w-44 z-10 pointer-events-none" />
      {/* Top-Right Tomatoes */}
      <img src="/tomato-vine.png" alt="Tomatoes" className="absolute right-10 top-24 w-24 z-10 pointer-events-none" />
      {/* Bottom-Left Sauce Bowl */}
      <img src="/sauce-bowl.png" alt="Sauce Bowl" className="absolute left-24 bottom-9 w-32 z-10 pointer-events-none" />

      {/* Content Layout */}
      <div className="flex flex-row justify-between items-center h-full w-full max-w-6xl mx-auto pt-36 pb-16 px-4 sm:px-8">
        {/* Left text content */}
        <div className="flex flex-col justify-center max-w-[430px] w-full">
          <h2 className="text-5xl font-bold leading-tight mb-5">
            Take a taste<br />
            Come join us.
          </h2>
          <p className="text-lg text-gray-700 mb-2 font-medium">
            Life is so endlessly delicious.
          </p>
          <p className="text-xs text-gray-400 max-w-xs mb-7">
            Dumpling is a broad classification for a dish that consists of pieces of dough made from a variety of starch sources wrapped around a filling, or of dough with no filling.
          </p>
          <button className="bg-[#ff7a27] hover:bg-[#ff974f] transition text-white font-semibold px-7 py-3 rounded-xl shadow w-max">
            Explore Now
          </button>
        </div>

        {/* Dumpling image + Chopsticks */}
        <div className="relative flex items-center justify-center min-w-[180px] max-w-[320px] w-full">
          <img
            ref={dumplingRef}
            src="/dumplings-plate.png"
            alt="Dumplings on Plate"
            className="w-full max-w-[320px] z-20"
          />
          <img
            src="/chopsticks.png"
            alt="Chopsticks"
            className="absolute left-8 top-10 w-[180px] sm:w-[200px] z-30"
          />
        </div>
      </div>
    </div>
  );
}
