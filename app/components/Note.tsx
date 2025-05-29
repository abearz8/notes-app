import { Note as NoteType } from '../types/Note';
import { useState } from 'react';

interface NoteProps {
  note: NoteType;
  onSave: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onColorChange: (id: number, color: string) => void;
}

const COLORS = [
  { name: 'Yellow', value: 'bg-yellow-100' },
  { name: 'Blue', value: 'bg-blue-100' },
  { name: 'Green', value: 'bg-green-100' },
  { name: 'Pink', value: 'bg-pink-100' },
  { name: 'Purple', value: 'bg-purple-100' },
  { name: 'Orange', value: 'bg-orange-100' },
];

export default function Note({ note, onSave, onDelete, onColorChange }: NoteProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div
      className={`${note.color} backdrop-blur-sm p-4 rounded-xl shadow-lg min-h-[150px] flex flex-col relative group hover:shadow-xl transition-all duration-300`}
    >
      <textarea
        className="flex-1 bg-transparent resize-none focus:outline-none mb-6"
        value={note.content}
        onChange={(e) => onSave(note.id, e.target.value)}
        placeholder="Write your note here..."
      />
      <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Change note color"
          >
            🎨
          </button>
          <span className="text-xs">
            {note.lastSaved ? `Saved at ${note.lastSaved}` : 'Not saved yet'}
          </span>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-700"
        >
          Delete
        </button>
      </div>

      {/* Color Picker Popup */}
      {showColorPicker && (
        <div className="absolute bottom-12 left-4 bg-white rounded-lg shadow-xl p-2 z-10 flex gap-1">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                onColorChange(note.id, color.value);
                setShowColorPicker(false);
              }}
              className={`w-6 h-6 rounded-full ${color.value} hover:scale-110 transition-transform`}
              title={color.name}
            />
          ))}
        </div>
      )}
    </div>
  );
} 