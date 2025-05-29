'use client';

import { useState, useEffect } from "react";
import Note from './components/Note';
import InfoBar from './components/InfoBar';
import { Note as NoteType } from './types/Note';

export default function Home() {
  const [notes, setNotes] = useState<NoteType[]>([]);

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
        isEdited: false,
        color: 'bg-white/90'
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
      isEdited: false,
      color: 'bg-white/90'
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

  const changeNoteColor = (id: number, color: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, color } : note
    ));
  };

  // Calculate statistics
  const totalNotes = notes.length;
  const editedNotes = notes.filter(note => note.isEdited).length;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-2">Notes Demo</h1>
        
        <InfoBar
          totalNotes={totalNotes}
          editedNotes={editedNotes}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onSave={saveNote}
              onDelete={deleteNote}
              onColorChange={changeNoteColor}
            />
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
