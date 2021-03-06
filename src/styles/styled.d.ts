import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    boxShadow: {
      skyblue: string;
      darkgray: string;
      black: string;
      bottomSkyBlue: string;
      bottomRed: string;
      thinDarkGray: string;
    };

    color: {
      main: string;
      lightBlack: string;
      black1: string;
      black2: string;
      black3: string;
      black4: string;
      black5: string;
      black6: string;
      black7: string;
      black8: string;
      black9: string;

      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;

      lightGray1: string;
      lightGray2: string;
      lightGray3: string;

      purple1: string;
      purple2: string;
      purple3: string;

      white: string;
      semiWhite: string;
      modalWhite: string;

      green1: string;
      green2: string;
      green3: string;

      blue1: string;
      blue2: string;
      blue3: string;
      blue4: string;

      red1: string;

      yellow: string;
      warningRed: string;
      onConnect: string;

      channelItemColor: string;
      channelBorder: string;
      threadHover: string;
      googleColor: string;

      darkBlue1: string;
      darkBlue2: string;
      lightBlue: string;
      coralBlue: string;

      jade: string;
    };

    size: {
      font: {
        xxxs: string;
        xxs: string;
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      padding: {
        xxxs: string;
        xxs: string;
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      height: {
        m: string;
      };
      border: {
        defaultThick: string;
        defaultBorderRadius: string;
        BorderRightleftSideBarItem: string;
      };
      shadow: {
        blur: string;
        spread: string;
      };
    };

    fontWeight: {
      bold: number;
    };
  }
}
