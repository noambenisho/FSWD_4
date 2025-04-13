
// This component receives a `text` prop and displays it inside a styled div.
import PropTypes from 'prop-types';
import classes from '../CSS/TextDisplay.module.css';
import Toolbar from './Toolbar';

export default function TextDisplay(props) {
  const { text, setText, isSelected } = props;

  return (
    <div className={`${classes.container} ${isSelected ? classes.selected : ""}`}>
      <label htmlFor="body">{text.title}</label>
      <div className={classes.div}>
        {Array.isArray(text.text) && text.text.map((item, index) => (
          <span
            key={index}
            style={{
              fontFamily: item.fontFamily,
              fontSize: item.fontSize,
              color: item.color
            }}
          >
            {item.char}
          </span>
        ))}
      </div>
      <Toolbar text={text.text} setText={(newText) => setText({ ...text, text: newText })} />
    </div>
  );
}

TextDisplay.PropTypes = {
  text: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.arrayOf(
      PropTypes.shape({
        char: PropTypes.string.isRequired,
        fontFamily: PropTypes.string,
        fontSize: PropTypes.string,
        color: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  setText: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
