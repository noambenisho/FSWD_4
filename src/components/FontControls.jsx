import React, { useState } from "react";
import styles from "../CSS/FontControls.module.css";

export default function FontControls(props) {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Font Controls</h3>

        <label>Font:</label>
        <button onClick={() => props.setFontFamily("Arial")}>Arial</button>
        <button onClick={() => props.setFontFamily("Courier New")}>Courier</button>
        <button onClick={() => props.setFontFamily("Georgia")}>Georgia</button>

        <label>Size:</label>
        <button onClick={() => props.setFontSize("14px")}>Small</button>
        <button onClick={() => props.setFontSize("18px")}>Medium</button>
        <button onClick={() => props.setFontSize("24px")}>Large</button>

        <label>Color:</label>
        <input
          type="color"
          value={props.color}
          onChange={(e) => props.setColor(e.target.value)}
        />
      </div>
    </div>
  );
}
