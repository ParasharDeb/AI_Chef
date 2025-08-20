'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const containerRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const bottomImgRef = useRef(null);

  useGSAP(() => {
    // Animate images: rotate only
    const images = gsap.utils.toArray("img.rounded-full");
    images.forEach((img) => {
      gsap.to(img, {
        rotate: 45,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Animate all text: fade in and move up
    const texts = gsap.utils.toArray(".text > h3, .text > p, h2, p, .flex.mb-10");
    texts.forEach((txt) => {
      gsap.fromTo(
        txt,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    });

    // Animate left ingredient image: slide in/out on scroll
    gsap.fromTo(
      leftImgRef.current,
      { x: "-150%" },
      {
        x: "0%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );
    gsap.to(leftImgRef.current, {
      x: "-150%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate right ingredient image: slide in/out on scroll
    gsap.fromTo(
      rightImgRef.current,
      { x: "150%" },
      {
        x: "0%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );
    gsap.to(rightImgRef.current, {
      x: "150%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate bottom ingredient (optional): slide up from bottom
    gsap.fromTo(
      bottomImgRef.current,
      { y: "150%" },
      {
        y: "0%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    gsap.to(bottomImgRef.current, {
      y: "-150%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom top+=200",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center w-full min-h-screen bg-[url('/marble-bg.jpg')] bg-cover py-12"
    >
      {/* Section Header */}
      <h2 className="text-3xl font-bold mb-2">What's on our Plate</h2>
      <p className="mb-6 text-gray-600 text-center">Please serve yourself without any hesitate</p>
      {/* Tabs */}
      <div className="flex mb-10 justify-center">
        <button className="mx-2 px-4 py-2 text-gray-500">Appetizers</button>
        <button className="mx-2 px-4 py-2 text-black border-b-2 border-orange-400 font-bold">
          Main Dish
        </button>
        <button className="mx-2 px-4 py-2 text-gray-500">Dessert</button>
      </div>
      {/* Dishes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl">
        {/* Stirred Egg */}
        <div className="text flex flex-col items-center">
          <img
            src="./pulao-removebg-preview.png"
            alt="Stirred Egg"
            className="rounded-full w-48 h-48 object-cover mb-4 shadow-lg"
          />
          <h3 className="font-bold text-xl mb-2">Stirred Egg</h3>
          <p className="text-gray-500 text-center max-w-xs mb-2">
            This might be the most common Chinese family dish. The dish is easy to cook, fry the stirred egg and sliced tomato.
          </p>
        </div>
        {/* Kung Pao Chicken */}
        <div className="text flex flex-col items-center">
          <img
            src="./pulao-removebg-preview.png"
            alt="Kung Pao Chicken"
            className="rounded-full w-48 h-48 object-cover mb-4 shadow-lg"
          />
          <h3 className="font-bold text-xl mb-2">Kung Pao Chicken</h3>
          <p className="text-gray-500 text-center max-w-xs mb-2">
            When temperatures plummet and you're craving something warm and cozy, you can't go wrong with fluffy.
          </p>
        </div>
        {/* Sweet Pork Chops */}
        <div className="text flex flex-col items-center">
          <img
            src="./pulao-removebg-preview.png"
            alt="Sweet Pork Chops"
            className="rounded-full w-48 h-48 object-cover mb-4 shadow-lg"
          />
          <h3 className="font-bold text-xl mb-2">Sweet Pork Chops</h3>
          <p className="text-gray-500 text-center max-w-xs mb-2">
            Sweet and sour dishes are popular among Chinese families. Although the ingredients and cooking methods...
          </p>
        </div>
      </div>
      {/* Decorative ingredient images */}
      <img
        ref={rightImgRef}
        src="./live-pink-crayfish-removebg-preview.png"
        alt="lobster"
        className="absolute top-0 right-24 w-32 hidden md:block"
      />
      <img
        ref={leftImgRef}
        src="./live-pink-crayfish-removebg-preview.png"
        alt="peas"
        className="absolute top-0 left-24 w-24 hidden md:block"
      />
      <img
        ref={bottomImgRef}
        src="./live-pink-crayfish-removebg-preview.png"
        alt="garlic"
        className="absolute bottom-0 left-40 w-20 hidden md:block"
      />
    </div>
  );
}
