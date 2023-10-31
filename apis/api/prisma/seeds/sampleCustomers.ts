import { AddressType, PhoneNumberType } from '../client'

export const sampleCustomers = [
  {
    companyName: 'Emily Smith',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '789 Maple Street',
        addressLine2: null,
        city: 'Greenfield',
        country: 'USA',
        postalCode: '45123',
        state: 'Ohio',
      },
    },
    contactPerson: {
      email: 'emily@harvestfields.com',
      firstName: 'Emily',
      lastName: 'Smith',
      middleName: 'R',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005551234',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Gold',
      },
    ],
  },
  {
    companyName: 'Robert Johnson',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '456 Elm Road',
        addressLine2: null,
        city: 'Hicksville',
        country: 'USA',
        postalCode: '43526',
        state: 'Ohio',
      },
    },
    contactPerson: {
      email: 'robert@countrymeadows.com',
      firstName: 'Robert',
      lastName: 'Johnson',
      middleName: 'T',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005559876',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Silver',
      },
    ],
  },
  {
    companyName: 'Jane Anderson',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '321 Willow Ave',
        addressLine2: null,
        city: 'Bloomfield',
        country: 'USA',
        postalCode: '07003',
        state: 'New Jersey',
      },
    },
    contactPerson: {
      email: 'jane@hillsidefarms.com',
      firstName: 'Jane',
      lastName: 'Anderson',
      middleName: 'L',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005553210',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Bronze',
      },
    ],
  },
  {
    companyName: 'William Clark',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '220 Birch Lane',
        addressLine2: null,
        city: 'Sunnyvale',
        country: 'USA',
        postalCode: '94086',
        state: 'California',
      },
    },
    contactPerson: {
      email: 'william@organicgreens.com',
      firstName: 'William',
      lastName: 'Clark',
      middleName: 'S',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005557489',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Silver',
      },
    ],
  },
  {
    companyName: 'Mary Johnson',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '920 Pine Road',
        addressLine2: null,
        city: 'Greenville',
        country: 'USA',
        postalCode: '29601',
        state: 'South Carolina',
      },
    },
    contactPerson: {
      email: 'mary@freshfarm.com',
      firstName: 'Mary',
      lastName: 'Johnson',
      middleName: 'E',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005558765',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Gold',
      },
    ],
  },
  {
    companyName: 'Michael Baker',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '1404 Spruce Street',
        addressLine2: null,
        city: 'Harrison',
        country: 'USA',
        postalCode: '72601',
        state: 'Arkansas',
      },
    },
    contactPerson: {
      email: 'michael@valleyfarms.com',
      firstName: 'Michael',
      lastName: 'Baker',
      middleName: 'D',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005551200',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Bronze',
      },
    ],
  },
  {
    companyName: 'Sarah Lewis',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '1109 Birch St',
        addressLine2: null,
        city: 'Elk Grove',
        country: 'USA',
        postalCode: '95624',
        state: 'California',
      },
    },
    contactPerson: {
      email: 'sarah@happyvalley.com',
      firstName: 'Sarah',
      lastName: 'Lewis',
      middleName: 'K',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005552524',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Silver',
      },
    ],
  },
  {
    companyName: 'David Allen',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '604 Cedar Ave',
        addressLine2: null,
        city: 'Portsmouth',
        country: 'USA',
        postalCode: '03801',
        state: 'New Hampshire',
      },
    },
    contactPerson: {
      email: 'david@prairieland.com',
      firstName: 'David',
      lastName: 'Allen',
      middleName: 'W',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005554545',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Gold',
      },
    ],
  },
  {
    companyName: 'Laura Williams',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '2700 Oak Lane',
        addressLine2: null,
        city: 'Madison',
        country: 'USA',
        postalCode: '53711',
        state: 'Wisconsin',
      },
    },
    contactPerson: {
      email: 'laura@meadowcreek.com',
      firstName: 'Laura',
      lastName: 'Williams',
      middleName: 'C',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005557676',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Bronze',
      },
    ],
  },
  {
    companyName: 'Richard Wilson',
    extendedProperties: {
      test: 'New customer onboarded',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '1300 Pine Ridge',
        addressLine2: null,
        city: 'Pine Bluff',
        country: 'USA',
        postalCode: '71601',
        state: 'Arkansas',
      },
    },
    contactPerson: {
      email: 'richard@blueskyfarms.com',
      firstName: 'Richard',
      lastName: 'Wilson',
      middleName: 'O',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005558989',
    },
    providerCompanyId: 'GA67890',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Silver',
      },
    ],
  },
]

export const sampleFarms = [
  {
    companyName: 'Sunrise Farm',
    extendedProperties: {
      landArea: '150 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '1100 Golden Rd',
        addressLine2: null,
        city: 'Harmony',
        country: 'USA',
        postalCode: '54001',
        state: 'Wisconsin',
      },
    },
    contactPerson: {
      email: 'info@sunrisefarm.com',
      firstName: 'Carol',
      lastName: 'Brown',
      middleName: 'M',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005554321',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Corn',
      },
      {
        tagCategoryName: 'Crop',
        tagName: 'Soybeans',
      },
    ],
  },
  {
    companyName: 'Green Valley Farms',
    extendedProperties: {
      landArea: '300 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '987 Meadow Dr',
        addressLine2: null,
        city: 'Clearwater',
        country: 'USA',
        postalCode: '33761',
        state: 'Florida',
      },
    },
    contactPerson: {
      email: 'info@greenvalleyfarms.com',
      firstName: 'Thomas',
      lastName: 'Green',
      middleName: 'J',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005558888',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Cotton',
      },
      {
        tagCategoryName: 'Crop',
        tagName: 'Peanuts',
      },
    ],
  },
  {
    companyName: 'Blue Lake Farm',
    extendedProperties: {
      landArea: '100 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '654 Lake St',
        addressLine2: null,
        city: 'Lakeview',
        country: 'USA',
        postalCode: '48850',
        state: 'Michigan',
      },
    },
    contactPerson: {
      email: 'info@bluelakefarm.com',
      firstName: 'Emily',
      lastName: 'Lake',
      middleName: 'S',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005553333',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Barley',
      },
      {
        tagCategoryName: 'Crop',
        tagName: 'Hay',
      },
    ],
  },
  {
    companyName: 'Sunny Acres',
    extendedProperties: {
      landArea: '250 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '432 Sunflower Lane',
        addressLine2: null,
        city: 'Sunnydale',
        country: 'USA',
        postalCode: '94085',
        state: 'California',
      },
    },
    contactPerson: {
      email: 'info@sunnyacres.com',
      firstName: 'David',
      lastName: 'Miller',
      middleName: 'L',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005559999',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Wheat',
      },
    ],
  },
  {
    companyName: 'Mountain View Orchards',
    extendedProperties: {
      landArea: '50 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '321 Hillside Drive',
        addressLine2: null,
        city: 'Hillsboro',
        country: 'USA',
        postalCode: '97123',
        state: 'Oregon',
      },
    },
    contactPerson: {
      email: 'info@mtvieworchards.com',
      firstName: 'Alice',
      lastName: 'Williams',
      middleName: 'K',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005557777',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Sorghum',
      },
      {
        tagCategoryName: 'Crop',
        tagName: 'Oats',
      },
    ],
  },
  {
    companyName: 'Prairie Fields',
    extendedProperties: {
      landArea: '400 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '789 Prairie Lane',
        addressLine2: null,
        city: 'Plainsville',
        country: 'USA',
        postalCode: '67502',
        state: 'Kansas',
      },
    },
    contactPerson: {
      email: 'info@prairiefields.com',
      firstName: 'Robert',
      lastName: 'Johnson',
      middleName: 'A',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005556666',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Rice',
      },
    ],
  },
  {
    companyName: 'Forest Grove Farm',
    extendedProperties: {
      landArea: '200 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '654 Pine Road',
        addressLine2: null,
        city: 'Forestville',
        country: 'USA',
        postalCode: '95436',
        state: 'California',
      },
    },
    contactPerson: {
      email: 'info@forestgrovefarm.com',
      firstName: 'Laura',
      lastName: 'Clark',
      middleName: 'N',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005552222',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Corn',
      },
      {
        tagCategoryName: 'Crop',
        tagName: 'Wheat',
      },
    ],
  },
  {
    companyName: 'Happy Acres',
    extendedProperties: {
      landArea: '175 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '123 Farm Lane',
        addressLine2: null,
        city: 'Farmville',
        country: 'USA',
        postalCode: '23901',
        state: 'Virginia',
      },
    },
    contactPerson: {
      email: 'info@happyacres.com',
      firstName: 'Brian',
      lastName: 'Smith',
      middleName: 'G',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005551111',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Soybeans',
      },
    ],
  },
  {
    companyName: 'Willow Creek Farm',
    extendedProperties: {
      landArea: '225 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '258 Willow St',
        addressLine2: null,
        city: 'Creekview',
        country: 'USA',
        postalCode: '68818',
        state: 'Nebraska',
      },
    },
    contactPerson: {
      email: 'info@willowcreekfarm.com',
      firstName: 'Samantha',
      lastName: 'Jones',
      middleName: 'P',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005554444',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Hay',
      },
      {
        tagCategoryName: 'Crop',
        tagName: 'Oats',
      },
    ],
  },
  {
    companyName: 'Cedar Hill Farms',
    extendedProperties: {
      landArea: '275 acres',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '876 Cedar Ave',
        addressLine2: null,
        city: 'Hilltop',
        country: 'USA',
        postalCode: '37075',
        state: 'Tennessee',
      },
    },
    contactPerson: {
      email: 'info@cedarhillfarms.com',
      firstName: 'Michael',
      lastName: 'Davis',
      middleName: 'R',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18005550000',
    },
    providerCompanyId: 'FM12345',
    tags: [
      {
        tagCategoryName: 'Crop',
        tagName: 'Peanuts',
      },
    ],
  },
]

export const sampleCustomers2 = [
  {
    companyName: 'Green Acres Farm Management',
    customerTags: [{ customer: 'HighValued' }, { customer: 'LongTerm' }],
    extendedProperties: {
      test: 'This is a test',
    },
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '1204 Oak Drive',
        addressLine2: null,
        city: 'Springfield',
        country: 'USA',
        postalCode: '62701',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'john@greenacres.com',
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'H',
    },
    phoneNumber: {
      phoneNumberType: PhoneNumberType.WORK,
      phoneNumber: '+18001234567',
    },
    providerCompanyId: 'GA12345',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Silver',
      },
    ],
  },
  {
    companyName: 'Meadowbrook Farms',
    customerTags: [{ customer: 'New' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '356 Meadow Lane',
        addressLine2: null,
        city: 'Peoria',
        country: 'USA',
        postalCode: '61602',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'jane@meadowbrook.com',
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: 'A',
    },
    phoneNumber: {
      PhoneNumber: '+18002345678',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'MF12345',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Gold',
      },
    ],
  },
  {
    companyName: 'Sunnyfield Farmers',
    customerTags: [{ customer: 'HighValued' }, { customer: 'LongTerm' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '789 Sunshine Ave',
        addressLine2: null,
        city: 'Chicago',
        country: 'USA',
        postalCode: '60601',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'mark@sunnyfield.com',
      firstName: 'Mark',
      lastName: 'Brown',
      middleName: 'C',
    },
    phoneNumber: {
      phoneNumber: '+18003456789',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'SF12345',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Silver',
      },
    ],
  },
  {
    companyName: 'James Thompson - Proprietor',
    customerTags: [{ customer: 'New' }, { customer: 'HighValued' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '123 Maple Street',
        addressLine2: null,
        city: 'Rockford',
        country: 'USA',
        postalCode: '61101',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'james@thompsonfarm.com',
      firstName: 'James',
      lastName: 'Thompson',
      middleName: 'E',
    },
    phoneNumber: {
      phoneNumber: '+18004567890',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'JT12345',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Silver',
      },
    ],
  },
  {
    companyName: 'Riverdale Farming Co.',
    customerTags: [{ customer: 'LongTerm' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '456 Riverside Dr',
        addressLine2: null,
        city: 'Joliet',
        country: 'USA',
        postalCode: '60431',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'lisa@riverdale.com',
      firstName: 'Lisa',
      lastName: 'White',
      middleName: 'G',
    },
    phoneNumber: {
      phoneNumber: '+18005678901',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'RF12345',
    tags: [
      {
        tagCategoryName: 'Customer Level',
        tagName: 'Platinum',
      },
    ],
  },
  {
    companyName: 'Brightview Farm Management',
    customerTags: [{ customer: 'New' }, { customer: 'HighValued' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '789 Hilltop Street',
        addressLine2: null,
        city: 'Naperville',
        country: 'USA',
        postalCode: '60540',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'robert@brightview.com',
      firstName: 'Robert',
      lastName: 'Black',
      middleName: 'I',
    },
    phoneNumber: {
      phoneNumber: '+18006789012',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'BF12345',
  },
  {
    companyName: 'Emerald Grains',
    customerTags: [{ customer: 'HighValued' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '321 Green Rd',
        addressLine2: null,
        city: 'Aurora',
        country: 'USA',
        postalCode: '60502',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'susan@emeraldgrains.com',
      firstName: 'Susan',
      lastName: 'Green',
      middleName: 'K',
    },
    phoneNumber: {
      phoneNumber: '+18007890123',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'EG12345',
  },
  {
    companyName: 'Oliver Peterson - Proprietor',
    customerTags: [{ customer: 'LongTerm' }, { customer: 'HighValued' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '456 Birch Avenue',
        addressLine2: null,
        city: 'Elgin',
        country: 'USA',
        postalCode: '60120',
        state: 'Illinois',
      },
    },
    contactPerson: {
      email: 'oliver@petersonfarm.com',
      firstName: 'Oliver',
      lastName: 'Peterson',
      middleName: 'M',
    },
    phoneNumber: {
      phoneNumber: '+18008901234',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'OP12345',
  },
  {
    companyName: 'AgriCo Farm Management',
    customerTags: [{ customer: 'HighValued' }, { customer: 'LongTerm' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '123 Farm Lane',
        addressLine2: '',
        city: 'Middletown',
        country: 'USA',
        postalCode: '78654',
        state: 'Kentucky',
      },
    },
    contactPerson: {
      email: 'john@agricofarm.com',
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'A',
    },
    phoneNumber: {
      phoneNumber: '5021234567',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'PRV001',
  },
  {
    companyName: 'Golden Grains Co.',
    customerTags: [{ customer: 'HighValued' }, { customer: 'LongTerm' }],
    address: {
      addressType: AddressType.BILLING,
      address: {
        addressLine1: '8905 Sunset Blvd',
        addressLine2: null,
        city: 'Hollywood',
        country: 'USA',
        postalCode: '90028',
        state: 'California',
      },
    },
    contactPerson: {
      email: 'jane@goldengrains.com',
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: null,
    },
    phoneNumber: {
      phoneNumber: '+13105550152',
      phoneNumberType: PhoneNumberType.WORK,
    },
    providerCompanyId: 'GGC002',
  },
]
