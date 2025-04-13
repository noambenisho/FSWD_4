
// This component receives a `text` prop and displays it inside a styled div.
import PropTypes from 'prop-types';
import classes from '../CSS/TextDisplay.module.css';
import Toolbar from './Toolbar';

export default function TextDisplay(props) {
  const text = props.text;

  return (
    <div className={`${classes.container} ${props.isSelected ? classes.selected : ""}`}>
      <label htmlFor="body">Text display</label>
      <div className={classes.div}>
        {text.map((item, index) => (
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
      <Toolbar text={text} setText={props.setText} />
    </div>
  );
}

TextDisplay.PropTypes = {
  text: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string.isRequired,
      fontFamily: PropTypes.string,
      fontSize: PropTypes.string,
      color: PropTypes.string,
    })
  ).isRequired,
  setText: PropTypes.func.isRequired,
};
  