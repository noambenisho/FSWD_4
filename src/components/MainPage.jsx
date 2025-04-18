import { useState } from "react";
import Keyboard from "./Keyboard";
import FontControls from './FontControls';
import TextEditor from "./TextEditor";
import TextDisplay from "./TextDisplay";
import SavedListPanel from './SavedListPanel';
import '../CSS/SavedListPanel.module.css';
import classes from '../CSS/MainPage.module.css';


export default function MainPage() {
  //const username = localStorage.getItem('currentUser');
  const [textDisplays, setTextDisplays] = useState([]); // holds list of text states
  const [selectedIndex, setSelectedIndex] = useState(null); // currently selected display
  const [temp, setTemp] = useState(1); 
  const [savedTitles, setSavedTitles] = useState(() => JSON.parse(localStorage.getItem("savedTextList")) || []);

  // font settings for the selected display
  const [selectedRange, setSelectedRange] = useState(null);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");

  const addTextDisplay = () => {
    if (textDisplays.length >= 5) return;
    setTemp(temp + 1);
    const newDisplay = { title: `#${temp}`, text: [] };
    setTextDisplays([...textDisplays, newDisplay]);
    setSelectedIndex(textDisplays.length);
    setSelectedRange(null);
  };

  const saveTextDisplayAtIndex = (index) => {
    const savedList = JSON.parse(localStorage.getItem("savedTextList")) || [];
    const currentItem = textDisplays[index];
  
    const existingIndex = savedList.findIndex(item => item.content.title === currentItem.title);
  
    let updatedSaved;
    if (existingIndex !== -1) {
      savedList[existingIndex] = {
        savedAt: new Date().toISOString(),
        content: currentItem
      };
      updatedSaved = [...savedList];
    } else {
      updatedSaved = [...savedList, {
        savedAt: new Date().toISOString(),
        content: currentItem
      }];
    }
  
    localStorage.setItem("savedTextList", JSON.stringify(updatedSaved));
    setSavedTitles(updatedSaved);
  };  

  const removeTextDisplay = (index) => {
    const shouldSave = window.confirm("Do you want to save this text before closing?");
    if (shouldSave) {
      saveTextDisplayAtIndex(index);
    }    
  
    const updated = [...textDisplays];
    updated.splice(index, 1);
    setTextDisplays(updated);
    setSelectedIndex(null);
    setSelectedRange(null);
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
    const savedList = JSON.parse(localStorage.getItem("savedTextList")) || [];
    const found = savedList.find(item => item.content.title === textObject.title); // find the saved text by title

    if (found) {
      const updated = [...textDisplays, found.content];
      setTextDisplays(updated);
    }
  };
  
  return (
    <div className={classes["app-container"]}>
      {/* אזור ראשי - עורך, מקלדת, טקסטים */}
      <div className={classes["main-area"]}>

        <div className={classes["controls"]}>
          <button onClick={addTextDisplay}>Add TextDisplay</button>
          {selectedIndex !== null && (
            <button onClick={() => removeTextDisplay(selectedIndex)}>Remove Selected</button>
          )}
        </div>
        
        {/* גריד של כל TextDisplays */}
        <div className={classes["grid-area"]}>
          {textDisplays.map((text, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setSelectedRange(null); // reset selected range when selecting a new text display
              }}              
              className={`${classes["text-display-box"]} ${selectedIndex === index ? classes["selected"] : ""}`}>
              <TextDisplay 
                text={text} 
                setText={(newText) => updateTextAtIndex(index, newText)} 
                index={index}
                isSelected={selectedIndex === index}
                setSelectedRange={setSelectedRange}
                onSave={() => saveTextDisplayAtIndex(index)}
              />
            </div>
          ))}
        </div>
        
        <div className={classes["font-controls"]}>
          <FontControls 
            selectedRange={selectedRange}
            setFontFamily={setFontFamily} 
            setFontSize={setFontSize} 
            setColor={setColor} 
            textDisplays={textDisplays}
            setTextDisplays={setTextDisplays}
            selectedIndex={selectedIndex}
          />
        </div>

        <div className={classes["text-editor"]}>
          <TextEditor 
            text={selectedIndex !== null ? textDisplays[selectedIndex].text : []} 
            setText={updateText}
            disabled={selectedIndex === null}
          />
        </div>

        <div className={classes["keyboard"]}>
          <Keyboard
            text={selectedIndex !== null ? textDisplays[selectedIndex].text : []}
            setText={updateText}
            fontFamily={fontFamily}
            fontSize={fontSize}
            color={color}
            disabled={selectedIndex === null}
          />
        </div>
      </div>
        
      {/* לוח שמורים בצד ימין */}
      <div className={classes["right-panel"]}>
        <SavedListPanel 
          savedTitles={savedTitles} 
          setSavedTitles={setSavedTitles} 
          onRestore={handleRestore} 
        />
      </div>
    </div>  
  );
}