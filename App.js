
import React, { useState } from "react";
import Login from "./components/Login";
import Accounts from "./components/Accounts";
import Computers from "./components/Computers";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Billing from "./components/Billing";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("computers"); // tab mặc định
  const [accounts, setAccounts] = useState([]);
  const [computers, setComputers] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      status: "available",
      customer: null,
      startTime: null,
      endTime: null,
    }))
  );
  const [cart, setCart] = useState([]);

  const menuItems = [
    { id: 1, name: "Mì Tôm", price: 15000, image: "/images/mitom.jpg" },
    { id: 2, name: "Bánh Mì", price: 25000, image: "/images/banhmi.jpg" },
    { id: 3, name: "Cơm Rang", price: 35000, image: "/images/comrang.jpg" },
    { id: 4, name: "Phở Bò", price: 45000, image: "/images/phobo.jpg" },
    { id: 5, name: "Coca Cola", price: 15000, image: "/images/coca.jpg" },
    { id: 6, name: "Pepsi", price: 15000, image: "/images/pepssi.jpg" },
    { id: 7, name: "Nước Suối", price: 10000, image: "/images/nuoc.jpg" },
    { id: 8, name: "Cà Phê", price: 20000, image: "/images/caphe.jpg" },
    { id: 9, name: "Sting", price: 10000, image: "/images/sting.jpg" },
  ];

  // --- Đăng nhập ---
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "123456") {
      setCurrentUser(username);
      return true;
    }
    return false;
  };

  // --- Đăng xuất ---
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="main-layout">
          {/* Header */}
          <header className="header-bar">
            <h2>🎮 Xin chào {currentUser}</h2>
            <button onClick={handleLogout} className="btn btn-logout">
              Đăng xuất
            </button>
          </header>

          {/* Thanh điều hướng tab */}
          <nav className="nav-tabs">
            <button
              className={activeTab === "accounts" ? "active" : ""}
              onClick={() => setActiveTab("accounts")}
            >
              👤 Tài Khoản
            </button>
            <button
              className={activeTab === "computers" ? "active" : ""}
              onClick={() => setActiveTab("computers")}
            >
              💻 Máy Tính
            </button>
            <button
              className={activeTab === "menu" ? "active" : ""}
              onClick={() => setActiveTab("menu")}
            >
              🍕 Menu
            </button>
            <button
              className={activeTab === "billing" ? "active" : ""}
              onClick={() => setActiveTab("billing")}
            >
              💰 Thanh Toán
            </button>
          </nav>

          {/* Nội dung từng tab */}
          <div className="content">
            {activeTab === "accounts" && (
              <Accounts accounts={accounts} setAccounts={setAccounts} />
            )}

            {activeTab === "computers" && (
              <Computers computers={computers} setComputers={setComputers} />
            )}

            {activeTab === "menu" && (
              <>
                <Menu items={menuItems} cart={cart} setCart={setCart} />
                <Cart cart={cart} setCart={setCart} />
              </>
            )}

            {activeTab === "billing" && (
              <Billing
                accounts={accounts}
                setAccounts={setAccounts}
                cart={cart}
                setCart={setCart}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
