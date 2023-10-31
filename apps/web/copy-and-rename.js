import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const srcFolder = resolve(__dirname, './dist/assets')
const destFolder = resolve(__dirname, './dist/external')
const newFileName = 'external.css'

async function copyAndRename() {
  try {
    // Ensure the destination directory exists
    await fs.mkdir(destFolder, { recursive: true })

    // Read the source directory
    const files = await fs.readdir(srcFolder)
    // Find the file to be copied
    const fileToCopy = files.find(
      (file) => file.startsWith('index-') && file.endsWith('.css'),
    )
    // If file is found, copy it to the destination directory with the new name
    if (fileToCopy) {
      await fs.copyFile(
        resolve(srcFolder, fileToCopy),
        resolve(destFolder, newFileName),
      )
      console.log(`Copied and renamed ${fileToCopy} to ${newFileName}`)
    } else {
      console.log(`No file to copy in ${srcFolder}`)
    }
  } catch (error) {
    console.error(`Error in copyAndRename function: ${error.message}`)
  }
}

copyAndRename()
