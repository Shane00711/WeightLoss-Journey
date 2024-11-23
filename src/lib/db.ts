import { createClient } from '@libsql/client';

let db: ReturnType<typeof createClient>;

export function getDb() {
  if (!db) {
    db = createClient({
      url: 'file:local.db',
    });
  }
  return db;
}

export async function initDb() {
  const client = getDb();
  await client.execute(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function getNotes() {
  const client = getDb();
  const result = await client.execute('SELECT * FROM notes ORDER BY created_at DESC');
  return result.rows;
}

export async function addNote(title: string, content: string) {
  const client = getDb();
  const result = await client.execute({
    sql: 'INSERT INTO notes (title, content) VALUES (?, ?)',
    args: [title, content],
  });
  return result;
}

export async function deleteNote(id: number) {
  const client = getDb();
  const result = await client.execute({
    sql: 'DELETE FROM notes WHERE id = ?',
    args: [id],
  });
  return result;
}