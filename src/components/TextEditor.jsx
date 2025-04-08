import PropTypes from 'prop-types';
import classes from '../CSS/TextEditor.module.css';

export default function TextEditor(props) {
    const text = props.text;
    const setText = props.setText;

    return (
    <p className={classes["text-editor"]}>
      <label htmlFor="body">Text editor</label>
      <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      required rows={3}/>
    </p>
    );
  }

  TextEditor.PropTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
}