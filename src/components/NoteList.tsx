import React from 'react';
import { Trash2 } from 'lucide-react';
import { deleteNote } from '../lib/db';
import toast from 'react-hot-toast';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface NoteListProps {
  notes: Note[];
  onNoteDeleted: () => void;
}

export function NoteList({ notes, onNoteDeleted }: NoteListProps) {
  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      onNoteDeleted();
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-wrap">{note.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(note.id)}
              className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      {notes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No notes yet. Create one above!</p>
        </div>
      )}
    </div>
  );
}