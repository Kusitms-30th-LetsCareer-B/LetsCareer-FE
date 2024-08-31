/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'xxs': '4px',
      },
      colors:{
        static: {
          100: '#FFFFFF',
        },
        primary: {
          100: '#4D55F5',
          90: '#6269F6',
          80: '#7177F7',
          70: '#8288F8',
          60: '#9499F9',
          50: '#A6AAFA',
          40: '#B8BBFB',
          30: '#CACCFC',
          20: '#DBDDFD',
          10: '#EDEEFE',
          0:  '#FFFFFF',
        },
        
        secondary: {
          100: '#1BC47D',
          90: '#32CA8A',
          80: '#49D097',
          70: '#60D6A4',
          60: '#76DCB1',
          50: '#8DE1BE',
          40: '#8CE1BD',
          30: '#BBEED8',
          20: '#D1F3E5',
          10: '#E9FAF2',
          0:  '#FFFFFF',
        },
        
        tertiary: {
          normal: '#CB81F2',
        },
        
        fourth: {
          normal: '#FFC700',
        },
        
        point: {
          normal: '#DAFF7C',
        },
        
        system: {
          positive_green: '#1BC47D',
          positive_blue: '#5177FF',
          error: '#F64E39',
        },
        
        neutral: {
          0: '#27272D',
          10: '#2A2D34',
          20: '#3E4148',
          30: '#4C4F56',
          35: '#5C5F66',
          40: '#7A7D84',
          45: '#989BA2',
          50: '#ACAFB6',
          60: '#BDBDBD',
          70: '#CFCFCF',
          75: '#D8D8D8',
          80: '#E7E7E7',
          85: '#EFEFEF',
          90: '#F3F3F3',
          95: '#F9F9F8',
          100: '#FAFAFA',
        },
      }
    },
  },
  plugins: [],
}