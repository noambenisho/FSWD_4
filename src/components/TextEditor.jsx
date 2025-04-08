import PropTypes from 'prop-types';
import classes from '../CSS/TextEditor.module.css';

export default function TextEditor(props) {
    const text = props.text;
    const setText = props.setText;

    return (
    <p className={classes["text-editor"]}>
      <label htmlFor="body">Text editor</label>
      <div className={classes["display-box"]}>
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
    </p>
    );
  }

  TextEditor.PropTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
}