"use client";
import { useState } from "react";

const categories = [
  "All",
  "Biryani",
  "Noodles",
  "Mojitos",
  "Burgers",
  "Desserts",
  "Salads",
];

const menuItems = [
  {
    id: 1,
    name: "Chicken Dum Biryani",
    category: "Biryani",
    price: 249,
    rating: 4.8,
    reviews: 312,
    tag: "Bestseller",
    emoji: "🍛",
    desc: "Slow-cooked basmati rice with tender chicken & whole spices",
  },
  {
    id: 2,
    name: "Mutton Biryani",
    category: "Biryani",
    price: 329,
    rating: 4.9,
    reviews: 198,
    tag: "Chef's Pick",
    emoji: "🍲",
    desc: "Melt-in-mouth mutton layered with saffron-infused rice",
  },
  {
    id: 3,
    name: "Veg Biryani",
    category: "Biryani",
    price: 179,
    rating: 4.5,
    reviews: 142,
    tag: null,
    emoji: "🥘",
    desc: "Garden-fresh veggies slow-cooked in aromatic spices",
  },
  {
    id: 4,
    name: "Schezwan Noodles",
    category: "Noodles",
    price: 189,
    rating: 4.7,
    reviews: 256,
    tag: "Spicy 🌶",
    emoji: "🍜",
    desc: "Wok-tossed noodles in fiery schezwan sauce",
  },
  {
    id: 5,
    name: "Hakka Noodles",
    category: "Noodles",
    price: 169,
    rating: 4.6,
    reviews: 210,
    tag: null,
    emoji: "🍝",
    desc: "Classic Indo-Chinese noodles with crisp veggies",
  },
  {
    id: 6,
    name: "Ramen Bowl",
    category: "Noodles",
    price: 299,
    rating: 4.8,
    reviews: 175,
    tag: "New",
    emoji: "🫕",
    desc: "Rich broth, soft egg, nori & chewy ramen noodles",
  },
  {
    id: 7,
    name: "Virgin Mojito",
    category: "Mojitos",
    price: 129,
    rating: 4.7,
    reviews: 389,
    tag: "Refreshing",
    emoji: "🍹",
    desc: "Fresh mint, lime & soda — the classic cooler",
  },
  {
    id: 8,
    name: "Watermelon Mojito",
    category: "Mojitos",
    price: 149,
    rating: 4.8,
    reviews: 274,
    tag: "Seasonal",
    emoji: "🍉",
    desc: "Juicy watermelon blended with mint & a hint of lime",
  },
  {
    id: 9,
    name: "Blue Lagoon Mojito",
    category: "Mojitos",
    price: 159,
    rating: 4.6,
    reviews: 198,
    tag: null,
    emoji: "💧",
    desc: "Blue curacao, lemon & soda for a tropical vibe",
  },
  {
    id: 10,
    name: "Smash Burger",
    category: "Burgers",
    price: 219,
    rating: 4.9,
    reviews: 421,
    tag: "Bestseller",
    emoji: "🍔",
    desc: "Double smashed patty, caramelized onions & secret sauce",
  },
  {
    id: 11,
    name: "Crispy Chicken Burger",
    category: "Burgers",
    price: 199,
    rating: 4.7,
    reviews: 308,
    tag: null,
    emoji: "🍗",
    desc: "Golden-fried chicken fillet with sriracha mayo & pickles",
  },
  {
    id: 12,
    name: "Tiramisu",
    category: "Desserts",
    price: 169,
    rating: 4.9,
    reviews: 187,
    tag: "Chef's Pick",
    emoji: "🍰",
    desc: "Italian classic — espresso-soaked layers, mascarpone cream",
  },
  {
    id: 13,
    name: "Mango Sticky Rice",
    category: "Desserts",
    price: 149,
    rating: 4.8,
    reviews: 143,
    tag: "Seasonal",
    emoji: "🥭",
    desc: "Thai-style sweet glutinous rice with fresh Alphonso mango",
  },
  {
    id: 14,
    name: "Caesar Salad",
    category: "Salads",
    price: 199,
    rating: 4.6,
    reviews: 162,
    tag: null,
    emoji: "🥗",
    desc: "Crisp romaine, parmesan shavings & house Caesar dressing",
  },
  {
    id: 15,
    name: "Greek Salad",
    category: "Salads",
    price: 189,
    rating: 4.5,
    reviews: 128,
    tag: "Healthy",
    emoji: "🫒",
    desc: "Olives, feta, cucumber & cherry tomatoes in herb vinaigrette",
  },
];

function StarRating({ rating }) {
  return (
    <span style={{ color: "#e8773a", fontSize: "0.75rem", letterSpacing: 1 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span style={{ color: "#c8bfb0", marginLeft: 4, fontFamily: "inherit" }}>
        {rating}
      </span>
    </span>
  );
}

function MenuCard({ item }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="menu-card">
      <div className="card-emoji-wrap">
        <span className="card-emoji">{item.emoji}</span>
      </div>
      {item.tag && <span className="card-tag">{item.tag}</span>}
      <div className="card-body">
        <h3 className="card-name">{item.name}</h3>
        <p className="card-desc">{item.desc}</p>
        <div className="card-meta">
          <StarRating rating={item.rating} />
          <span className="card-reviews">({item.reviews})</span>
        </div>
        <div className="card-footer">
          <span className="card-price">₹{item.price}</span>
          <button
            className={`card-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .menu-card {
          background: #faf8f5;
          border: 1px solid #ede8e0;
          border-radius: 18px;
          padding: 0 0 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.28s ease, border-color 0.2s ease;
          cursor: default;
        }
        .menu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(80, 50, 20, 0.1);
          border-color: #e8773a44;
        }
        .card-emoji-wrap {
          background: linear-gradient(135deg, #fff8f3 0%, #fdeedd 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 110px;
          border-radius: 16px 16px 0 0;
          font-size: 3.5rem;
          transition: transform 0.3s ease;
        }
        .menu-card:hover .card-emoji-wrap {
          transform: scale(1.04);
        }
        .card-emoji {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08));
        }
        .menu-card:hover .card-emoji {
          transform: rotate(-8deg) scale(1.15);
        }
        .card-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #e8773a;
          color: #fff;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 9px;
          border-radius: 20px;
          text-transform: uppercase;
          font-family: "DM Sans", sans-serif;
        }
        .card-body {
          padding: 16px 18px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .card-name {
          font-family: "Playfair Display", serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #1a1208;
          margin: 0;
          line-height: 1.3;
        }
        .card-desc {
          font-family: "DM Sans", sans-serif;
          font-size: 0.78rem;
          color: #7a6a55;
          margin: 0;
          line-height: 1.5;
        }
        .card-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
          font-family: "DM Sans", sans-serif;
        }
        .card-reviews {
          font-size: 0.72rem;
          color: #b0a090;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }
        .card-price {
          font-family: "DM Sans", sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1208;
        }
        .card-btn {
          background: transparent;
          border: 1.5px solid #e8773a;
          color: #e8773a;
          font-family: "DM Sans", sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 7px 18px;
          border-radius: 50px;
          cursor: pointer;
          transition: background 0.22s ease, color 0.22s ease,
            transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.2s ease;
          letter-spacing: 0.02em;
        }
        .card-btn:hover {
          background: #e8773a;
          color: #fff;
          transform: scale(1.06);
          box-shadow: 0 4px 14px rgba(232, 119, 58, 0.35);
        }
        .card-btn.added {
          background: #2a9d6a;
          border-color: #2a9d6a;
          color: #fff;
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}

export default function MenuCards() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .menu-section {
          font-family: 'DM Sans', sans-serif;
          padding: 40px 24px 64px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .menu-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #e8773a;
          margin-bottom: 8px;
        }

        .menu-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #1a1208;
          margin: 0 0 6px;
          line-height: 1.15;
        }

        .menu-subtitle {
          color: #7a6a55;
          font-size: 0.95rem;
          font-weight: 400;
        }

        .category-bar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 36px;
        }

        .cat-btn {
          background: transparent;
          border: 1.5px solid #ede8e0;
          color: #7a6a55;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
          letter-spacing: 0.01em;
        }

        .cat-btn:hover {
          border-color: #e8773a;
          color: #e8773a;
          transform: translateY(-2px);
        }

        .cat-btn.active {
          background: #e8773a;
          border-color: #e8773a;
          color: #fff;
          box-shadow: 0 4px 16px rgba(232, 119, 58, 0.3);
          transform: translateY(-2px);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 22px;
          animation: gridFadeIn 0.4s ease;
        }

        @keyframes gridFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .menu-count {
          text-align: center;
          margin-bottom: 20px;
          font-size: 0.8rem;
          color: #b0a090;
          letter-spacing: 0.05em;
        }
      `}</style>

      <section className="menu-section">
        <div className="menu-header">
          <p className="menu-eyebrow">Explore Our Menu</p>
          <h2 className="menu-title">What are you craving?</h2>
          <p className="menu-subtitle">Life is so endlessly delicious.</p>
        </div>

        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="menu-count">{filtered.length} items</p>

        <div className="menu-grid">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}