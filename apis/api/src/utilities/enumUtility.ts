/**
 * Function to iterate over an enum
 * @param enumeration
 * @returns
 */
export const iterateEnum = <T>(enumeration: T) => {
  const enumMembers: { name: string; value: number | string }[] = []

  for (const name in enumeration) {
    if (!isNaN(Number(name))) {
      continue
    }

    const value = (enumeration as any)[name]
    enumMembers.push({ name, value })
  }

  return enumMembers
}

export const getEnumValues = <T>(enumeration: T): (number | string)[] => {
  const enumValues: (number | string)[] = []

  for (const name in enumeration) {
    if (!isNaN(Number(name))) {
      continue
    }

    const value = (enumeration as any)[name]
    enumValues.push(value)
  }

  return enumValues
}
