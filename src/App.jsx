import { useState } from "react";
import EditingArea from "./components/EditingArea";
import Keyboard from "./components/Keyboard";
import FontControls from './components/FontControls';
import TextEditor from "./components/TextEditor";
import TextDisplay from "./components/TextDisplay";

export default function App() {
  const [textDisplays, setTextDisplays] = useState([]); // holds list of text states
  const [selectedIndex, setSelectedIndex] = useState(null); // currently selected display

  // font settings for the selected display
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");

  const addTextDisplay = () => {
    if (textDisplays.length >= 5) return;
    const newText = [];
    setTextDisplays([...textDisplays, newText]);
    setSelectedIndex(textDisplays.length); // select the newly added one
  };

  const removeTextDisplay = (index) => {
    const updated = [...textDisplays];
    updated.splice(index, 1);
    setTextDisplays(updated);
    setSelectedIndex(null); // reset selection
  };

  const updateText = (newText) => {
    const updated = [...textDisplays];
    updated[selectedIndex] = newText;
    setTextDisplays(updated);
  };

  return (
    <div >
      <div>
        <button onClick={addTextDisplay} >
          Add TextDisplay
        </button>
        {selectedIndex !== null && (
          <button
            onClick={() => removeTextDisplay(selectedIndex)}
            
          >
            Remove Selected
          </button>
        )}
      </div>

      {/* Display all TextDisplays */}
      <div >
        {textDisplays.map((text, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`border p-2 rounded cursor-pointer ${
              selectedIndex === index ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <TextDisplay text={text} />
          </div>
        ))}
      </div>
      <FontControls 
        setFontFamily={setFontFamily} 
        setFontSize={setFontSize} 
        setColor={setColor} 
      />
      <TextEditor 
        text={selectedIndex !== null ? textDisplays[selectedIndex] : []} 
        setText={updateText}
        disabled={selectedIndex === null}
      />
      <Keyboard
        text={selectedIndex !== null ? textDisplays[selectedIndex] : []}
        setText={updateText}
        fontFamily={fontFamily}
        fontSize={fontSize}
        color={color}
        disabled={selectedIndex === null}
      />
    </div>
  );
}
