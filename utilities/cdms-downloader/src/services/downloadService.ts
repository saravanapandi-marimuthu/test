import { Browser } from 'playwright'
import fs from 'fs/promises'
import path from 'path'
import delay from '../delay'
import { Manufacturers, Products } from '../models/manufacturers'
import {
  getDocumentsListUrl,
  getManufactureProductsUrl,
  getProductAvailabilityUrl,
} from '../models/Urls'
import { addChildUrlsToDatabase, updateDownloadStatus } from '../db/DbService'

const basePath = '../data'

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const downloadJson = async (
  browser: Browser,
  url: string,
): Promise<string | null> => {
  const page = await browser.newPage()

  let delayMs = randomIntFromInterval(500, 2500)
  console.log(`Processing ${url} Wait time: ${delayMs}`)

  await page.goto(url)
  const jsonContent = await page.textContent('body')
  await page.close()

  await delay(delayMs)

  return jsonContent
}

export const downloadManufacturers = async (browser: Browser, url: string) => {
  console.log('Downloading & parsing manufacturers url')

  const jsonContent = await downloadJson(browser, url)

  if (jsonContent !== null) {
    const outputFilePath = path.resolve(
      __dirname,
      `${basePath}/manufacturers.json`,
    )
    // Save the JSON content to a file
    await fs.writeFile(outputFilePath, jsonContent)

    // Parse json, build URLs and add to database
    const manufacturers: Manufacturers = JSON.parse(jsonContent)
    const items = manufacturers.Lst

    let urls = items.map((item) => {
      return getManufactureProductsUrl(String(item.value))
    })

    addChildUrlsToDatabase(urls)

    updateDownloadStatus(url, 'success')
  }
}

export const downloadManufacturerProducts = async (
  browser: Browser,
  url: string,
) => {
  console.log('Downloading & parsing manufacturer products url')

  const jsonContent = await downloadJson(browser, url)

  const parsedUrl = new URL(url)
  const searchParams = new URLSearchParams(parsedUrl.search)
  const manId = searchParams.get('manId')

  if (jsonContent !== null) {
    const outputFilePath = path.resolve(
      __dirname,
      `${basePath}/manufacturer-products-${manId}.json`,
    )
    // Save the JSON content to a file
    await fs.writeFile(outputFilePath, jsonContent)

    // Parse json, build URLs and add to database
    const manufacturers: Products = JSON.parse(jsonContent)
    const items = manufacturers.Lst

    let productAvailabilityUrls = items.map((item) => {
      return getProductAvailabilityUrl(String(item.Id))
    })

    let productDocumentsUrls = items.map((item) => {
      return getDocumentsListUrl(String(item.Id))
    })

    addChildUrlsToDatabase(productAvailabilityUrls)
    addChildUrlsToDatabase(productDocumentsUrls)

    updateDownloadStatus(url, 'success')
  }
}

export const downloadProductAvailabilityData = async (
  browser: Browser,
  url: string,
) => {
  console.log('Downloading manufacturer product availability url')

  const jsonContent = await downloadJson(browser, url)

  const parsedUrl = new URL(url)
  const searchParams = new URLSearchParams(parsedUrl.search)
  const productId = searchParams.get('productId')

  if (jsonContent !== null) {
    const outputFilePath = path.resolve(
      __dirname,
      `${basePath}/manufacturer-product-availability-${productId}.json`,
    )
    // Save the JSON content to a file
    await fs.writeFile(outputFilePath, jsonContent)

    updateDownloadStatus(url, 'success')
  }
}

export const downloadProductDocumentsData = async (
  browser: Browser,
  url: string,
) => {
  console.log('Downloading manufacturer product documents url')

  const jsonContent = await downloadJson(browser, url)

  const parsedUrl = new URL(url)
  const searchParams = new URLSearchParams(parsedUrl.search)
  const productId = searchParams.get('productId')

  if (jsonContent !== null) {
    const outputFilePath = path.resolve(
      __dirname,
      `${basePath}/manufacturer-product-documents-${productId}.json`,
    )
    // Save the JSON content to a file
    await fs.writeFile(outputFilePath, jsonContent)

    updateDownloadStatus(url, 'success')
  }
}
