'use client';

import {Card, Loader, createTheme} from '@mantine/core';
import {Lexend_Deca, Source_Code_Pro, Noto_Serif_JP} from 'next/font/google';

const lexendDeca = Lexend_Deca({
  subsets: ['latin']
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin']
})

const notoSerifJP = Noto_Serif_JP({
  weight: '500',
  subsets: ['latin']
})

export const theme = createTheme({
  white: '#FFFFFF',
  black: '#001E2B',
  colors: {
    gray: [
      '#F9FBFA',
      '#E8EDEB',
      '#C1C7C6',
      '#889397',
      '#889397',
      '#5C6C75',
      '#3D4F58',
      '#1C2D38',
      '#112733'
    ],
    green: [
      '#E3FCF7',
      '#C0FAE6', 
      '#71F6BA', 
      '#00ED64', 
      '#00ED64', 
      '#00ED64', 
      '#00A35C', 
      '#00684A', 
      '#023430'
    ],
    purple: [
      '#F9EBFF',
      '#F1D4FD',
      '#F1D4FD',
      '#B45AF2',
      '#B45AF2',
      '#B45AF2',
      '#5E0C9E',
      '#5E0C9E',
      '#2D0B59'
    ],
    blue: [
      '#E1F7FF',
      '#C3E7FE',
      '#0498EC',
      '#016BF8',
      '#016BF8',
      '#016BF8',
      '#1254B7',
      '#083C90',
      '#0C2657'
    ],
    yellow: [
      '#FEF7DB',
      '#FFEC9E',
      '#FFEC9E',
      '#FFC010',
      '#FFC010',
      '#FFC010',
      '#944F01',
      '#944F01',
      '#4C2100'
    ],
    red: [
      '#FFEAE5',
      '#FFCDC7',
      '#FF6960',
      '#DB3030',
      '#DB3030',
      '#DB3030',
      '#970606',
      '#970606',
      '#5B0000'
    ]
  },
  primaryShade: {light: 4, dark: 6},
  primaryColor: 'green',
  fontFamily: lexendDeca.style.fontFamily,
  fontFamilyMonospace: sourceCodePro.style.fontFamily,
  headings: {
    fontFamily: notoSerifJP.style.fontFamily,
    fontWeight: "500"
  },
  components: {
    Card: Card.extend({
      defaultProps: {
        padding: "xl",
        radius: "xl",
        shadow: "sm",
        withBorder: true
      }
    }),
    Loader: Loader.extend({
      defaultProps: {
        color: "green.7"
      }
    })
  }
})