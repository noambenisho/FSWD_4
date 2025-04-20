import PropTypes from 'prop-types';
import classes from '../CSS/Toolbar.module.css';

export default function Toolbar(props) {
    const {text, setText, onSave} = props;

    return (
      <div className={classes["toolbar"]}>
        <button type="button" onClick={() => setText([])} className={classes["clear-button"]}>
          Clear
        </button>
        <button type="button" onClick={onSave} className={classes["save-button"]}>
          Save
        </button>
      </div>
    );
  }
  
Toolbar.propTypes = {
    text: PropTypes.array.isRequired,
    setText: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
}
