import { useState } from "react";
import Keyboard from "./Keyboard";
import FontControls from './FontControls';
import TextEditor from "./TextEditor";
import TextDisplay from "./TextDisplay";
import SavedListPanel from './SavedListPanel';
import '../CSS/SavedListPanel.module.css';
import { LogOut, Undo, Redo } from "lucide-react";
import styles from '../CSS/MainPage.module.css';
import PropTypes from 'prop-types';

export default function MainPage(props) {
  const { switchTo } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Holds indices of found matches

  const username = localStorage.getItem('currentUser');
  const [textDisplays, setTextDisplays] = useState([]); // holds list of text states
  const [selectedIndex, setSelectedIndex] = useState(null); // currently selected display
  const [temp, setTemp] = useState(1); 
  const [savedTitles, setSavedTitles] = useState(() => 
    JSON.parse(localStorage.getItem(`savedTextList_${username}`)) || []
  );
  
  // font settings for the selected display
  const [selectedRange, setSelectedRange] = useState(null);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");

  // History management
  const [history, setHistory] = useState([]); // History for each text display
  const [redoHistory, setRedoHistory] = useState([]); // Parallel to history

  const [typingTarget, setTypingTarget] = useState("editor"); // "editor", "search", or "replace"

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    switchTo('login');
  };

  const addTextDisplay = () => {
    if (textDisplays.length >= 13) return;
    setTemp(temp + 1);
    const newDisplay = { title: `#${temp}`, text: [] };
    setTextDisplays([...textDisplays, newDisplay]);
    setHistory([...history, []]); // Initialize an empty history for this new display
    setRedoHistory([...redoHistory, []]);
    setSelectedIndex(textDisplays.length);
    setSelectedRange(null);
  };

  const saveTextDisplayAtIndex = (index) => {
    const key = `savedTextList_${username}`;
    const savedList = JSON.parse(localStorage.getItem(key)) || [];
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
  
    localStorage.setItem(key, JSON.stringify(updatedSaved));
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
  
  // Update text with history tracking
  const updateText = (newText) => {
    if (selectedIndex === null) return;
  
    const updatedDisplays = [...textDisplays];
    const updatedHistory = [...history];
    const updatedRedo = [...redoHistory];
  
    updatedHistory[selectedIndex].push(textDisplays[selectedIndex].text);
    updatedRedo[selectedIndex] = []; // Clear redo stack
  
    updatedDisplays[selectedIndex].text = newText;
    setTextDisplays(updatedDisplays);
    setHistory(updatedHistory);
    setRedoHistory(updatedRedo);
  };
  
  // Undo the last change
  const undoText = () => {
    if (selectedIndex === null || history[selectedIndex].length === 0) return;
  
    const updatedDisplays = [...textDisplays];
    const updatedHistory = [...history];
    const updatedRedo = [...redoHistory];
    
    // Revert to the last state from the history
    const lastState = updatedHistory[selectedIndex].pop();
    updatedRedo[selectedIndex].push(updatedDisplays[selectedIndex].text); // Save for redo
  
    updatedDisplays[selectedIndex].text = lastState;
  
    setTextDisplays(updatedDisplays);
    setHistory(updatedHistory);
    setRedoHistory(updatedRedo);
  };

  const redoText = () => {
    if (selectedIndex === null || redoHistory[selectedIndex].length === 0) return;
  
    const updatedDisplays = [...textDisplays];
    const updatedHistory = [...history];
    const updatedRedo = [...redoHistory];
  
    const redoState = updatedRedo[selectedIndex].pop();
    updatedHistory[selectedIndex].push(updatedDisplays[selectedIndex].text); // Save current to undo
  
    updatedDisplays[selectedIndex].text = redoState;
  
    setTextDisplays(updatedDisplays);
    setHistory(updatedHistory);
    setRedoHistory(updatedRedo);
  };

  const updateTextAtIndex = (index, newText) => {
    const updated = [...textDisplays];
    updated[index] = newText;
    setTextDisplays(updated);
  };

  const addExistingTextDisplay = (existingDisplay) => {
    if (textDisplays.length >= 13) return;
  
    setTextDisplays(prev => [...prev, existingDisplay]);
    setHistory(prev => [...prev, []]); // Initialize empty history
    setRedoHistory(prev => [...prev, []]);
    setSelectedIndex(textDisplays.length);
    setSelectedRange(null);
  };  

  const handleRestore = (textObject) => {
    const savedList = JSON.parse(localStorage.getItem(`savedTextList_${username}`)) || [];
    const found = savedList.find(item => item.content.title === textObject.title);
  
    if (found) {
      addExistingTextDisplay(found.content);
    }
  };
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
  
    const results = [];
    textDisplays.forEach((display, displayIndex) => {
      display.text.forEach((charObj, charIndex) => {
        if (charObj.char === searchQuery) {
          results.push({ displayIndex, charIndex });
        }
      });
    });
  
    setSearchResults(results);
    setSearchMessage(`${results.length} match${results.length !== 1 ? "es" : ""} found.`);
  };

  const handleReplaceAll = () => {
    if (!searchQuery.trim() || selectedIndex === null) return;
  
    const updatedDisplays = [...textDisplays];
    const updatedHistory = [...history];
  
    // Save current state to history before modifying
    const currentText = textDisplays[selectedIndex].text;
    updatedHistory[selectedIndex] = [...updatedHistory[selectedIndex], [...currentText]];
  
    let replaced = false;
  
    updatedDisplays[selectedIndex].text = updatedDisplays[selectedIndex].text.map((charObj) => {
      if (charObj.char === searchQuery) {
        replaced = true;
        return { ...charObj, char: replaceQuery };
      }
      return charObj;
    });
  
    if (replaced) {
      setTextDisplays(updatedDisplays);
      setHistory(updatedHistory);
      setSearchQuery("");
      setReplaceQuery("");
      setSearchResults([]);
      setSearchMessage("");
    }
  };
  
  const canUndo = selectedIndex !== null && history[selectedIndex]?.length > 0;
  const canRedo = selectedIndex !== null && redoHistory[selectedIndex]?.length > 0;

  return (
    <div className={styles["app-container"]}>
      {/* main area */}
      <div className={styles["main-area"]}>

        <div className={styles["controls"]}>
        <button onClick={handleLogout} >
          <LogOut />
        </button>
          <button onClick={addTextDisplay}>Add TextDisplay</button>
          {selectedIndex !== null && (
            <button onClick={() => removeTextDisplay(selectedIndex)}>Remove Selected</button>
          )}
          {selectedIndex !== null && (
            <button
              onClick={undoText}
              className={`${styles["undo-redo-button"]} ${styles["undo-button"]}`}
              title="Undo"
              disabled={!canUndo}
            >
              <Undo size={20} />
            </button>
          )}
          {selectedIndex !== null && (
            <button
              onClick={redoText}
              className={`${styles["undo-redo-button"]} ${styles["redo-button"]}`}
              title="Redo"
              disabled={!canRedo}
            >
              <Redo size={20} />
            </button>
          )}

          <div className={styles["search-controls"]}>
          <input
            type="text"
            placeholder="Search char..."
            value={searchQuery}
            maxLength={1}
            onClick={() => setTypingTarget("search")}
            onChange={(e) => {
              const value = e.target.value.slice(0, 1);
              setSearchQuery(value);

              if (value === "") {
                setSearchResults([]);
                setSearchMessage("");
              }
            }}
          />

          <input
            type="text"
            placeholder="Replace with..."
            value={replaceQuery}
            maxLength={1}
            onClick={() => setTypingTarget("replace")}
            onChange={(e) => setReplaceQuery(e.target.value.slice(0, 1))}
          />

            {searchMessage && <div className={styles["search-message"]}>{searchMessage}</div>}

            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReplaceAll}>Replace All</button>
          </div>

        </div>
        
        <div className={styles["grid-area"]}>
          {textDisplays.map((text, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setSelectedRange(null); // reset selected range when selecting a new text display
                setTypingTarget("editor");
              }}              
              className={`${styles["text-display-box"]} ${selectedIndex === index ? styles["selected"] : ""}`}>
              <TextDisplay 
                text={text} 
                setText={(newText) => updateTextAtIndex(index, newText)} 
                updateText={(newText) => updateText(newText)}
                index={index}
                isSelected={selectedIndex === index}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
                onSave={() => saveTextDisplayAtIndex(index)}
                searchResults={searchResults.filter(r => r.displayIndex === index)} // Pass filtered matches
              />

            </div>
          ))}
        </div>
        
        <div className={styles["font-controls"]}>
        <FontControls
          selectedIndex={selectedIndex}
          selectedRange={selectedRange}
          textDisplays={textDisplays}
          setTextDisplays={setTextDisplays}
          setHistory={setHistory}
          history={history}
          setFontFamily={setFontFamily}
          setFontSize={setFontSize}
          setColor={setColor}
        />

        </div>

        <div className={styles["text-editor"]}>
          <TextEditor 
            text={selectedIndex !== null ? textDisplays[selectedIndex].text : []} 
            setText={updateText}
            disabled={selectedIndex === null}
            setTypingTarget={setTypingTarget}
          />
        </div>

        <div className={styles["keyboard"]}>
        <Keyboard
          text={selectedIndex !== null ? textDisplays[selectedIndex].text : []}
          setText={updateText}
          fontFamily={fontFamily}
          fontSize={fontSize}
          color={color}
          disabled={selectedIndex === null}
          typingTarget={typingTarget}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setReplaceQuery={setReplaceQuery}
          replaceQuery={replaceQuery}
          setSearchResults={setSearchResults}
          setSearchMessage={setSearchMessage}
        />
        </div>
      </div>
        
      {/* Right side panel */}
      <div className={styles["right-panel"]}>
        <SavedListPanel 
          savedTitles={savedTitles} 
          setSavedTitles={setSavedTitles} 
          onRestore={handleRestore} 
          username={username}
        />
      </div>
    </div>  
  );
}

MainPage.propTypes = {
  switchTo: PropTypes.func.isRequired,
};