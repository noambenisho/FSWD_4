import { useState } from "react";
import EditingArea from "./components/EditingArea";
import Keyboard from "./components/Keyboard";
import FontControls from './components/FontControls';
import TextEditor from "./components/TextEditor";

export default function App() {
  const [text, setText] = useState([]);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");

  return (
    <div className="p-4 space-y-4">
      <EditingArea 
        text={text} 
        setText={setText} 
        fontFamily={fontFamily}
        fontSize={fontSize}
        color={color}
      /> 
      <TextEditor text={text} setText={setText} />
      <FontControls 
        setFontFamily={setFontFamily} 
        setFontSize={setFontSize} 
        setColor={setColor} 
      />
      <Keyboard
       text={text}
       setText={setText}
       fontFamily={fontFamily}
       fontSize={fontSize}
       color={color}
      />

    </div>
  );
}
// This is the main App component that combines all the other components.
// It manages the state of the text and passes it down to the child components.