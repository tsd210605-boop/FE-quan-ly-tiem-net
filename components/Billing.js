import React, { useState } from "react";

export default function Billing({ accounts, setAccounts, cart, setCart }) {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [result, setResult] = useState(null);

  const calculateTotal = () => {
    if (!selectedCustomer) {
      alert("Vui lòng chọn khách hàng!");
      return;
    }

    const customer = accounts.find((a) => a.id === Number(selectedCustomer));
    if (!customer) return;

    const computerCost = 5000; // tạm fix cứng 1h
    const foodCost = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = computerCost + foodCost;

    setResult({ customer, computerCost, foodCost, total });
  };

  const processPayment = () => {
    if (!result) {
      alert("Hãy tính tổng tiền trước!");
      return;
    }

    const { customer, total } = result;
    if (customer.balance < total) {
      alert("Số dư không đủ để thanh toán!");
      return;
    }

    if (window.confirm(`Xác nhận thanh toán ${total.toLocaleString()} VND?`)) {
      setAccounts(
        accounts.map((a) =>
          a.id === customer.id ? { ...a, balance: a.balance - total } : a
        )
      );
      setCart([]);
      setResult(null);
      setSelectedCustomer("");
      alert("Thanh toán thành công!");
    }
  };

  return (
    <div>
      <h2>💰 Thanh Toán</h2>
      <select
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
      >
        <option value="">-- Chọn khách hàng --</option>
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.name} - {acc.phone}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "20px" }}>
        {result && (
          <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            <p>Khách: {result.customer.name}</p>
            <p>Tiền máy: {result.computerCost.toLocaleString()} VND</p>
            <p>Tiền đồ ăn: {result.foodCost.toLocaleString()} VND</p>
            <h3>
              Tổng:{" "}
              <span style={{ color: "green" }}>
                {result.total.toLocaleString()} VND
              </span>
            </h3>
          </div>
        )}
      </div>

      <button onClick={calculateTotal} style={{ marginTop: "10px" }}>
        Tính tổng tiền
      </button>
      <button onClick={processPayment} style={{ marginTop: "10px" }}>
        Thanh toán
      </button>
    </div>
  );
}
