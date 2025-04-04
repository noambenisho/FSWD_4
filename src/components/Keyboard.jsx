import PropTypes from 'prop-types';
import { useState } from "react";
import { layouts } from "./keyboardLayouts";
import classes from "../CSS/Keyboard.module.css";

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
    <div className={classes["keyboard-container"]}>
      <div className={classes["language-buttons"]}>
        <button onClick={() => setLanguage("english")} className={classes["language-buttons"]}>EN</button>
        <button onClick={() => setLanguage("hebrew")} className={classes["language-buttons"]}>HE</button>
        <button onClick={() => setLanguage("emoji")} className={classes["language-buttons"]}>😀</button>
      </div>

      <div className={["classes.keyboard-layouts"]}>
        {layouts[language].map((row, rowIndex) => (
          <div key={rowIndex} className={["classes.keyboard-row"]}>
            {row.split(" ").map((char, index) => (
              <button 
                key={index} 
                onClick={() => handleKeyPress(char)}
                className={`${classes["keyboard-key"]} 
                ${char === "Space" ? classes.space : ""} 
                ${char === "⌫" ? classes.delete : ""} 
                ${char === "Caps" ? classes.capslock : ""}`
              }>
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
