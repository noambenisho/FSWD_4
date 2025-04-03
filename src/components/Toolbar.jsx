export default function Toolbar({ setText, text }) {
    return (
      <div className="flex gap-2 p-2">
        <button onClick={() => setText("")} className="p-2 bg-red-500 text-white rounded">
          Clear
        </button>
        <button onClick={() => localStorage.setItem("savedText", text)} className="p-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    );
  }
  