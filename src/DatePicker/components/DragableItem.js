import React from "react";

function DraggableItem({ text }) {
  const handleDragStart = (e) => {
    // Especifica què es pot passar quan s'arrossega
    e.dataTransfer.setData("text/plain", text);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        width: "80px",
        height: "80px",
        backgroundColor: "#4da6ff",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        cursor: "grab",
        margin: "5px",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
}

export default DraggableItem;
