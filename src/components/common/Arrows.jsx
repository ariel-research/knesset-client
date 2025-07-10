export const ArrowButton = ({ direction, active, onClick }) => {
  const color = active ? "#000000" : "#bbb";
  const rotate = direction === "up" ? "0deg" : "180deg";

  return (
    <div
      onClick={onClick}
      style={{
        width: "16px",
        height: "16px",
        transform: `rotate(${rotate})`,
        cursor: "pointer",
        display: "flex",
      }}
    >
      <svg
        viewBox="0 0 24 16"

        fill={color}
        style={{ display: "block" }}
      >
        <path d="M12 8L6 16H18L12 8Z" />
      </svg>
    </div>
  );
};
