export interface ManufacturerItem {
  value: number
  label: string
  HomePage: string
  gaPageParam: string
}

export interface ProductItem {
  Id: number
  Name: string
  LabelDAT: string
  LogoId: number
  ManId: number
  EPA: string
  Manufacturer: string
  CommonName: string
  HasIcon: boolean
  IconUrl: string
  IconUI: string
  gaPageParam: string
  IsUs: boolean
  IsCanada: boolean
  IsCoPack: boolean
  //"Id": 17458,
  //"Name": "XylPhi-PD™",
  //"LabelDAT": "G4E",
  //"LogoId": 0,
  //"ManId": 537,
  //"EPA": "92918-1-93909",
  //"Manufacturer": "A\u0026P Inphatec, LLC",
  //"CommonName": "BACTERIOPHAGE",
  //"HasIcon": false,
  //"IconUrl": "",
  //"IconUI": "",
  //"gaPageParam": "XYLPHI-PD",
  //"IsUs": true,
  //"IsCanada": false,
  //"IsCoPack": false
}

export interface Products {
  Lst: ProductItem[]
}

export interface Manufacturers {
  Lst: ManufacturerItem[]
}
