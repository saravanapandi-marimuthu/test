/** @type {import('tailwindcss').Config} */
// Palette 9
// Primary
const lightBlueVivid = {
  50: '#E3F8FF',
  100: '#B3ECFF',
  200: '#81DEFD',
  300: '#5ED0FA',
  400: '#40C3F7',
  500: '#2BB0ED',
  600: '#1992D4',
  700: '#127FBF',
  800: '#0B69A3',
  900: '#035388',
}

// Neutrals
const coolGrey = {
  50: '#F5F7FA',
  100: '#E4E7EB',
  200: '#CBD2D9',
  300: '#9AA5B1',
  400: '#7B8794',
  500: '#616E7C',
  600: '#52606D',
  700: '#3E4C59',
  800: '#323F4B',
  900: '#1F2933',
}

// Supporting
const pinkVivid = {
  50: '#FFE3EC',
  100: '#FFB8D2',
  200: '#FF8CBA',
  300: '#F364A2',
  400: '#E8368F',
  500: '#DA127D',
  600: '#BC0A6F',
  700: '#A30664',
  800: '#870557',
  900: '#620042',
}

const redVivid = {
  50: '#FFE3E3',
  100: '#FFBDBD',
  200: '#FF9B9B',
  300: '#F86A6A',
  400: '#EF4E4E',
  500: '#E12D39',
  600: '#CF1124',
  700: '#AB091E',
  800: '#8A041A',
  900: '#610316',
}
const yellowVivid = {
  50: '#FFFBEA',
  100: '#FFF3C4',
  200: '#FCE588',
  300: '#FADB5F',
  400: '#F7C948',
  500: '#F0B429',
  600: '#DE911D',
  700: '#CB6E17',
  800: '#B44D12',
  900: '#8D2B0B',
}
const tealVivid = {
  50: '#EFFCF6',
  100: '#C6F7E2',
  200: '#8EEDC7',
  300: '#65D6AD',
  400: '#3EBD93',
  500: '#27AB83',
  600: '#199473',
  700: '#147D64',
  800: '#0C6B58',
  900: '#014D40',
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'vivid-light-blue': lightBlueVivid,
        'vivid-gray': coolGrey,
        'vivid-pink': pinkVivid,
        'vivid-red': redVivid,
        'vivid-yellow': yellowVivid,
        'vivid-teal': tealVivid,
      },
      textColor: {
        'vivid-light-blue': lightBlueVivid,
        'vivid-gray': coolGrey,
        'vivid-pink': pinkVivid,
        'vivid-red': redVivid,
        'vivid-yellow': yellowVivid,
        'vivid-teal': tealVivid,
      },
      borderColor: {
        'vivid-light-blue': lightBlueVivid,
        'vivid-gray': coolGrey,
        'vivid-pink': pinkVivid,
        'vivid-red': redVivid,
        'vivid-yellow': yellowVivid,
        'vivid-teal': tealVivid,
      },
    },
  },
  plugins: [],
}
