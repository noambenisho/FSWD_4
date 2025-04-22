import PropTypes from 'prop-types';
import styles from '../CSS/Toolbar.module.css';

export default function Toolbar(props) {
    const {text, setText, onSave} = props;

    return (
      <div className={styles["toolbar"]}>
        <button type="button" onClick={() => setText([])} className={styles["clear-button"]}>
          Clear
        </button>
        <button type="button" onClick={onSave} className={styles["save-button"]}>
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
