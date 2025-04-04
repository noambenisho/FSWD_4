import PropTypes from 'prop-types';
import { useState } from "react";
import { layouts } from "./keyboardLayouts";
import "../CSS/Keyboard.css";

export default function Keyboard(props) {
  const text = props.text;
  const setText = props.setText;

  const [language, setLanguage] = useState("english");
  const [capsLock, setCapsLock] = useState(false);

  const handleKeyPress = (char) => {
    if (char === "⌫") {
      setText(text.slice(0, -1));
    } else if (char === "Space") {
      setText(text + " ");
    } else if (char === "Caps") {
      setCapsLock(!capsLock);
    } else {
      setText(text + (capsLock && language === "english" ? char.toUpperCase() : char));
    }
  };

  return (
    <div className="keyboard-container">
      <div className="language-buttons">
        <button onClick={() => setLanguage("english")} className="lang-button">EN</button>
        <button onClick={() => setLanguage("hebrew")} className="lang-button">HE</button>
        <button onClick={() => setLanguage("emoji")} className="lang-button">😀</button>
      </div>

      <div className="keyboard-layout">
        {layouts[language].map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.split(" ").map((char, index) => (
              <button 
                key={index} 
                onClick={() => handleKeyPress(char)}
                className={`keyboard-key ${char === "Space" ? "space" : ""} ${char === "⌫" ? "delete" : ""} ${char === "Caps" ? "capslock" : ""}`}
              >
                {char === "Space" ? "␣" : capsLock && language === "english" ? char.toUpperCase() : char}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
// This component renders a keyboard interface with buttons for each character.
// It allows the user to type in different languages (English, Hebrew, Emoji) and includes a Caps Lock feature.

Keyboard.PropTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
}
