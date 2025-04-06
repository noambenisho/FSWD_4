import React, { useState } from "react";
import styles from "../CSS/FontControls.module.css";

export default function FontControls() {
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");

  return (
    <div className={styles.container}>
      {/* Controls */}
      <div className={styles.controls}>
        <h3>Font Controls</h3>

        {/* Font Family */}
        <label>Font:</label>
        <button className={styles.button} onClick={() => setFontFamily("Arial")}>Arial</button>
        <button className={styles.button} onClick={() => setFontFamily("Courier New")}>Courier</button>
        <button className={styles.button} onClick={() => setFontFamily("Georgia")}>Georgia</button>

        {/* Font Size */}
        <label className={styles.label}>Size:</label>
        <button className={styles.button} onClick={() => setFontSize("14px")}>Small</button>
        <button className={styles.button} onClick={() => setFontSize("18px")}>Medium</button>
        <button className={styles.button} onClick={() => setFontSize("24px")}>Large</button>

        {/* Text Color */}
        <label className={styles.label}>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      {/* Text Area */}
      <textarea
        rows={5}
        className={styles.textarea}
        style={{ fontFamily, fontSize, color }}
        placeholder="Type something..."
      />
    </div>
  );
}
