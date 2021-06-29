import { DefaultTheme } from 'styled-components';

export const calcRem = (size: number) => `${size / 16}rem`;

export const theme: DefaultTheme = {
  boxShadow: {
    skyblue: '0 0 0 1px rgba(18, 100, 163, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)',
    darkgray: '0 0 4px 10px rgba(0, 0, 0, 0.03), 0 0 4px 10px rgba(0, 0, 0, 0.03)',
    black: '0 0 8px 8px rgba(0, 0, 0, 0.3), 0 0 8px 8px rgba(0, 0, 0, 0.3)',
    bottomRed: '0 4px 2px -2px rgb(240, 115, 98)',
    bottomSkyBlue: '0 4px 2px -2px rgb(0, 115, 198)',
  },
  color: {
    main: '#4a154b',
    lightBlack: '#1d1c1d',
    black1: '#111',
    black2: '#222',
    black3: '#333',
    black4: '#444',
    black5: '#555',
    black6: '#666',
    black7: '#777',
    black8: '#888',
    black9: '#999',

    gray1: '#aaa',
    gray2: '#bbb',
    gray3: '#ccc',
    gray4: '#ddd',
    gray5: '#eee',
    gray6: '#fff',

    lightGray1: '#d0d0d0',
    lightGray2: '#e0e0e0',
    lightGray3: '#f0f0f0',

    purple1: '#350d36',
    purple2: '#3f0e40',
    purple3: '#431e44',

    green1: '#007a5a',
    green2: '#008a6a',
    green3: '#25D179',

    white: '#fff',

    red1: '#f07362',

    blue1: '#0073c6',
    blue2: '#1164a3',
    blue3: '#0b4c8c',
    blue4: '#337ab7',
    modalWhite: '#f9f9f9',
    semiWhite: '#fafbfc',

    yellow: '#e8912d',
    warningRed: '#D73A49',
    onConnect: '#2bac76',

    channelItemColor: '#bcabbc',
    channelBorder: 'rgb(82,38,83)',
    threadHover: '#faf9f9',
    googleColor: '#4285f4',

    darkBlue1: '#2D353C',
    darkBlue2: '#4F5B69',
    lightBlue: '#BEDFEC',
    coralBlue: '#70B2E6',

    jade: '#36ACAC',
  },
  size: {
    font: {
      xxxs: calcRem(8),
      xxs: calcRem(10),
      xs: calcRem(12),
      s: calcRem(14),
      m: calcRem(16),
      l: calcRem(18),
      xl: calcRem(20),
      xxl: calcRem(22),
      xxxl: calcRem(24),
    },
    padding: {
      xxxs: calcRem(8),
      xxs: calcRem(10),
      xs: calcRem(12),
      s: calcRem(14),
      m: calcRem(16),
      l: calcRem(18),
      xl: calcRem(20),
      xxl: calcRem(22),
      xxxl: calcRem(24),
    },
    height: {
      m: calcRem(40),
    },
    border: {
      defaultThick: calcRem(1),
      defaultBorderRadius: calcRem(5),
      BorderRightleftSideBarItem: calcRem(16),
    },
    shadow: {
      blur: calcRem(3),
      spread: calcRem(1),
    },
  },
  fontWeight: {
    bold: 600,
  },
};
