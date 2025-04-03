export default function TextEditor({ text, setText }) {
    return (
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-2 border rounded"
      />
    );
  }
  