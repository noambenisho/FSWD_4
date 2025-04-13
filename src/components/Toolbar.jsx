import PropTypes from 'prop-types';
import classes from '../CSS/Toolbar.module.css';

export default function Toolbar(props) {
    const text = props.text;
    const setText = props.setText;

    return (
      <div className={classes["toolbar"]}>
        <button type="button" onClick={() => setText([])} className={classes["clear-button"]}>
          Clear
        </button>
        <button type="button" 
            onClick={() => {
                const savedList = JSON.parse(localStorage.getItem("savedTextList")) || [];
                savedList.push({ 
                  savedAt: new Date().toISOString(),
                  content: text
                });                
                localStorage.setItem("savedTextList", JSON.stringify(savedList));
              }}
            className={classes["save-button"]}>
          Save
        </button>
      </div>
    );
  }
  
Toolbar.PropTypes = {
    text: PropTypes.array.isRequired,
    setText: PropTypes.func.isRequired,
}
