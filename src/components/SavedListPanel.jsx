import { useState } from 'react';
import { Pencil } from 'lucide-react'; 
import classes from '../CSS/SavedListPanel.module.css';

export default function SavedListPanel(prop) {
  const { savedTitles, setSavedTitles, onRestore, username } = prop;
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleTitleEdit = (index, currentTitle) => {
    setEditIndex(index);
    setEditTitle(currentTitle || "");
  };

  const handleTitleSave = (index) => {
    const updated = [...savedTitles];
    updated[index].content.title = editTitle.trim() || `No title ${index + 1}`;
    localStorage.setItem(`savedTextList_${username}`, JSON.stringify(updated));
    setSavedTitles(updated);
    setEditIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      handleTitleSave(index);
    }
  };

  return (
    <div className={classes["saved-list-panel"]}>
      <h3>Recent</h3>
      {savedTitles.length === 0 && <p>No saved texts</p>}
      {savedTitles.map((item, index) => (
        <div key={index} className="saved-item">
          {editIndex === index ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => handleTitleSave(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoFocus
            />
          ) : (
            <div className={classes["title-row"]}>
              <button
                className="title-button"
                onClick={() => onRestore(item.content)}
              >
                {item.content.title || `No title ${index + 1}`}
              </button>
              <button
                className={classes["edit-icon"]}
                onClick={() => handleTitleEdit(index, item.content.title)}
                title="edit title"
              >
                <Pencil size={16} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}