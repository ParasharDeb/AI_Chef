'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const decorImgRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useGSAP(() => {
    // Animate each decorative image: fade in and pop up when scrolled to Footer
    decorImgRefs.forEach((imgRef, idx) => {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          delay: idx * 0.13,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",    // trigger only when footer comes into view
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });
  }, []);

  return (
    <div
      ref={footerRef}
      className="relative bg-[url('/marble-bg.jpg')] bg-cover min-h-[430px] w-full pt-16 pb-12 px-4 sm:px-16"
    >
      {/* Top decorative images */}
      <img ref={decorImgRefs[0]} src="/spinach.png" alt="spinach" className="absolute left-8 top-10 w-24" />
      <img ref={decorImgRefs[1]} src="/onion.png" alt="onion" className="absolute left-[225px] top-5 w-14" />
      <img ref={decorImgRefs[2]} src="/parsley.png" alt="parsley" className="absolute left-1/2 top-8 w-16" />
      <img ref={decorImgRefs[3]} src="/lemon-slice.png" alt="lemon" className="absolute right-48 top-12 w-14" />
      <img ref={decorImgRefs[4]} src="/frying-pan.png" alt="pan" className="absolute right-10 top-8 w-36" />
      <img ref={decorImgRefs[5]} src="/chili.png" alt="chili" className="absolute right-40 top-[98px] w-8" />
      <img ref={decorImgRefs[6]} src="/tomato.png" alt="tomato" className="absolute left-[190px] top-24 w-14" />

      <div className="flex flex-col items-center justify-center text-center mt-6 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Easy recipes will send to your inbox</h2>
        <p className="text-gray-500 mb-5 text-[18px] max-w-md">
          Get weekly updates on the newest chinese recipes in your mailbox!
        </p>
        <div className="flex flex-row justify-center items-center gap-2 mt-2 max-w-xl w-full">
          <input
            className="bg-white px-7 py-3 rounded-xl max-w-sm w-full text-gray-700 border outline-none shadow"
            placeholder="your email address"
            type="email"
          />
          <button className="bg-[#ff7a27] rounded-xl px-8 py-3 text-white font-bold text-lg shadow hover:bg-[#ff974f] transition">
            subscribe
          </button>
        </div>
      </div>

      {/* Bottom decorative images */}
      <img ref={decorImgRefs[7]} src="/star-anise.png" alt="star-anise" className="absolute left-1/2 top-[235px] w-10" />

      <div className="flex flex-row flex-wrap justify-center gap-16 pt-16 pb-10 w-full max-w-5xl mx-auto">
        <div>
          <h3 className="font-semibold mb-3">Get Cooking</h3>
          <ul className="text-gray-700 text-[15px]">
            <li>Easy Asian Takeout</li>
            <li>Recipe Gallery</li>
            <li>Ingredients Guide</li>
            <li>Weekly Meal Plans</li>
            <li>Penang Tour</li>
            <li>Conversion Tool</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Infomation</h3>
          <ul className="text-gray-700 text-[15px]">
            <li>About</li>
            <li>Disclosure</li>
            <li>Privacy Policy</li>
            <li>Giveaway Rules</li>
            <li>Giveaway Winners</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <ul className="text-gray-700 text-[15px]">
            <li>RSS Feeds</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Youtube</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>

      {/* More decorative bottom images */}
      <img src="/garlic.png" alt="garlic" className="absolute left-[220px] bottom-8 w-12" />
      <img src="/pepper-seeds.png" alt="pepper-seeds" className="absolute left-[320px] bottom-12 w-6" />
      <img src="/onion-slice.png" alt="onion-slice" className="absolute right-20 bottom-10 w-16" />
    </div>
  );
}
