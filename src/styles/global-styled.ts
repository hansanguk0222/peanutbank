import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        height: 100vh;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
    }
`;
