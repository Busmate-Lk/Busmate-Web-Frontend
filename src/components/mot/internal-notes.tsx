"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

interface Note {
  author: string;
  date: string;
  content: string;
}

interface InternalNotesProps {
  notes: Note[];
  onAddNote: (note: string) => void;
}

export function InternalNotes({ notes, onAddNote }: InternalNotesProps) {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote("");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📝 Internal Notes
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {notes.map((note, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm text-blue-900">{note.author}</p>
              <p className="text-xs text-gray-500">{note.date}</p>
            </div>
            <p className="text-sm text-gray-700">{note.content}</p>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Add New Note
          </h4>
          <textarea
            placeholder="Add new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[80px]"
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Note
            </button>
            <button
              onClick={() => setNewNote("")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
