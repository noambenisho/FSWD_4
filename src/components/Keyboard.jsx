import PropTypes from 'prop-types';
import { useState } from "react";
import { layouts } from "./keyboardLayouts";
import styles from "../CSS/Keyboard.module.css";

export default function Keyboard(props) {
  const { text, setText, fontFamily, fontSize, color, disabled, typingTarget, setSearchQuery, searchQuery, setReplaceQuery, replaceQuery, setSearchResults, setSearchMessage } = props;


  const [language, setLanguage] = useState("english");
  const [capsLock, setCapsLock] = useState(false);

  const handleKeyPress = (char) => {
    if (disabled) return;
  
    if (char === "⌫") {
      if (typingTarget === "search") {
        setSearchQuery(searchQuery.slice(0, -1));
        setSearchResults([]);
        setSearchMessage("");
      } else if (typingTarget === "replace") {
        setReplaceQuery(replaceQuery.slice(0, -1));
      } else {
        setText(text.slice(0, -1));
      }
    } else if (char === "Space") {
      const spaceChar = {
        char: " ",
        fontFamily,
        fontSize,
        color
      };
      if (typingTarget === "editor") {
        setText([...text, spaceChar]);
      }
    } else if (char === "Caps") {
      setCapsLock(!capsLock);
    } else {
      const actualChar = capsLock && language === "english" ? char.toUpperCase() : char;
      if (typingTarget === "search") {
        if (searchQuery.length < 1) setSearchQuery(searchQuery + actualChar);
      } else if (typingTarget === "replace") {
        if (replaceQuery.length < 1) setReplaceQuery(replaceQuery + actualChar);
      } else {
        const newChar = {
          char: actualChar,
          fontFamily,
          fontSize,
          color
        };
        setText([...text, newChar]);
      }
    }
  };
  

  return (
    <div className={`${styles["keyboard-container"]} ${disabled ? styles["disabled"] : ""}`}>
      <div className={styles["language-buttons"]}>
        <button onClick={() => setLanguage("english")} className={styles["language-buttons"]}>EN</button>
        <button onClick={() => setLanguage("hebrew")} className={styles["language-buttons"]}>HE</button>
        <button onClick={() => setLanguage("emoji")} className={styles["language-buttons"]}>😀</button>
      </div>

      <div className={styles["keyboard-layouts"]}>
        {layouts[language].map((row, rowIndex) => (
          <div key={rowIndex} className={styles["keyboard-row"]}>
            {row.split(" ").map((char, index) => (
              <button 
                key={index} 
                onClick={() => handleKeyPress(char)}
                className={`${styles["keyboard-key"]} 
                ${char === "Space" ? styles.space : ""} 
                ${char === "⌫" ? styles.delete : ""} 
                ${char === "Caps" ? styles.capslock : ""}`
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
