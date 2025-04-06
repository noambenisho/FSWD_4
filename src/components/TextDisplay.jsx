
// This component receives a `text` prop and displays it inside a styled div.
import PropTypes from 'prop-types';
import classes from '../CSS/TextDisplay.module.css';

export default function TextDisplay(props) {
    const text = props.text;
    return  (
    <>
    <label htmlFor="body">Text display</label>
    <div className={classes.div}>{text}</div> 
    </>);
  }
 
  TextDisplay.PropTypes = {
    text: PropTypes.string.isRequired,
  }