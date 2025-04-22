import React from "react";
import styles from "../CSS/FontControls.module.css";
import PropTypes from 'prop-types';

export default function FontControls(props) {
  const {selectedIndex, selectedRange, textDisplays, setTextDisplays, history, setHistory, setFontFamily, setFontSize, color, setColor} = props;
  // Apply font style changes to the selected text range
  const applyStyle = (key, value) => {
    if (selectedIndex === null || !selectedRange) return;

    const updated = [...textDisplays];
    const text = [...updated[selectedIndex].text];

    // Save the current state to history before applying the font change
    const updatedHistory = [...history];
    updatedHistory[selectedIndex].push(textDisplays[selectedIndex].text);

    for (let i = selectedRange.start; i <= selectedRange.end; i++) {
      text[i] = { ...text[i], [key]: value };
    }

    updated[selectedIndex].text = text;

    // Update the state with new font and text values, and history
    setTextDisplays(updated);
    setHistory(updatedHistory);
  };

  const handleStyleChange = (key, value, setDefault) => {
    if (selectedRange) {
      applyStyle(key, value); // Apply the font style change
    }
    setDefault(value); // Update the default value for the next characters
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Font Controls</h3>

        <label>Font:</label>
        <button onClick={() => handleStyleChange("fontFamily", "Arial", setFontFamily)}>Arial</button>
        <button onClick={() => handleStyleChange("fontFamily", "Courier New", setFontFamily)}>Courier</button>
        <button onClick={() => handleStyleChange("fontFamily", "Georgia", setFontFamily)}>Georgia</button>

        <label>Size:</label>
        <button onClick={() => handleStyleChange("fontSize", "14px", setFontSize)}>Small</button>
        <button onClick={() => handleStyleChange("fontSize", "18px", setFontSize)}>Medium</button>
        <button onClick={() => handleStyleChange("fontSize", "24px", setFontSize)}>Large</button>

        <label>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            handleStyleChange("color", e.target.value, setColor);
          }}
        />
      </div>
    </div>
  );
}

FontControls.propTypes = {
  selectedIndex: PropTypes.number,
  selectedRange: PropTypes.object,
  textDisplays: PropTypes.array.isRequired,
  setTextDisplays: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
  setHistory: PropTypes.func.isRequired,
  setFontFamily: PropTypes.func.isRequired,
  setFontSize: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};
