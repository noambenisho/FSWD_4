import React from "react";
import styles from "../CSS/FontControls.module.css";

export default function FontControls(props) {
  const applyStyle = (key, value) => {
    if (props.selectedIndex === null || !props.selectedRange) return;

    const updated = [...props.textDisplays];
    const text = [...updated[props.selectedIndex].text];

    for (let i = props.selectedRange.start; i <= props.selectedRange.end; i++) {
      text[i] = { ...text[i], [key]: value }; // Update the style for the selected range
    }

    updated[props.selectedIndex].text = text;
    props.setTextDisplays(updated);
  };

  const handleStyleChange = (key, value, setDefault) => {
    if (props.selectedRange) { 
      applyStyle(key, value); 
    }
    setDefault(value); // Update the default value for the next characters
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Font Controls</h3>

        <label>Font:</label>
        <button onClick={() => handleStyleChange("fontFamily", "Arial", props.setFontFamily)}>Arial</button>
        <button onClick={() => handleStyleChange("fontFamily", "Courier New", props.setFontFamily)}>Courier</button>
        <button onClick={() => handleStyleChange("fontFamily", "Georgia", props.setFontFamily)}>Georgia</button>

        <label>Size:</label>
        <button onClick={() => handleStyleChange("fontSize", "14px", props.setFontSize)}>Small</button>
        <button onClick={() => handleStyleChange("fontSize", "18px", props.setFontSize)}>Medium</button>
        <button onClick={() => handleStyleChange("fontSize", "24px", props.setFontSize)}>Large</button>

        <label>Color:</label>
        <input
          type="color"
          value={props.color}
          onChange={(e) => {
            handleStyleChange("color", e.target.value, props.setColor);
          }}
        />
      </div>
    </div>
  );
}