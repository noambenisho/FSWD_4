import { useState } from "react";
import Keyboard from "./Keyboard";
import FontControls from './FontControls';
import TextEditor from "./TextEditor";
import TextDisplay from "./TextDisplay";
import SavedListPanel from './SavedListPanel';
import '../CSS/SavedListPanel.module.css';
import classes from '../CSS/MainPage.module.css'

export default function App() {
  //const username = localStorage.getItem('currentUser');
  const [textDisplays, setTextDisplays] = useState([]); // holds list of text states
  const [selectedIndex, setSelectedIndex] = useState(null); // currently selected display
  const [temp, setTemp] = useState(1); 
  const [savedTitles, setSavedTitles] = useState(() => JSON.parse(localStorage.getItem("savedTextList")) || []);

  // font settings for the selected display
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");

  const addTextDisplay = () => {
    if (textDisplays.length >= 5) return;
    setTemp(temp + 1);
    const newDisplay = { title: `#${temp}`, text: [] };
    setTextDisplays([...textDisplays, newDisplay]);
    setSelectedIndex(textDisplays.length);
  };

  const removeTextDisplay = (index) => {
    const shouldSave = window.confirm("Do you want to save this text before closing?");
    if (shouldSave) {
      const savedList = JSON.parse(localStorage.getItem("savedTextList")) || [];
      const currentItem = textDisplays[index];
  
      // Check if the item already exists in the saved list
      const existingIndex = savedList.findIndex(item => item.content.title === currentItem.title);
  
      let updatedSaved;
      if (existingIndex !== -1) { // if it exists, update it
        savedList[existingIndex] = {
          savedAt: new Date().toISOString(),
          content: currentItem
        };
        updatedSaved = [...savedList];
      } else { // if it doesn't exist, add it
        updatedSaved = [...savedList, {
          savedAt: new Date().toISOString(),
          content: currentItem
        }];
      }
  
      localStorage.setItem("savedTextList", JSON.stringify(updatedSaved));
      setSavedTitles(updatedSaved);
    }
  
    const updated = [...textDisplays];
    updated.splice(index, 1);
    setTextDisplays(updated);
    setSelectedIndex(null);
  };
  
  const updateText = (newText) => {
    const updated = [...textDisplays];
    updated[selectedIndex].text = newText;
    setTextDisplays(updated);
  };

  const updateTextAtIndex = (index, newText) => {
    const updated = [...textDisplays];
    updated[index] = newText;
    setTextDisplays(updated);
  };

  const handleRestore = (textObject) => {
    const updated = [...textDisplays, textObject];
    setTextDisplays(updated);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', direction: 'ltr' }}>
      <div style={{ flex: 1 }}>
        <div>
          <button onClick={addTextDisplay} >
          Add TextDisplay
          </button>
          {selectedIndex !== null && (
            <button onClick={() => removeTextDisplay(selectedIndex)}>
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
              <TextDisplay 
                text={text} 
                setText={(newText) => updateTextAtIndex(index, newText)} 
                index={index}
                isSelected={selectedIndex === index}
              />
            </div>
          ))}
        </div>
        <FontControls 
          setFontFamily={setFontFamily} 
          setFontSize={setFontSize} 
          setColor={setColor} 
        />
        <TextEditor 
          text={selectedIndex !== null ? textDisplays[selectedIndex].text : []} 
        setText={updateText}
          disabled={selectedIndex === null}
        />
        <Keyboard
          text={selectedIndex !== null ? textDisplays[selectedIndex].text : []}
        setText={updateText}
        fontFamily={fontFamily}
        fontSize={fontSize}
        color={color}
          disabled={selectedIndex === null}
        />
      </div>

      <div style={{ justifyItems: 'center', width: '200px', padding: '1rem' }}>
        <SavedListPanel savedTitles={savedTitles} setSavedTitles={setSavedTitles} onRestore={handleRestore} />
      </div>
    </div>
  );
}
