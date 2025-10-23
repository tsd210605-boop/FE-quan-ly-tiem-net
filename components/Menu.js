import React from "react";

export default function Menu({ items, cart, setCart }) {
  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div>
      <h2>🍕 Menu Đồ Ăn & Thức Uống</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              width: "200px",
              background: "#f9f9f9",
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "130px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h4>{item.name}</h4>
            <p>{item.price.toLocaleString()} VND</p>
            <button onClick={() => addToCart(item)}>Thêm vào giỏ</button>
          </div>
        ))}
      </div>
    </div>
  );
}
