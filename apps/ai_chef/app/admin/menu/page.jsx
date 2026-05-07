"use client";
import { useState, useRef } from "react";

const CATEGORIES = ["Biryani", "Noodles", "Mojitos", "Burgers", "Desserts", "Salads"];

const initialItems = [
  { id: 1, name: "Chicken Dum Biryani", category: "Biryani", price: 249, rating: 4.8, available: true, tag: "Bestseller", emoji: "🍛", desc: "Slow-cooked basmati rice with tender chicken & whole spices" },
  { id: 2, name: "Mutton Biryani", category: "Biryani", price: 329, rating: 4.9, available: true, tag: "Chef's Pick", emoji: "🍲", desc: "Melt-in-mouth mutton layered with saffron-infused rice" },
  { id: 3, name: "Veg Biryani", category: "Biryani", price: 179, rating: 4.5, available: false, tag: "", emoji: "🥘", desc: "Garden-fresh veggies slow-cooked in aromatic spices" },
  { id: 4, name: "Schezwan Noodles", category: "Noodles", price: 189, rating: 4.7, available: true, tag: "Spicy 🌶", emoji: "🍜", desc: "Wok-tossed noodles in fiery schezwan sauce" },
  { id: 5, name: "Hakka Noodles", category: "Noodles", price: 169, rating: 4.6, available: true, tag: "", emoji: "🍝", desc: "Classic Indo-Chinese noodles with crisp veggies" },
  { id: 6, name: "Ramen Bowl", category: "Noodles", price: 299, rating: 4.8, available: true, tag: "New", emoji: "🫕", desc: "Rich broth, soft egg, nori & chewy ramen noodles" },
  { id: 7, name: "Virgin Mojito", category: "Mojitos", price: 129, rating: 4.7, available: true, tag: "Refreshing", emoji: "🍹", desc: "Fresh mint, lime & soda — the classic cooler" },
  { id: 8, name: "Watermelon Mojito", category: "Mojitos", price: 149, rating: 4.8, available: true, tag: "Seasonal", emoji: "🍉", desc: "Juicy watermelon blended with mint & a hint of lime" },
  { id: 9, name: "Smash Burger", category: "Burgers", price: 219, rating: 4.9, available: true, tag: "Bestseller", emoji: "🍔", desc: "Double smashed patty, caramelized onions & secret sauce" },
  { id: 10, name: "Tiramisu", category: "Desserts", price: 169, rating: 4.9, available: true, tag: "Chef's Pick", emoji: "🍰", desc: "Italian classic — espresso-soaked layers, mascarpone cream" },
  { id: 11, name: "Caesar Salad", category: "Salads", price: 199, rating: 4.6, available: true, tag: "", emoji: "🥗", desc: "Crisp romaine, parmesan shavings & house Caesar dressing" },
];

const EMOJIS = ["🍛","🍲","🥘","🍜","🍝","🫕","🍹","🍉","💧","🍔","🍗","🍰","🥭","🥗","🫒","🍱","🌮","🥩","🍕","🥐","🧆","🥙","🍣","🫙"];

const TAGS = ["", "Bestseller", "Chef's Pick", "New", "Seasonal", "Spicy 🌶", "Refreshing", "Healthy", "Vegan 🌱"];

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      className={`toggle ${checked ? "on" : "off"}`}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span className="toggle-knob" />
      <style jsx>{`
        .toggle { width:44px; height:24px; border-radius:50px; border:none; cursor:pointer; position:relative; transition:background 0.25s; padding:0; }
        .toggle.on { background:#2a9d6a; }
        .toggle.off { background:#2e2820; }
        .toggle-knob { position:absolute; top:3px; width:18px; height:18px; background:#fff; border-radius:50%; transition:left 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .toggle.on .toggle-knob { left:23px; }
        .toggle.off .toggle-knob { left:3px; }
      `}</style>
    </button>
  );
}

function EditModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({ ...item });
  const [emojiPicker, setEmojiPicker] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{item.id === -1 ? "Add New Item" : "Edit Item"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Emoji picker */}
          <div className="field-row">
            <label className="m-label">Emoji / Icon</label>
            <div style={{ position: "relative" }}>
              <button className="emoji-display" onClick={() => setEmojiPicker((v) => !v)}>
                <span style={{ fontSize: "2rem" }}>{form.emoji}</span>
                <span className="emoji-change">Change</span>
              </button>
              {emojiPicker && (
                <div className="emoji-grid">
                  {EMOJIS.map((em) => (
                    <button key={em} className="emoji-opt" onClick={() => { setForm((f) => ({ ...f, emoji: em })); setEmojiPicker(false); }}>{em}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="field-row">
            <label className="m-label">Item Name</label>
            <input className="m-input" value={form.name} onChange={set("name")} placeholder="e.g. Chicken Dum Biryani" />
          </div>

          {/* Description */}
          <div className="field-row">
            <label className="m-label">Description</label>
            <textarea className="m-input m-textarea" value={form.desc} onChange={set("desc")} placeholder="Short description…" rows={2} />
          </div>

          {/* Category + Tag row */}
          <div className="two-col">
            <div className="field-row">
              <label className="m-label">Category</label>
              <select className="m-input m-select" value={form.category} onChange={set("category")}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field-row">
              <label className="m-label">Badge / Tag</label>
              <select className="m-input m-select" value={form.tag} onChange={set("tag")}>
                {TAGS.map((t) => <option key={t} value={t}>{t || "— None —"}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Rating row */}
          <div className="two-col">
            <div className="field-row">
              <label className="m-label">Price (₹)</label>
              <input className="m-input" type="number" min="1" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
            </div>
            <div className="field-row">
              <label className="m-label">Rating (0–5)</label>
              <input className="m-input" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))} />
            </div>
          </div>

          {/* Available */}
          <div className="field-row avail-row">
            <label className="m-label">Available on Menu</label>
            <ToggleSwitch checked={form.available} onChange={(v) => setForm((f) => ({ ...f, available: v }))} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="m-cancel" onClick={onClose}>Cancel</button>
          <button className="m-save" onClick={() => onSave(form)}>
            {item.id === -1 ? "Add Item" : "Save Changes"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:100; display:flex; align-items:center; justify-content:center; padding:24px; backdrop-filter:blur(4px); }
        .modal { background:#1a1610; border:1px solid #2e2820; border-radius:22px; width:100%; max-width:540px; max-height:90vh; overflow-y:auto; animation:modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes modalIn { from{opacity:0;transform:scale(0.93) translateY(16px)} to{opacity:1;transform:none} }
        .modal-header { display:flex; justify-content:space-between; align-items:center; padding:24px 28px 0; }
        .modal-title { font-family:'Playfair Display',serif; font-size:1.3rem; color:#f5ede0; font-weight:700; }
        .modal-close { background:none; border:none; color:#6a5c48; font-size:1.1rem; cursor:pointer; transition:color 0.2s; }
        .modal-close:hover { color:#e8773a; }
        .modal-body { padding:22px 28px; display:flex; flex-direction:column; gap:16px; }
        .field-row { display:flex; flex-direction:column; gap:6px; }
        .m-label { font-size:0.72rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#6a5c48; }
        .m-input { background:#0f0d09; border:1.5px solid #2e2820; border-radius:10px; padding:11px 14px; color:#f5ede0; font-family:'DM Sans',sans-serif; font-size:0.9rem; outline:none; transition:border-color 0.2s; width:100%; }
        .m-input:focus { border-color:#e8773a; }
        .m-textarea { resize:none; }
        .m-select { appearance:none; cursor:pointer; }
        .two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .avail-row { flex-direction:row; align-items:center; justify-content:space-between; background:#0f0d09; border-radius:10px; padding:12px 14px; }
        .emoji-display { background:#0f0d09; border:1.5px solid #2e2820; border-radius:12px; padding:10px 18px; cursor:pointer; display:flex; align-items:center; gap:12px; transition:border-color 0.2s; }
        .emoji-display:hover { border-color:#e8773a; }
        .emoji-change { font-family:'DM Sans',sans-serif; font-size:0.8rem; color:#6a5c48; }
        .emoji-grid { position:absolute; top:calc(100% + 8px); left:0; background:#1a1610; border:1px solid #2e2820; border-radius:14px; padding:12px; display:grid; grid-template-columns:repeat(6,1fr); gap:6px; z-index:10; box-shadow:0 16px 40px rgba(0,0,0,0.5); }
        .emoji-opt { background:none; border:none; font-size:1.4rem; cursor:pointer; border-radius:8px; padding:4px; transition:background 0.15s; }
        .emoji-opt:hover { background:#2e2820; }
        .modal-footer { display:flex; gap:12px; justify-content:flex-end; padding:0 28px 24px; }
        .m-cancel { background:none; border:1.5px solid #2e2820; color:#6a5c48; font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:600; padding:10px 22px; border-radius:10px; cursor:pointer; transition:all 0.2s; }
        .m-cancel:hover { border-color:#6a5c48; color:#f5ede0; }
        .m-save { background:#e8773a; color:#fff; border:none; font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:700; padding:10px 26px; border-radius:10px; cursor:pointer; transition:background 0.2s, transform 0.18s cubic-bezier(0.34,1.56,0.64,1); }
        .m-save:hover { background:#d4692e; transform:scale(1.04); }
      `}</style>
    </div>
  );
}

export default function AdminMenuManager({ onLogout }) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const openNew = () => setEditing({ id: -1, name: "", category: "Biryani", price: 199, rating: 4.5, available: true, tag: "", emoji: "🍽️", desc: "" });

  const handleSave = (form) => {
    if (form.id === -1) {
      setItems((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Item added successfully!");
    } else {
      setItems((prev) => prev.map((it) => it.id === form.id ? form : it));
      showToast("Changes saved!");
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setDeleteId(null);
    showToast("Item deleted", "error");
  };

  const toggleAvail = (id) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, available: !it.available } : it));
  };

  const filtered = items.filter((it) => {
    const matchCat = filterCat === "All" || it.category === filterCat;
    const matchSearch = it.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = {
    total: items.length,
    active: items.filter((i) => i.available).length,
    categories: [...new Set(items.map((i) => i.category))].length,
    avgPrice: Math.round(items.reduce((s, i) => s + i.price, 0) / items.length),
  };

  return (
    <>
      <style>{styles}</style>

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.type === "success" ? "✓" : "✕"} {toast.msg}</div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="modal-overlay del-overlay" onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}>
          <div className="del-modal">
            <span className="del-icon">🗑️</span>
            <h3 className="del-title">Delete Item?</h3>
            <p className="del-sub">This action cannot be undone.</p>
            <div className="del-btns">
              <button className="m-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="del-confirm" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && <EditModal item={editing} onSave={handleSave} onClose={() => setEditing(null)} />}

      <div className="admin-page">
        {/* Sidebar */}
<aside className="sidebar">
  <div className="sidebar-brand">
    <span className="brand-icon">🍽️</span>
    <span className="brand-name">luscious</span>
  </div>

  <nav className="sidebar-nav">
    <a href="/admin/menu" className="nav-item active">
      📋 Menu
    </a>

    <a href="/admin/orders" className="nav-item">
      🛒 Orders
    </a>
  </nav>

  <button className="logout-btn" onClick={onLogout}>
    ← Logout
  </button>
</aside>

        {/* Main */}
        <main className="admin-main">
          {/* Top bar */}
          <div className="admin-topbar">
            <div>
              <h1 className="admin-title">Menu Manager</h1>
              <p className="admin-sub">Manage your menu items, prices & availability</p>
            </div>
            <button className="add-btn" onClick={openNew}>+ Add Item</button>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {[
              { label: "Total Items", val: stats.total, icon: "🍽️" },
              { label: "Active Items", val: stats.active, icon: "✅" },
              { label: "Categories", val: stats.categories, icon: "📂" },
              { label: "Avg. Price", val: `₹${stats.avgPrice}`, icon: "💰" },
            ].map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-icon">{s.icon}</span>
                <div>
                  <p className="stat-val">{s.val}</p>
                  <p className="stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <input
              className="search-input"
              placeholder="🔍  Search items…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="cat-filters">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  className={`cat-chip ${filterCat === c ? "active" : ""}`}
                  onClick={() => setFilterCat(c)}
                >{c}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table className="menu-table">
              <thead>
  <tr>
    <th>Item</th>
    <th>Category</th>
    <th>Actions</th>
  </tr>
</thead>
              <tbody>
  {filtered.map((item, idx) => (
    <tr
      key={item.id}
      style={{ animationDelay: `${idx * 0.04}s` }}
      className="table-row"
    >
      <td>
        <div className="item-cell">
          <span className="table-emoji">
            {item.emoji}
          </span>

          <div>
            <p className="table-name">
              {item.name}
            </p>

            <p className="table-desc">
              {item.desc.slice(0, 42)}…
            </p>
          </div>
        </div>
      </td>

      <td>
        <span className="table-cat">
          {item.category}
        </span>
      </td>

      <td>
        <div className="action-btns">
          <button
            className="action-edit"
            onClick={() => setEditing(item)}
          >
            ✏️ Edit
          </button>

          <button
            className="action-del"
            onClick={() => setDeleteId(item.id)}
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
            </table>
            {filtered.length === 0 && (
              <div className="table-empty">No items found matching your filters.</div>
            )}
          </div>

          <p className="table-count">Showing {filtered.length} of {items.length} items</p>
        </main>
      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  .admin-page { display:flex; min-height:100vh; background:#0f0d09; font-family:'DM Sans',sans-serif; }

  /* Sidebar */
  .sidebar { width:220px; background:#1a1610; border-right:1px solid #2e2820; padding:28px 20px; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; flex-shrink:0; }
  .sidebar-brand { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
  .brand-icon { font-size:1.4rem; }
  .brand-name { font-family:'Playfair Display',serif; font-size:1.3rem; color:#f5ede0; font-weight:700; }
  .sidebar-role { font-size:0.68rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#e8773a; margin-bottom:32px; }
  .sidebar-nav {
  display:flex;
  flex-direction:column;
  gap:8px;
  flex:1;
  margin-top:28px;
}
  .nav-item {
  padding:10px 14px;
  border-radius:10px;
  font-size:0.85rem;
  color:#6a5c48;
  cursor:pointer;
  transition:background 0.2s, color 0.2s;
  font-weight:500;
  text-decoration:none;
  display:flex;
  align-items:center;
  gap:8px;
}
  .nav-item:hover { background:#2e2820; color:#f5ede0; }
  .nav-item.active { background:#e8773a1a; color:#e8773a; font-weight:700; }
  .logout-btn { background:none; border:1.5px solid #2e2820; color:#6a5c48; font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:600; padding:10px 14px; border-radius:10px; cursor:pointer; transition:all 0.2s; margin-top:12px; }
  .logout-btn:hover { border-color:#e05252; color:#e05252; }

  /* Main */
  .admin-main { flex:1; padding:36px 36px 60px; overflow-x:auto; }

  .admin-topbar { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; }
  .admin-title { font-family:'Playfair Display',serif; font-size:1.8rem; color:#f5ede0; font-weight:700; }
  .admin-sub { color:#6a5c48; font-size:0.85rem; margin-top:4px; }

  .add-btn { background:#e8773a; color:#fff; border:none; border-radius:12px; padding:13px 24px; font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:700; cursor:pointer; transition:background 0.2s, transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s; white-space:nowrap; }
  .add-btn:hover { background:#d4692e; transform:scale(1.04); box-shadow:0 6px 20px rgba(232,119,58,0.35); }

  .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:28px; }
  .stat-card { background:#1a1610; border:1px solid #2e2820; border-radius:16px; padding:18px 20px; display:flex; align-items:center; gap:14px; transition:border-color 0.2s; }
  .stat-card:hover { border-color:#e8773a44; }
  .stat-icon { font-size:1.6rem; }
  .stat-val { font-family:'Playfair Display',serif; font-size:1.4rem; color:#f5ede0; font-weight:700; }
  .stat-label { font-size:0.72rem; color:#6a5c48; font-weight:500; margin-top:2px; }

  .filters-bar { display:flex; gap:16px; align-items:center; margin-bottom:20px; flex-wrap:wrap; }
  .search-input { background:#1a1610; border:1.5px solid #2e2820; border-radius:10px; padding:10px 16px; color:#f5ede0; font-family:'DM Sans',sans-serif; font-size:0.88rem; outline:none; width:220px; transition:border-color 0.2s; }
  .search-input:focus { border-color:#e8773a; }
  .search-input::placeholder { color:#3a3228; }
  .cat-filters { display:flex; gap:8px; flex-wrap:wrap; }
  .cat-chip { background:transparent; border:1.5px solid #2e2820; color:#6a5c48; font-family:'DM Sans',sans-serif; font-size:0.78rem; font-weight:600; padding:7px 14px; border-radius:50px; cursor:pointer; transition:all 0.2s; }
  .cat-chip:hover { border-color:#e8773a44; color:#f5ede0; }
  .cat-chip.active { background:#e8773a; border-color:#e8773a; color:#fff; }

  .table-wrap {
  background:#1a1610;
  border:1px solid #2e2820;
  border-radius:18px;
  overflow-x:auto;
  width:100%;
}
  .menu-table {
  width:100%;
  border-collapse:collapse;
  min-width:600px;
}
  .menu-table thead tr { border-bottom:1px solid #2e2820; }
  .menu-table th { padding:14px 18px; text-align:left; font-size:0.7rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#4a3c2c; }
  .table-row { border-bottom:1px solid #1e1c18; animation:rowIn 0.35s ease both; transition:background 0.15s; }
  .table-row:hover { background:#1f1c17; }
  .table-row:last-child { border-bottom:none; }
  @keyframes rowIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  .menu-table td { padding:14px 18px; vertical-align:middle; }

  .item-cell { display:flex; align-items:center; gap:12px; }
  .table-emoji { font-size:1.8rem; width:44px; height:44px; background:#0f0d09; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .table-name { font-weight:600; color:#f5ede0; font-size:0.9rem; }
  .table-desc { font-size:0.72rem; color:#4a3c2c; margin-top:2px; max-width:200px; }
  .table-cat { font-size:0.75rem; font-weight:600; color:#b89a70; background:#2e2820; padding:4px 10px; border-radius:20px; }
  .table-price { font-weight:700; color:#e8773a; font-size:0.95rem; }
  .table-rating { font-size:0.82rem; color:#c8bfb0; }
  .table-tag { background:#e8773a22; color:#e8773a; font-size:0.7rem; font-weight:700; padding:3px 10px; border-radius:20px; letter-spacing:0.04em; }
  .table-notag { color:#3a3228; font-size:0.8rem; }

  .action-btns {
  display:flex;
  gap:8px;
  align-items:center;
  flex-wrap:wrap;
}
  .action-edit { background:none; border:1.5px solid #2e2820; color:#b89a70; font-family:'DM Sans',sans-serif; font-size:0.78rem; font-weight:600; padding:7px 14px; border-radius:8px; cursor:pointer; transition:all 0.2s; }
  .action-edit:hover { border-color:#e8773a; color:#e8773a; background:#e8773a12; }
  .action-del { background:none; border:1.5px solid #2e2820; color:#4a3c2c; font-size:0.9rem; padding:7px 10px; border-radius:8px; cursor:pointer; transition:all 0.2s; }
  .action-del:hover { border-color:#e05252; color:#e05252; background:#e0525212; }

  .table-empty { text-align:center; padding:40px; color:#4a3c2c; font-size:0.9rem; }
  .table-count { color:#3a3228; font-size:0.78rem; margin-top:12px; }

  /* Delete modal */
  .del-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:200; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); }
  .del-modal { background:#1a1610; border:1px solid #2e2820; border-radius:20px; padding:40px 36px; text-align:center; max-width:340px; animation:modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes modalIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:none} }
  .del-icon { font-size:2.5rem; display:block; margin-bottom:12px; }
  .del-title { font-family:'Playfair Display',serif; font-size:1.3rem; color:#f5ede0; font-weight:700; margin-bottom:8px; }
  .del-sub { color:#6a5c48; font-size:0.85rem; margin-bottom:24px; }
  .del-btns { display:flex; gap:12px; justify-content:center; }
  .m-cancel { background:none; border:1.5px solid #2e2820; color:#6a5c48; font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:600; padding:10px 22px; border-radius:10px; cursor:pointer; transition:all 0.2s; }
  .m-cancel:hover { border-color:#6a5c48; color:#f5ede0; }
  .del-confirm { background:#e05252; color:#fff; border:none; font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:700; padding:10px 24px; border-radius:10px; cursor:pointer; transition:background 0.2s, transform 0.18s; }
  .del-confirm:hover { background:#c43a3a; transform:scale(1.04); }

  /* Toast */
  .toast { position:fixed; bottom:28px; right:28px; background:#1a1610; border:1px solid #2e2820; color:#f5ede0; font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:600; padding:14px 22px; border-radius:12px; z-index:300; animation:toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
  .toast-success { border-color:#2a9d6a; color:#2a9d6a; }
  .toast-error { border-color:#e05252; color:#e05252; }
  @keyframes toastIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }

  @media (max-width:900px) {
    .admin-page { flex-direction:column; }
    .sidebar { width:100%; height:auto; flex-direction:row; flex-wrap:wrap; position:relative; }
    .sidebar-nav { flex-direction:row; }
    .stats-row { grid-template-columns:repeat(2,1fr); }
    .admin-main { padding:20px; }
  }
    .menu-table th,
.menu-table td {
  padding:12px;
}

.table-name {
  font-size:0.82rem;
}

.table-desc {
  font-size:0.68rem;
}

.action-edit,
.action-del {
  width:100%;
  justify-content:center;
}

.item-cell {
  min-width:220px;
}
`;