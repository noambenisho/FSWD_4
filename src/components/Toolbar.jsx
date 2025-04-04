import PropTypes from 'prop-types';
import classes from '../CSS/Toolbar.module.css';

export default function Toolbar(props) {
    const text = props.text;
    const setText = props.setText;

    return (
      <div className={classes["toolbar"]}>
        <button onClick={() => setText("")} className={classes["clear-button"]}>
          Clear
        </button>
        <button onClick={() => localStorage.setItem("savedText", text)} className={classes["save-button"]}>
          Save
        </button>
      </div>
    );
  }
  
Toolbar.PropTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
}
