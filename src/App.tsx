import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { StickyNote } from 'lucide-react';
import { initDb, getNotes } from './lib/db';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initDb().then(() => loadNotes());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <StickyNote className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Notes App</h1>
        </div>

        <div className="mb-8">
          <NoteForm onNoteAdded={loadNotes} />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading notes...</p>
          </div>
        ) : (
          <NoteList notes={notes} onNoteDeleted={loadNotes} />
        )}
      </div>
    </div>
  );
}

export default App;