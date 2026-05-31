import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: light;
  }

  body {
    margin: 0;
    padding: 80px 0 0 0 !important;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    color: ${({ theme }) => theme.colors.grayScale["01"]};
    background-color: ${({ theme }) => theme.colors.grayScale["11"]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryScale["400"]};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.xs};
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.primaryScale["100"]};
    color: ${({ theme }) => theme.colors.primaryScale["900"]};
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export default GlobalStyle;
