import { faker } from '@faker-js/faker'
import { randomColor } from './utils'

export default function makeData(count: number) {
  let data: any[] = []
  let options: any[] = []
  let row
  for (let i = 0; i < count; i++) {
    row = {
      ID: faker.string.uuid(),
      firstName: faker.internet.userName(),
      lastName: faker.internet.displayName(),
      email: faker.internet.email(),
      age: Math.floor(20 + Math.random() * 20),
      music: faker.music.genre(),
    }
    options.push({ label: row.music, backgroundColor: randomColor() })
    data.push(row)
  }

  let columns = [
    {
      id: 'firstName',
      label: 'First Name',
      accessor: 'firstName',
      minWidth: 100,
      dataType: 'text',
      options: [],
    },
    {
      id: 'lastName',
      label: 'Last Name',
      accessor: 'lastName',
      minWidth: 100,
      dataType: 'text',
      options: [],
    },
    {
      id: 'age',
      label: 'Age',
      accessor: 'age',
      width: 80,
      dataType: 'number',
      options: [],
    },
    {
      id: 'email',
      label: 'E-Mail',
      accessor: 'email',
      width: 300,
      dataType: 'text',
      options: [],
    },
    {
      id: 'music',
      label: 'Music Preference',
      accessor: 'music',
      dataType: 'select',
      width: 200,
      options: options,
    },
    {
      id: 999999,
      width: 20,
      label: '+',
      disableResizing: true,
      dataType: 'null',
    },
  ]
  return { columns: columns, data: data, skipReset: false }
}
