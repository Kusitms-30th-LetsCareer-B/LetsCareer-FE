/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxlarge': '36px',  // Xxlarge
        'xlarge': '32px',   // Xlarge
        'large': '26px',    // Large
        'medium': '24px',   // Medium
        'small': '20px',    // Small
        'xsmall': '14px',
        'xxsmall': '12px',  // Xxsmall
      },
      letterSpacing: {
        '-2.8': '-0.028em', // -2.8% letter spacing
        '-2.6': '-0.026em', // -2.6%
        '-2.5': '-0.025em', // -2.5%
        '-2.4': '-0.024em', // -2.4%
        '-2.2': '-0.022em', // -2.2%
        '-2.0': '-0.020em', // -2.0%
        '-1.6': '-0.016em', // -1.6%
        '-1.5': '-0.015em', // -1.5%
        '-1.2': '-0.012em', // -1.2%
        '-0.9': '-0.009em', // -0.9%
        '-0.6': '-0.006em', // -0.6%
      },
      fontWeight: {
        semibold: '600',
        medium: '500',
        light: '300',
        bold: '700',
      },
      lineHeight: {
        '48': '48px',
        '42': '42px',
        '38': '38px',
        '34': '34px',
        '32': '32px',
        '30': '30px',
        '28': '28px',
        '26': '26px',
        '24': '24px',
        '22': '22px',
        '20': '20px',
        '18': '18px',
      },
      borderRadius: {
        'xxs': '4px',
        's': '8px',
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
        
        teritory: {
          'light': '#FBF2FF',
          'normal': '#CB81F2',
        },
        
        fourth: {
          'normal': '#FFC700',
        },
        
        point: {
          'normal': '#DAFF7C',
        },
        
        system: {
          'positive_green': '#1BC47D',
          'positive_blue': '#5177FF',
          'error': '#F64E39',
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