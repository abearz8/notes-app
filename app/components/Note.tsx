import { Note as NoteType } from '../types/Note';

interface NoteProps {
  note: NoteType;
  onSave: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export default function Note({ note, onSave, onDelete }: NoteProps) {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg min-h-[150px] flex flex-col relative group hover:shadow-xl transition-all duration-300"
    >
      <textarea
        className="flex-1 bg-transparent resize-none focus:outline-none mb-6"
        value={note.content}
        onChange={(e) => onSave(note.id, e.target.value)}
        placeholder="Write your note here..."
      />
      <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center text-sm text-gray-500">
        <span className="text-xs">
          {note.lastSaved ? `Saved at ${note.lastSaved}` : 'Not saved yet'}
        </span>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
} 