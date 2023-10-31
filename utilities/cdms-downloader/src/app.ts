import { chromium } from 'playwright'
import { getNextAvailableUrl, seedDatabase } from './db/DbService'
import {
  downloadManufacturerProducts,
  downloadManufacturers,
  downloadProductAvailabilityData,
  downloadProductDocumentsData,
} from './services/downloadService'
import { allManufacturersUrl } from './models/Urls'
import path from 'path'
import {
  uploadManufacturer,
  uploadProducts,
} from './db/postgres/uploadManufacturer'
import { glob } from 'glob'

const downloadData = async () => {
  const browser = await chromium.launch()

  seedDatabase()

  // Process URLs with the status 'available' or 'failed'
  let nextAvailableUrl = getNextAvailableUrl()
  let sameUrlAttempt = 0
  let lastUrl: string = ''

  while (nextAvailableUrl) {
    try {
      if (nextAvailableUrl === lastUrl && sameUrlAttempt == 3) {
        console.log('Stuck in same url. Breaking out and exiting app')
        break
      }

      if (nextAvailableUrl !== lastUrl) {
        lastUrl = nextAvailableUrl
        sameUrlAttempt = 0
      }

      sameUrlAttempt++

      if (nextAvailableUrl === allManufacturersUrl) {
        console.log(`Download manufacturers: ${nextAvailableUrl}`)
        await downloadManufacturers(browser, nextAvailableUrl)
      } else if (nextAvailableUrl.includes('ProductList')) {
        console.log(`Download products: ${nextAvailableUrl}`)

        await downloadManufacturerProducts(browser, nextAvailableUrl)
      } else if (nextAvailableUrl.includes('DocumentList')) {
        console.log(`Download product documents list: ${nextAvailableUrl}`)
        await downloadProductDocumentsData(browser, nextAvailableUrl)
      } else if (nextAvailableUrl.includes('ProductAvail')) {
        console.log(`Download product availability: ${nextAvailableUrl}`)
        await downloadProductAvailabilityData(browser, nextAvailableUrl)
      } else {
        console.error(
          `Error: JSON content not found for URL ${nextAvailableUrl}`,
        )
      }

      nextAvailableUrl = getNextAvailableUrl()
    } catch (error) {
      console.error(`Error processing url ${nextAvailableUrl}`, error)
    }
  }

  await browser.close()
}

const main = async () => {
  //await downloadData()

  const basePath = './data'

  const manufacturersFilePath = path.resolve(
    __dirname,
    `${basePath}/manufacturers.json`,
  )

  await uploadManufacturer(manufacturersFilePath)

  const productsFilePath = path.resolve(__dirname, `${basePath}/`)

  await uploadProducts(productsFilePath)
}

main().catch(console.error)
