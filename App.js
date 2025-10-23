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
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { id: 1, name: "Mì Tôm", price: 15000, image: "/images/mitom.jpg" },
    { id: 2, name: "Bánh Mì", price: 25000, image: "/images/banhmi.jpg" },
    { id: 3, name: "Cơm Rang", price: 35000, image: "/images/comrang.jpg" },
    { id: 4, name: "Phở Bò", price: 45000, image: "/images/phobo.jpg" },
    { id: 5, name: "Coca Cola", price: 15000, image: "/images/coca.jpg" },
    { id: 6, name: "Pepsi", price: 15000, image: "/images/pessi.jpg" },
    { id: 7, name: "Nước Suối", price: 10000, image: "/images/nuoc.jpg" },
    { id: 8, name: "Cà Phê", price: 20000, image: "/images/caphe.jpg" },
    { id: 9, name: "Sting", price: 10000, image: "/images/sting.jpg" },
  ];

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "123456") {
      setCurrentUser(username);
      return true;
    }
    return false;
  };

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
            <div className="header-buttons">
              <button onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? "Ẩn Menu 🍔" : "Hiện Menu 🍔"}
              </button>
              <button onClick={handleLogout}>Đăng xuất</button>
            </div>
          </header>

          {/* Nội dung */}
          <div className="content">
            <div className="left-column">
              <Computers computers={computers} setComputers={setComputers} />
              <Accounts accounts={accounts} setAccounts={setAccounts} />
              <Billing
                accounts={accounts}
                setAccounts={setAccounts}
                cart={cart}
                setCart={setCart}
              />
            </div>

            {showMenu && (
              <div className="right-column">
                <Menu items={menuItems} cart={cart} setCart={setCart} />
                <Cart cart={cart} setCart={setCart} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
