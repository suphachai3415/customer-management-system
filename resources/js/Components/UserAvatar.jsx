import React from "react";

export default function UserAvatar({ name = "U", size = 36 }) {
  const initial = name.charAt(0).toUpperCase();
  const bgColors = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];
  const colorIndex = initial.charCodeAt(0) % bgColors.length;
  const bgColor = bgColors[colorIndex];

  return (
    <div
      className="d-flex justify-content-center align-items-center rounded-circle text-white fw-semibold"
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        fontSize: size * 0.5,
        userSelect: "none",
      }}
    >
      {initial}
    </div>
  );
}
