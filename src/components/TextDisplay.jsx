
// This component receives a `text` prop and displays it inside a styled div.
import PropTypes from 'prop-types';
import classes from '../CSS/TextDisplay.module.css';

export default function TextDisplay(props) {
    const text = props.text;
    return  (
    <>
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
    </>);
  }  
 
  TextDisplay.PropTypes = {
    text: PropTypes.string.isRequired,
  }