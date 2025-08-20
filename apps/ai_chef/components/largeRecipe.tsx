'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function LargeRecipe() {
  const sectionRef = useRef(null);
  const decorImgRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const plateRef = useRef(null);

  useGSAP(() => {
    // Animate decorative images and main plate only after scroll into view
    decorImgRefs.forEach((imgRef, idx) => {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          delay: idx * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });
    // Animate the main plate/fork
    gsap.fromTo(
      plateRef.current,
      { opacity: 0, scale: 0.7, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[url('/marble-bg.jpg')] bg-cover h-screen w-full py-40 px-6 sm:px-20"
    >
      {/* Decorative images */}
      <img ref={decorImgRefs[0]} src="/star-anise.png" alt="star-anise" className="absolute right-14 top-40 w-24" />
      <img ref={decorImgRefs[1]} src="/pepper.png" alt="pepper" className="absolute right-48 top-16 w-8" />
      <img ref={decorImgRefs[2]} src="/tomato.png" alt="tomato" className="absolute left-10 bottom-16 w-14" />
      <img ref={decorImgRefs[3]} src="/bokchoy.png" alt="bokchoy" className="absolute right-4 bottom-4 w-36" />
      <img ref={decorImgRefs[4]} src="/fork.png" alt="fork" className="absolute left-20 bottom-6 w-20" />

      {/* Plate with noodles (main image) */}
      <div className="absolute left-16 top-16 z-10" ref={plateRef}>
        <img src="/noodles-plate.png" alt="Recipe Plate" className="w-80 sm:w-96 drop-shadow-2xl" />
        {/* Optional chopstick overlay if needed */}
        <img src="/chopsticks.png" alt="Chopsticks" className="absolute left-4 top-40 w-60 pointer-events-none" />
      </div>

      {/* Right Side: Review Section */}
      <div className="flex flex-col items-start justify-center ml-auto mr-20 mt-12 max-w-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Let's see what other says</h2>
        <p className="text-gray-500 mb-3 text-lg">Please serve yourself without any hesitate</p>
        <div className="mb-7 mt-2">
          <p className="text-gray-700 text-base leading-relaxed">
            <span role="img" aria-label="Quote" className="text-xl">🗨️</span>
            I’m currently on the tour with Shivayan Talukdar and while we were performing in town I came across your raw chocolate fudge at Whole Foods. OMG!!! I was nice enough to share it with Paula Abdul, the Physical therapist and the glam squad. Of course they all agreed with me! So glad we are coming back next week 😋
          </p>
        </div>
        {/* Avatars */}
        <div className="flex flex-row gap-4 mt-2">
          <img src="/avatar1.png" alt="Avatar 1" className="w-10 h-10 rounded-full border-2 border-white shadow" />
          <img src="/avatar2.png" alt="Avatar 2" className="w-10 h-10 rounded-full border-2 border-white shadow" />
          <img src="/avatar3.png" alt="Avatar 3" className="w-10 h-10 rounded-full border-2 border-orange-400 shadow" />
          <img src="/avatar4.png" alt="Avatar 4" className="w-10 h-10 rounded-full border-2 border-white shadow" />
        </div>
      </div>
    </div>
  );
}
