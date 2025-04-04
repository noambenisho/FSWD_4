import { useState } from "react";
import EditingArea from "./components/EditingArea";
import Keyboard from "./components/Keyboard";

export default function App() {
  const [text, setText] = useState(localStorage.getItem("savedText") || "");

  return (
    <div className="p-4 space-y-4">
      <EditingArea text={text} setText={setText} />   
      <Keyboard text={text} setText={setText} />
    </div>
  );
}
// This is the main App component that combines all the other components.
// It manages the state of the text and passes it down to the child components.