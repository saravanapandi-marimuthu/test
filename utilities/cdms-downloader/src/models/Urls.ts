export const allManufacturersUrl =
  'https://www.cdms.net/labelssds/Home/ManList?Keys='

export const getManufactureProductsUrl = (manufacturerId: string) =>
  `https://www.cdms.net/labelssds/Home/ProductList?manId=${manufacturerId}`

export const getDocumentsListUrl = (productId: string) =>
  `https://www.cdms.net/labelssds/Home/DocumentList?productId=${productId}`

export const getProductAvailabilityUrl = (productId: string) =>
  `https://www.cdms.net/labelssds/Home/ProductAvail?productId=${productId}`
