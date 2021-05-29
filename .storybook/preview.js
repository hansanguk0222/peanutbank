import React from 'react';
import { theme } from '../src/styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../src/styles/global-styled';
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
