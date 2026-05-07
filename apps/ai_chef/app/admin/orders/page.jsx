"use client";
import { useState } from "react";

const CATEGORIES = ["All", "Biryani", "Noodles", "Mojitos", "Burgers", "Desserts", "Salads"];

// Replace this with real order data from your backend/state
const mockOrders = [
  { id: 1,  name: "Chicken Dum Biryani",  emoji: "🍛", category: "Biryani",  table: "T3", qty: 2, tag: "Bestseller"  },
  { id: 2,  name: "Mutton Biryani",        emoji: "🍲", category: "Biryani",  table: "T1", qty: 1, tag: "Chef's Pick" },
  { id: 3,  name: "Schezwan Noodles",      emoji: "🍜", category: "Noodles",  table: "T5", qty: 3, tag: "Spicy 🌶"    },
  { id: 4,  name: "Ramen Bowl",            emoji: "🫕", category: "Noodles",  table: "T2", qty: 1, tag: "New"          },
  { id: 5,  name: "Virgin Mojito",         emoji: "🍹", category: "Mojitos",  table: "T4", qty: 4, tag: ""             },
  { id: 6,  name: "Watermelon Mojito",     emoji: "🍉", category: "Mojitos",  table: "T3", qty: 2, tag: "Seasonal"     },
  { id: 7,  name: "Smash Burger",          emoji: "🍔", category: "Burgers",  table: "T6", qty: 2, tag: "Bestseller"   },
  { id: 8,  name: "Tiramisu",              emoji: "🍰", category: "Desserts", table: "T1", qty: 1, tag: "Chef's Pick"  },
  { id: 9,  name: "Caesar Salad",          emoji: "🥗", category: "Salads",   table: "T2", qty: 2, tag: ""             },
  { id: 10, name: "Hakka Noodles",         emoji: "🍝", category: "Noodles",  table: "T5", qty: 1, tag: ""             },
  { id: 11, name: "Veg Biryani",           emoji: "🥘", category: "Biryani",  table: "T4", qty: 1, tag: ""             },
];

function OrderCard({ order, cleared, onClear, onUndo }) {
  return (
    <div className={`order-card ${cleared ? "done" : ""}`}>
      <span className="order-emoji">{order.emoji}</span>

      <div className="order-info">
        <p className={`order-name ${cleared ? "strikethrough" : ""}`}>{order.name}</p>
        <div className="order-meta">
          <span className="order-table">🪑 {order.table}</span>
          <span className="order-qty">×{order.qty}</span>
          {order.tag && <span className="order-tag">{order.tag}</span>}
        </div>
      </div>

      {cleared ? (
        <button className="action-btn undo-btn" onClick={() => onUndo(order.id)}>↩ Undo</button>
      ) : (
        <button className="action-btn clear-btn" onClick={() => onClear(order.id)}>✓ Done</button>
      )}

      <style jsx>{`
        .order-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #1a1610;
          border: 1px solid #2e2820;
          border-radius: 16px;
          padding: 14px 16px;
          transition: opacity 0.3s;
        }
        .order-card.done { opacity: 0.4; }
        .order-emoji {
          font-size: 26px;
          width: 48px;
          height: 48px;
          background: #0f0d09;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .order-info { flex: 1; min-width: 0; }
        .order-name {
          font-weight: 600;
          color: #f5ede0;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .strikethrough { text-decoration: line-through; }
        .order-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 5px;
          flex-wrap: wrap;
        }
        .order-table { font-size: 0.75rem; color: #6a5c48; }
        .order-qty {
          font-size: 0.72rem;
          font-weight: 700;
          background: #2e2820;
          color: #b89a70;
          padding: 2px 8px;
          border-radius: 20px;
        }
        .order-tag {
          font-size: 0.68rem;
          font-weight: 700;
          background: #e8773a22;
          color: #e8773a;
          padding: 2px 8px;
          border-radius: 20px;
        }
        .action-btn {
          flex-shrink: 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 9px 16px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
          white-space: nowrap;
        }
        .clear-btn { background: #2a9d6a; color: #fff; }
        .clear-btn:hover { background: #1f7a52; transform: scale(1.05); }
        .undo-btn { background: #2e2820; color: #b89a70; }
        .undo-btn:hover { background: #3a3228; transform: scale(1.05); }
      `}</style>
    </div>
  );
}

export default function ChefKitchenDisplay({ onLogout, orders = mockOrders }) {
  const [cleared, setCleared]   = useState(new Set());
  const [activeCat, setActiveCat] = useState("All");

  const clear = (id) => setCleared((prev) => new Set([...prev, id]));
  const undo  = (id) => setCleared((prev) => { const s = new Set(prev); s.delete(id); return s; });

  const visible = activeCat === "All" ? orders : orders.filter((o) => o.category === activeCat);
  const pending = visible.filter((o) => !cleared.has(o.id));
  const done    = visible.filter((o) =>  cleared.has(o.id));

  return (
    <>
      <style>{pageStyles}</style>

      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-left">
          <span className="brand-icon">🍽️</span>
          <span className="brand-name">Kitchen</span>
        </div>
        <div className="topbar-right">
          <span className="pending-badge">{pending.length} pending</span>
          {onLogout && (
            <button className="logout-btn" onClick={onLogout}>← Out</button>
          )}
        </div>
      </header>

      {/* Category filter */}
      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${activeCat === cat ? "active" : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <main className="orders-list">
        {pending.length === 0 && done.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">✅</span>
            <p>No orders right now</p>
          </div>
        )}

        {pending.length > 0 && (
          <>
            <p className="section-label">To make ({pending.length})</p>
            {pending.map((o) => (
              <OrderCard key={o.id} order={o} cleared={false} onClear={clear} onUndo={undo} />
            ))}
          </>
        )}

        {done.length > 0 && (
          <>
            <p className="section-label" style={{ marginTop: "18px" }}>Cleared ({done.length})</p>
            {done.map((o) => (
              <OrderCard key={o.id} order={o} cleared={true} onClear={clear} onUndo={undo} />
            ))}
          </>
        )}
      </main>
    </>
  );
}

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root { background: #0f0d09; font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  /* Top bar */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: #1a1610;
    border-bottom: 1px solid #2e2820;
  }
  .topbar-left  { display: flex; align-items: center; gap: 10px; }
  .topbar-right { display: flex; align-items: center; gap: 10px; }
  .brand-icon   { font-size: 1.4rem; }
  .brand-name   { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #f5ede0; font-weight: 700; }

  .pending-badge {
    background: #e8773a22;
    color: #e8773a;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
  }
  .logout-btn {
    background: none;
    border: 1.5px solid #2e2820;
    color: #6a5c48;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 9px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .logout-btn:hover { border-color: #e05252; color: #e05252; }

  /* Category filter chips */
  .filter-bar {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    overflow-x: auto;
    scrollbar-width: none;
    background: #1a1610;
    border-bottom: 1px solid #2e2820;
  }
  .filter-bar::-webkit-scrollbar { display: none; }
  .filter-chip {
    flex-shrink: 0;
    background: transparent;
    border: 1.5px solid #2e2820;
    color: #6a5c48;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .filter-chip:hover  { border-color: #e8773a44; color: #f5ede0; }
  .filter-chip.active { background: #e8773a; border-color: #e8773a; color: #fff; }

  /* Orders */
  .orders-list {
    padding: 14px 16px 60px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
  }

  .section-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4a3c2c;
    margin-bottom: 2px;
    padding-left: 2px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 24px;
    color: #4a3c2c;
  }
  .empty-icon { font-size: 2.5rem; display: block; margin-bottom: 10px; }
  .empty-state p { font-size: 0.9rem; }

  /* Responsive tweaks for very small screens */
  @media (max-width: 360px) {
    .topbar { padding: 12px 14px; }
    .orders-list { padding: 12px 12px 60px; }
  }
`;