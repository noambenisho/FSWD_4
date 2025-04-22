import PropTypes from 'prop-types';
import styles from '../CSS/TextEditor.module.css';

export default function TextEditor(props) {
  const { text, setText, disabled, setTypingTarget } = props;

  return (
    <div className={styles["text-editor"]}>
      <label htmlFor="body">Text editor</label>
      <div
        className={`${styles["display-box"]} ${disabled ? styles["disabled"] : ""}`}
        onClick={() => {
          if (setTypingTarget) setTypingTarget("editor");
        }}
      >
        {text.map((item, index) => (
          <span
            key={index}
            style={{
              fontFamily: item.fontFamily,
              fontSize: item.fontSize,
              color: item.color,
            }}
          >
            {item.char}
          </span>
        ))}
      </div>
    </div>
  );
}

TextEditor.propTypes = {
  text: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string.isRequired,
      fontFamily: PropTypes.string.isRequired,
      fontSize: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  setText: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  setTypingTarget: PropTypes.func, 
};
