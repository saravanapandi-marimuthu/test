export type NameParts = {
  firstName?: string
  middleName?: string
  lastName?: string
}

const splitName = (verifiedToken: any): NameParts => {
  let nameParts: NameParts = {
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
  }

  if (
    !verifiedToken ||
    !verifiedToken.name ||
    verifiedToken.name === 'unknown'
  ) {
    return nameParts
  }

  const nameSplit = verifiedToken.name.split(' ')

  switch (nameSplit.length) {
    case 1:
      nameParts.firstName = nameSplit[0]
      break
    case 2:
      nameParts.firstName = nameSplit[0]
      nameParts.lastName = nameSplit[1]
      break
    case 3:
      nameParts.firstName = nameSplit[0]
      nameParts.middleName = nameSplit[1]
      nameParts.lastName = nameSplit[2]
      break
    default:
      nameParts.firstName = nameSplit[0]
      nameParts.middleName = nameSplit.slice(1, nameSplit.length - 1).join(' ')
      nameParts.lastName = nameSplit[nameSplit.length - 1]
  }

  return nameParts
}

export default splitName
