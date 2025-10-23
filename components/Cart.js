import React from "react";

export default function Cart({ cart, setCart }) {
  const removeItem = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>🛒 Giỏ Hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} x{item.quantity} ={" "}
              {(item.price * item.quantity).toLocaleString()} VND
              <button
                onClick={() => removeItem(item.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>
        <strong>Tổng cộng: {total.toLocaleString()} VND</strong>
      </p>
      {cart.length > 0 && <button onClick={clearCart}>Xóa giỏ hàng</button>}
    </div>
  );
}
