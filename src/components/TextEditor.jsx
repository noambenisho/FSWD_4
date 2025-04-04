import PropTypes from 'prop-types';

export default function TextEditor(props) {
    const text = props.text;
    const setText = props.setText;

    return (
    <p>
      <label htmlFor="body">Text</label>
      <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      required rows={3}
      />   
    </p>
    );
  }
  

  TextEditor.PropTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
}