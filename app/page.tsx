'use client';

import { useState, useEffect } from "react";

interface Note {
  id: number;
  content: string;
  lastSaved?: string;
  isEdited: boolean;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Set initial note
      setNotes([{
        id: Date.now(),
        content: 'Write your note here...',
        isEdited: false
      }]);
    }
  }, []);

  // Save only edited notes to localStorage whenever they change
  useEffect(() => {
    const editedNotes = notes.filter(note => note.isEdited);
    if (editedNotes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(editedNotes));
    } else {
      localStorage.removeItem('notes');
    }
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: 'Write your note here...',
      isEdited: false
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const saveNote = (id: number, newContent: string) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        const isDefaultContent = newContent === 'Write your note here...';
        const isEmpty = newContent.trim() === '';
        const shouldMarkEdited = !isDefaultContent && !isEmpty;
        
        return {
          ...note,
          content: newContent,
          isEdited: shouldMarkEdited,
          lastSaved: shouldMarkEdited ? new Date().toLocaleTimeString() : undefined
        };
      }
      return note;
    }));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold">Notes Demo</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-yellow-100 p-4 rounded-lg shadow-md min-h-[150px] flex flex-col relative group"
            >
              <textarea
                className="flex-1 bg-transparent resize-none focus:outline-none mb-6"
                value={note.content}
                onChange={(e) => saveNote(note.id, e.target.value)}
                placeholder="Write your note here..."
              />
              <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center text-sm text-gray-500">
                <span className="text-xs">
                  {note.lastSaved ? `Saved at ${note.lastSaved}` : 'Not saved yet'}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addNote}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-2xl"
        >
          +
        </button>
      </main>
    </div>
  );
}
