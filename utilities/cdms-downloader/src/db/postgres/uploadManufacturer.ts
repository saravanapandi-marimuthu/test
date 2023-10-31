import { readFileSync } from 'fs'
import { config } from 'dotenv'
import { Pool } from 'pg'
import { glob } from 'glob'
import path from 'path'
import cuid from 'cuid'

interface Manufacturer {
  value: number
  label: string
  HomePage: string
  gaPageParam: string
}

interface ManufacturerJSON {
  Lst: Manufacturer[]
}

interface ProductJSON {
  SiteUrl: string
  LabelFolder: string
  Lst: Array<{
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
  }>
}

const productJsonToSql = async (filePath: string, pool: Pool) => {
  const rawContent = readFileSync(filePath, 'utf-8')
  const jsonContent: ProductJSON = JSON.parse(rawContent)

  const sqlStatements = []
  for (const product of jsonContent.Lst) {
    const {
      Id,
      Name,
      LabelDAT,
      LogoId,
      ManId,
      EPA,
      Manufacturer,
      CommonName,
      HasIcon,
      IconUrl,
      IconUI,
      gaPageParam,
      IsUs,
      IsCanada,
      IsCoPack,
    } = product

    // Query for manufacturerId
    const queryText = `SELECT "id" FROM "Company" WHERE "extended_properties"->>'externalId' = $1;`
    const values = [ManId]
    const res = await pool.query(queryText, values)

    //const query = `SELECT "id" FROM "Company" WHERE "external_id" = ${ManId};`
    //const res = await pool.query(query)
    if (res.rowCount === 0) {
      console.error(
        `Manufacturer with externalId ${ManId} not found. Skipping product ${Id}.`,
      )
      continue
    }
    const manufacturerId = res.rows[0].id

    const escapedName = Name.replace(/'/g, "''") // escaping single quote
    const escapedManufacturer = Manufacturer.replace(/'/g, "''") // escaping single quote
    const escapedCommonName = CommonName.replace(/'/g, "''") // escaping single quote
    const escapedIconUrl = IconUrl.replace(/'/g, "''") // escaping single quote
    const escapedIconUI = IconUI.replace(/'/g, "''") // escaping single quote
    const escapedGaPageParam = gaPageParam.replace(/'/g, "''") // escaping single quote

    sqlStatements.push(
      `INSERT INTO "Product" ("external_id", "product_name", "label_dat", "logo_id", "man_id", "EPA", "manufacturer_name", "common_name", "has_icon", "icon_url", "icon_ui", "ga_page_param", "is_us", "is_canada", "is_co_pack", "manufacturer_id", "created_at", "updated_at") VALUES (${Id}, '${escapedName}', '${LabelDAT}', ${LogoId}, ${ManId}, '${EPA}', '${escapedManufacturer}', '${escapedCommonName}', ${HasIcon}, '${escapedIconUrl}', '${escapedIconUI}', '${escapedGaPageParam}', ${IsUs}, ${IsCanada}, ${IsCoPack}, '${manufacturerId}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`,
    )
  }

  return sqlStatements
}

const getCompanyTypeId = async (
  companyTypeName: string,
  pool: Pool,
): Promise<number> => {
  const query = `SELECT id FROM "CompanyType" WHERE "company_type_name" = $1 LIMIT 1`

  const result = await pool.query(query, [companyTypeName.toLowerCase()])

  if (result.rows.length > 0) {
    return result.rows[0].id
  }

  throw new Error('Error fetching company type ID:')
}

const manufacturerJsonToSql = (filePath: string, companyTypeId: number) => {
  const rawContent = readFileSync(filePath, 'utf-8')
  const jsonContent: ManufacturerJSON = JSON.parse(rawContent)

  const sqlStatements = jsonContent.Lst.map(manufacturer => {
    const { value, label, HomePage, gaPageParam } = manufacturer
    const escapedLabel = label.replace(/'/g, "''") // escaping single quote
    const escapedHomePage = HomePage.replace(/'/g, "''") // escaping single quote
    const escapedGaPageParam = gaPageParam.replace(/'/g, "''") // escaping single quote
    const extendedProperties = `{ "gaPageParam": "${escapedGaPageParam}", "externalId": ${value} }`
    const id = cuid()
    return `INSERT INTO "Company" (id, normalized_company_name, company_name, homepage, extended_properties, company_type_id, created_at, updated_at) VALUES ('${id}', '${escapedLabel.toLowerCase()}', '${escapedLabel}', '${escapedHomePage}', '${extendedProperties}', ${companyTypeId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
  })

  return sqlStatements
}

const executeSqlStatements = async (statements: string[], pool: Pool) => {
  for (const statement of statements) {
    try {
      var result = await pool.query(statement)
      //console.log(result)
    } catch (error) {
      console.error(`Error executing statement: ${statement}`)
      console.error(error)
    }
  }
}

/* How to use */
export const uploadManufacturer = async (filePath: string) => {
  config() // Load .env file
  const connectionString = process.env.DATABASE_URL
  //console.log(connectionString)
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set in .env file')
  }

  const pool = new Pool({ connectionString }) // Create a single Pool here

  const testSql = [
    "SELECT * FROM information_schema.tables WHERE table_name = 'Manufacturer';",
  ]

  //await executeSqlStatements(testSql, connectionString)
  const companyTypeId = await getCompanyTypeId('Manufacturer', pool)
  const sqlStatements = manufacturerJsonToSql(filePath, companyTypeId)

  //console.log(connectionString)
  await executeSqlStatements(sqlStatements, pool)

  pool.end()
}

/* How to use */
export const uploadProducts = async (filePath: string) => {
  config() // Load .env file
  const connectionString = process.env.DATABASE_URL
  //console.log(connectionString)
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set in .env file')
  }

  const pool = new Pool({ connectionString }) // Create a single Pool here

  const productFilePaths = glob.sync(
    path.join(filePath, 'manufacturer-products-*.json'),
  )

  for (const filePath of productFilePaths) {
    console.log(`Processing ${filePath}`)
    const sqlStatements = await productJsonToSql(filePath, pool) // Pass the Pool to productJsonToSql
    await executeSqlStatements(sqlStatements, pool)
  }

  await pool.end()
}
