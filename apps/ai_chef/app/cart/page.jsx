"use client";
import { useState } from "react";

const initialCart = [
  { id: 1, name: "Chicken Dum Biryani", category: "Biryani", price: 249, qty: 2, emoji: "🍛" },
  { id: 4, name: "Schezwan Noodles", category: "Noodles", price: 189, qty: 1, emoji: "🍜" },
  { id: 7, name: "Virgin Mojito", category: "Mojitos", price: 129, qty: 3, emoji: "🍹" },
  { id: 10, name: "Smash Burger", category: "Burgers", price: 219, qty: 1, emoji: "🍔" },
];

const DELIVERY = 49;
const TAX_RATE = 0.05;

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [note, setNote] = useState("");

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + tax + (cart.length ? DELIVERY : 0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "LUSCIOUS10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
    }
  };

  if (placed) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="cart-placed">
          <div className="placed-card">
            <div className="placed-emoji">🎉</div>
            <h2 className="placed-title">Order Placed!</h2>
            <p className="placed-sub">Your food is being lovingly prepared.<br />Estimated delivery: <strong>30–40 min</strong></p>
            <div className="placed-id">Order #LUS-{Math.floor(Math.random() * 90000 + 10000)}</div>
            <button className="placed-btn" onClick={() => { setPlaced(false); setCart(initialCart); }}>
              Order Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div className="cart-page">
        <div className="cart-header">
          <p className="cart-eyebrow">Your Selection</p>
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-count">{cart.reduce((s, i) => s + i.qty, 0)} items waiting for you</p>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-emoji">🍽️</span>
            <p className="empty-text">Your cart is empty</p>
            <p className="empty-sub">Go back and explore the menu</p>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items">
              {cart.map((item, idx) => (
                <div className="cart-item" key={item.id} style={{ animationDelay: `${idx * 0.06}s` }}>
                  <div className="item-emoji-box">{item.emoji}</div>
                  <div className="item-info">
                    <p className="item-cat">{item.category}</p>
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-unit">₹{item.price} each</p>
                  </div>
                  <div className="item-right">
                    <div className="qty-ctrl">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <p className="item-total">₹{item.price * item.qty}</p>
                    <button className="item-remove" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}

              {/* Note */}
              <div className="note-box">
                <label className="note-label">Special Instructions</label>
                <textarea
                  className="note-input"
                  placeholder="Any requests for the kitchen? (e.g. less spicy, no onions…)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span><span>₹{subtotal}</span>
                </div>
                {couponApplied && (
                  <div className="summary-row discount">
                    <span>Discount (LUSCIOUS10)</span><span>− ₹{discount}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>GST (5%)</span><span>₹{tax}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span><span>₹{DELIVERY}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total-row">
                  <span>Total</span><span>₹{total}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="coupon-section">
                <div className="coupon-row">
                  <input
                    className="coupon-input"
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
                </div>
                {couponApplied && <p className="coupon-success">✓ 10% off applied!</p>}
                {couponError && <p className="coupon-error">{couponError}</p>}
                <p className="coupon-hint">Try: LUSCIOUS10</p>
              </div>

              <button className="place-btn" onClick={() => setPlaced(true)}>
                Place Order · ₹{total}
              </button>

              <div className="secure-note">🔒 Secure checkout · Free cancellation within 2 min</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cart-page {
    font-family: 'DM Sans', sans-serif;
    background: #faf8f5;
    min-height: 100vh;
    padding: 48px 24px 80px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .cart-header { text-align: center; margin-bottom: 44px; }
  .cart-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #e8773a; margin-bottom: 8px; }
  .cart-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3rem); color: #1a1208; font-weight: 700; }
  .cart-count { color: #9a8870; font-size: 0.9rem; margin-top: 6px; }

  .cart-empty { text-align: center; padding: 80px 0; }
  .empty-emoji { font-size: 4rem; display: block; margin-bottom: 16px; }
  .empty-text { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #1a1208; }
  .empty-sub { color: #9a8870; margin-top: 8px; }

  .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
  @media (max-width: 800px) { .cart-layout { grid-template-columns: 1fr; } }

  .cart-items { display: flex; flex-direction: column; gap: 16px; }

  .cart-item {
    background: #fff;
    border: 1px solid #ede8e0;
    border-radius: 16px;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    animation: slideIn 0.4s ease both;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
  .cart-item:hover { box-shadow: 0 8px 28px rgba(80,50,20,0.08); transform: translateY(-2px); }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }

  .item-emoji-box {
    width: 60px; height: 60px; border-radius: 14px;
    background: linear-gradient(135deg, #fff8f3, #fdeedd);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; flex-shrink: 0;
  }

  .item-info { flex: 1; min-width: 0; }
  .item-cat { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #e8773a; margin-bottom: 3px; }
  .item-name { font-family: 'Playfair Display', serif; font-size: 1rem; color: #1a1208; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .item-unit { font-size: 0.78rem; color: #9a8870; margin-top: 3px; }

  .item-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }

  .qty-ctrl { display: flex; align-items: center; gap: 10px; background: #f5f0e8; border-radius: 50px; padding: 4px 12px; }
  .qty-btn { background: none; border: none; cursor: pointer; font-size: 1.1rem; color: #e8773a; font-weight: 700; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; transition: transform 0.15s ease; border-radius: 50%; }
  .qty-btn:hover { transform: scale(1.25); background: #e8773a22; }
  .qty-num { font-weight: 700; color: #1a1208; font-size: 0.95rem; min-width: 20px; text-align: center; }

  .item-total { font-weight: 700; font-size: 1rem; color: #1a1208; min-width: 52px; text-align: right; }
  .item-remove { background: none; border: none; cursor: pointer; color: #c8bfb0; font-size: 0.9rem; padding: 4px; border-radius: 50%; transition: color 0.2s, background 0.2s; }
  .item-remove:hover { color: #e05252; background: #ffe5e5; }

  .note-box { background: #fff; border: 1px solid #ede8e0; border-radius: 16px; padding: 18px 20px; }
  .note-label { font-size: 0.78rem; font-weight: 600; color: #7a6a55; display: block; margin-bottom: 8px; letter-spacing: 0.05em; }
  .note-input { width: 100%; border: 1.5px solid #ede8e0; border-radius: 10px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: #1a1208; background: #faf8f5; resize: none; outline: none; transition: border-color 0.2s; }
  .note-input:focus { border-color: #e8773a; }
  .note-input::placeholder { color: #c8bfb0; }

  .cart-summary { background: #fff; border: 1px solid #ede8e0; border-radius: 20px; padding: 28px 24px; position: sticky; top: 24px; }
  .summary-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #1a1208; font-weight: 700; margin-bottom: 22px; }
  .summary-rows { display: flex; flex-direction: column; gap: 12px; }
  .summary-row { display: flex; justify-content: space-between; font-size: 0.9rem; color: #5a4a35; }
  .summary-row.discount { color: #2a9d6a; font-weight: 600; }
  .summary-row.total-row { font-weight: 700; font-size: 1.1rem; color: #1a1208; }
  .summary-divider { height: 1px; background: #ede8e0; margin: 4px 0; }

  .coupon-section { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ede8e0; }
  .coupon-row { display: flex; gap: 8px; }
  .coupon-input { flex: 1; border: 1.5px solid #ede8e0; border-radius: 10px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; outline: none; color: #1a1208; background: #faf8f5; transition: border-color 0.2s; }
  .coupon-input:focus { border-color: #e8773a; }
  .coupon-btn { background: #1a1208; color: #fff; border: none; border-radius: 10px; padding: 10px 16px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; }
  .coupon-btn:hover { background: #e8773a; transform: scale(1.04); }
  .coupon-success { color: #2a9d6a; font-size: 0.78rem; font-weight: 600; margin-top: 6px; }
  .coupon-error { color: #e05252; font-size: 0.78rem; margin-top: 6px; }
  .coupon-hint { color: #c8bfb0; font-size: 0.72rem; margin-top: 4px; }

  .place-btn {
    width: 100%; margin-top: 22px; padding: 16px;
    background: #e8773a; color: #fff; border: none; border-radius: 14px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700;
    cursor: pointer; letter-spacing: 0.02em;
    transition: background 0.22s, transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
  }
  .place-btn:hover { background: #d4692e; transform: scale(1.02); box-shadow: 0 8px 24px rgba(232,119,58,0.35); }
  .secure-note { text-align: center; font-size: 0.72rem; color: #b0a090; margin-top: 12px; }

  /* Placed */
  .cart-placed { min-height: 100vh; background: #faf8f5; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; padding: 24px; }
  .placed-card { text-align: center; background: #fff; border: 1px solid #ede8e0; border-radius: 24px; padding: 60px 48px; max-width: 420px; animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
  .placed-emoji { font-size: 4rem; margin-bottom: 16px; display: block; }
  .placed-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1208; font-weight: 700; margin-bottom: 10px; }
  .placed-sub { color: #7a6a55; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; }
  .placed-id { display: inline-block; background: #fdeedd; color: #e8773a; font-weight: 700; font-size: 0.85rem; padding: 8px 18px; border-radius: 50px; margin-bottom: 28px; letter-spacing: 0.05em; }
  .placed-btn { background: #e8773a; color: #fff; border: none; border-radius: 12px; padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: background 0.2s, transform 0.2s; }
  .placed-btn:hover { background: #d4692e; transform: scale(1.04); }
`;