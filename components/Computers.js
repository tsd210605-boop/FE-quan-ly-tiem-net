import React from "react";

export default function Computers({ computers, setComputers }) {
  const PRICE_PER_HOUR = 5000;

  // Bắt đầu sử dụng máy
  const assignComputer = (id) => {
    const customerName = prompt("Nhập tên khách hàng:");
    if (customerName) {
      setComputers(
        computers.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "occupied",
                customer: customerName,
                startTime: Date.now(),
                endTime: null,
              }
            : c
        )
      );
    }
  };

  // Kết thúc sử dụng máy
  const releaseComputer = (id) => {
    const computer = computers.find((c) => c.id === id);
    if (!computer || !computer.startTime) return;

    const endTime = Date.now();
    const playTime = Math.ceil((endTime - computer.startTime) / (1000 * 60 * 60)); // giờ
    const cost = playTime * PRICE_PER_HOUR;

    alert(
      `Khách hàng: ${computer.customer}\nThời gian chơi: ${playTime} giờ\nTiền máy: ${cost.toLocaleString()} VND`
    );

    setComputers(
      computers.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "available",
              customer: null,
              startTime: null,
              endTime: null,
            }
          : c
      )
    );
  };

  return (
    <div>
      <h2>💻 Quản Lý Máy Tính</h2>
      <p>Giá: {PRICE_PER_HOUR.toLocaleString()} VND/giờ</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {computers.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              width: "150px",
              background: c.status === "available" ? "#c8e6c9" : "#ffe082",
            }}
          >
            <h4>Máy {c.id}</h4>
            {c.status === "available" ? (
              <>
                <p>Trống</p>
                <button onClick={() => assignComputer(c.id)}>Bắt đầu</button>
              </>
            ) : (
              <>
                <p>
                  Đang dùng<br />
                  {c.customer}
                </p>
                <small>
                  Bắt đầu:{" "}
                  {new Date(c.startTime).toLocaleTimeString("vi-VN")}
                </small>
                <br />
                <button onClick={() => releaseComputer(c.id)}>Kết thúc</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
