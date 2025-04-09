import PropTypes from 'prop-types';
import { useState } from "react";
import { layouts } from "./keyboardLayouts";
import classes from "../CSS/Keyboard.module.css";

export default function Keyboard(props) {
  const { text, setText, fontFamily, fontSize, color, disabled } = props;


  const [language, setLanguage] = useState("english");
  const [capsLock, setCapsLock] = useState(false);

  const handleKeyPress = (char) => {
    if (disabled) return;

    if (char === "⌫") {
      setText(text.slice(0, -1));
    } else if (char === "Space") {
      setText(text + " ");
    } else if (char === "Caps") {
      setCapsLock(!capsLock);
    } else {
      const newChar = {
        char: capsLock && language === "english" ? char.toUpperCase() : char,
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: color
      };
      setText([...text, newChar]);
      
    }
  };

  return (
    <div className={`${classes["keyboard-container"]} ${disabled ? classes["disabled"] : ""}`}>
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

Keyboard.propTypes = {
  text: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string.isRequired,
      fontFamily: PropTypes.string.isRequired,
      fontSize: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  setText: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
