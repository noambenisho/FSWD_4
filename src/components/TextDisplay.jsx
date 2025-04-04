// This component receives a `text` prop and displays it inside a styled div.
// The `className` prop is used to apply Tailwind CSS classes for styling. 
import PropTypes from 'prop-types';

export default function TextDisplay(props) {
    const text = props.text;
    return <div className="p-4 border rounded bg-gray-100">{text}</div>;
  }
 
  TextDisplay.PropTypes = {
    text: PropTypes.string.isRequired,
  }