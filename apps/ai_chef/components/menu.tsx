'use client'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray(".text");

    elements.forEach((el: any, i) => {
      gsap.to(el, {
        y: -100,
        rotate: 45,

        duration: 1,
        delay: i * 0.3, // stagger
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-12 gap-10 w-screen h-screen px-40 items-center">
      <div className="col-span-3 text">
        <img src="/foodmain-removebg-preview.png" alt="dish 1" />
      </div>
      <div className="col-span-3 text">
        <img src="/pulao-removebg-preview.png" alt="dish 2" />
      </div>
      <div className="col-span-3 text">
        <img src="/pulao-removebg-preview.png" alt="dish 3" />
      </div>
    </div>
  );
}
