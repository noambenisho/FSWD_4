
// This component receives a `text` prop and displays it inside a styled div.
import PropTypes from 'prop-types';
import classes from '../CSS/TextDisplay.module.css';
import Toolbar from './Toolbar';

export default function TextDisplay(props) {
  const{ text, setText, index, isSelected, selectedRange, setSelectedRange, onSave, searchResults = [], updateText } = props;
  const highlightIndices = new Set(searchResults.map(r => r.charIndex));
  // Add event listeners for mouse events to handle text selection
  const handleMouseUp = () => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;
  
      const anchorSpan = selection.anchorNode?.parentElement; 
      const focusSpan = selection.focusNode?.parentElement;
  
      if (anchorSpan?.dataset?.index == null || focusSpan?.dataset?.index == null) return;
  
      const start = Math.min(Number(anchorSpan.dataset.index), Number(focusSpan.dataset.index));
      const end = Math.max(Number(anchorSpan.dataset.index), Number(focusSpan.dataset.index));
  
      setSelectedRange({ start, end });
    }, 0); // Delay to ensure selection is updated
  };
  
  const handleDelete = () => {
    if (selectedRange && updateText) {
      const { start, end } = selectedRange;
      const updatedText = text.text.filter((_, i) => i < start || i > end);
      updateText(updatedText);
      setSelectedRange(null);
    }
  };

  return (
    <div className={`${classes.container} ${isSelected ? classes.selected : ""}`}>
      <label htmlFor="body">{text.title}</label>
      <div className={classes.div} onMouseUp={handleMouseUp}>
        {Array.isArray(text.text) && text.text.map((item, index) => (
          <span
            key={index}
            data-index={index}
            style={{
              fontFamily: item.fontFamily,
              fontSize: item.fontSize,
              color: item.color,
              backgroundColor: highlightIndices.has(index) ? 'yellow' : 'transparent'
            }}
          >
            {item.char}
          </span>
        ))}
      </div>
      <button onClick={handleDelete} className={classes.deleteButton}>
        Delete Selected Text
      </button>
      <Toolbar text={text.text} setText={(newText) => setText({ ...text, text: newText })} onSave={onSave} />
    </div>
  );
}

TextDisplay.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.arrayOf(
      PropTypes.shape({
        char: PropTypes.string.isRequired,
        fontFamily: PropTypes.string,
        fontSize: PropTypes.string,
        color: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  setText: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
