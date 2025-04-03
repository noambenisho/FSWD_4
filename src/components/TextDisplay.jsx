// This component receives a `text` prop and displays it inside a styled div.
// The `className` prop is used to apply Tailwind CSS classes for styling. 
export default function TextDisplay({ text }) {
    return <div className="p-4 border rounded bg-gray-100">{text}</div>;
  }
 