import React, { useState } from "react";

export default function Accounts({ accounts, setAccounts }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deposit, setDeposit] = useState("");

  // Tạo tài khoản mới
  const createAccount = () => {
    if (!name || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (accounts.find((acc) => acc.phone === phone)) {
      alert("Số điện thoại đã tồn tại!");
      return;
    }
    const account = {
      id: Date.now(),
      name,
      phone,
      balance: parseFloat(deposit) || 0,
      playTime: 0,
      orders: [],
      createdAt: new Date(),
    };
    setAccounts([...accounts, account]);
    setName("");
    setPhone("");
    setDeposit("");
  };

  // Nạp tiền
  const addBalance = (id) => {
    const amount = prompt("Nhập số tiền cần nạp:");
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      setAccounts(
        accounts.map((acc) =>
          acc.id === id
            ? { ...acc, balance: acc.balance + parseFloat(amount) }
            : acc
        )
      );
    }
  };

  // Xóa tài khoản
  const deleteAccount = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };

  return (
    <div>
      <h2>👤 Quản Lý Tài Khoản</h2>
      <input
        type="text"
        placeholder="Tên khách hàng"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Số tiền nạp"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
      />
      <br />
      <button onClick={createAccount}>Tạo Tài Khoản</button>

      <h3>Danh sách tài khoản</h3>
      {accounts.length === 0 ? (
        <p>Chưa có tài khoản nào</p>
      ) : (
        <table border="1" width="100%" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>SĐT</th>
              <th>Số dư</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.name}</td>
                <td>{acc.phone}</td>
                <td>{acc.balance.toLocaleString()} VND</td>
                <td>
                  <button onClick={() => addBalance(acc.id)}>Nạp tiền</button>
                  <button onClick={() => deleteAccount(acc.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
