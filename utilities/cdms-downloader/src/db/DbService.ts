// Add the required imports
import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { allManufacturersUrl } from '../models/Urls'

const dbDir = '../data/db'
const outputDir = path.resolve(__dirname, dbDir)

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const outputFilePath = path.resolve(__dirname, `${dbDir}/downloaded_files.db`)
// Initialize the SQLite database and create the table if it doesn't exist
const db = new Database(outputFilePath)

const createTableSql = `
CREATE TABLE IF NOT EXISTS downloaded_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT UNIQUE,
  status TEXT
)`

db.exec(createTableSql)
console.log('Database created')

// Seed the database with the initial URL and set its status to 'available'
export const seedDatabase = () => {
  const checkUrlSql = 'SELECT * FROM downloaded_files WHERE url = ?'

  const row = db.prepare(checkUrlSql).get(allManufacturersUrl)

  if (!row) {
    updateDownloadStatus(allManufacturersUrl, 'available')
  }
}

// Update the download status of a URL in the database
export const updateDownloadStatus = (url: string, status: string) => {
  const updateStatusSql =
    'INSERT OR REPLACE INTO downloaded_files (url, status) VALUES (?, ?)'
  const stmt = db.prepare(updateStatusSql)
  stmt.run(url, status)
}

// Get the next available URL from the database
export const getNextAvailableUrl = (): string | null => {
  const getNextAvailableUrlSql = `SELECT url FROM downloaded_files WHERE status = 'available' OR status = 'failed' ORDER BY id ASC LIMIT 1`
  const row = db.prepare(getNextAvailableUrlSql).get() as any
  return row?.url
}

// Add the newly created child URLs to the database with the status 'available'
export const addChildUrlsToDatabase = (urls: string[]) => {
  urls.forEach(url => updateDownloadStatus(url, 'available'))
}
