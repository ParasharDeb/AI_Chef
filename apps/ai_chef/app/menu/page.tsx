'use client'
import { useState, useEffect } from "react";
import Biryani from "@/components/Biryani";
import Coffee from "@/components/Coffee";
import Mojito from "@/components/Mojito";
import Pasta from "@/components/Pasta";
import Pizza from "@/components/Pizza";
import Burger from "@/components/Burger";
import Dessert from "@/components/Dessert";

const tabs = [
  {
    id: "biryani",
    label: "Biryani",
    image: "https://images.unsplash.com/photo-1604908176997-4311c66c5f3d?w=400",
    component: Biryani,
  },
  {
    id: "coffee",
    label: "Coffee",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    component: Coffee,
  },
  {
    id: "mojito",
    label: "Mojito",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6c1a?w=400",
    component: Mojito,
  },
  {
    id: "pasta",
    label: "Pasta",
    image: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8f70?w=400",
    component: Pasta,
  },
  {
    id: "pizza",
    label: "Pizza",
    image: "https://images.unsplash.com/photo-1548365328-9f547fb0953d?w=400",
    component: Pizza,
  },
  {
    id: "burger",
    label: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
    component: Burger,
  },
  {
    id: "dessert",
    label: "Dessert",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400",
    component: Dessert,
  },
];

export default function Menu() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = tabs.find((t) => t.id === activeId);
  const ActiveComponent = active?.component ?? null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeId]);

  return (
    <div className="relative min-h-screen py-20 px-6 overflow-hidden">

      {/* 🔥 Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#f5f3ee]/80 backdrop-blur-sm"></div>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-6xl font-bold text-[#1a1208] mb-4 tracking-tight">
          Our Menu
        </h1>
        <p className="text-[#5a4a3a] text-xl font-medium">
          Pick a category to explore our delicious dishes
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className="
              group relative flex flex-col items-center justify-center gap-4 
              rounded-2xl px-6 py-10 
              bg-white/80 backdrop-blur-md
              border border-white/40
              shadow-md hover:shadow-2xl
              hover:-translate-y-2
              transition-all duration-300 cursor-pointer
              overflow-hidden
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#ff7a27]/10 to-transparent"></div>

            {/* Image instead of emoji */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md">
              <img
                src={tab.image}
                alt={tab.label}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
            </div>

            <span className="text-[#1a1208] font-semibold text-base group-hover:text-[#ff7a27] transition-colors">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {activeId && ActiveComponent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            backgroundColor: "rgba(20,15,10,0.35)",
          }}
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ animation: "modalPop .3s cubic-bezier(.22,1,.36,1) forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveId(null)}
              className="
                absolute -top-5 -right-5 z-10 
                w-10 h-10 rounded-full 
                bg-white shadow-lg
                border border-black/10 
                text-gray-500 
                hover:text-[#ff7a27] 
                hover:border-[#ff7a27] 
                transition-all flex items-center justify-center text-xl
              "
            >
              ×
            </button>

            <ActiveComponent />
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}