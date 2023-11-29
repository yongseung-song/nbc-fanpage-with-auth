import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const fontFamily = "NanumSquareNeo-Variable";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  body * {
    font-family: ${fontFamily};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  h1 {
    font-variation-settings: "wght" 700;
    font-size: 3rem;
  }
  h3 {
    font-weight: 600;
  }
  label {
    font-size: 0.8rem;
  }
  input {
    width: 89%;
  }
  select {
    padding: 4px;
    margin-top: -5px;
    border-radius: 4px;
    border:1px solid #0008;
    &:focus {
      outline: none;
      background-color: #feffd0bf;
    }
  }
  textarea {
    resize: none;
    width: 89%;
    line-height: 1.5;
  }
  button {
    display: block;
    width: 100px;
    border: none;
    align-items: center;
    background-color: white;
  }

  footer {
    font-size: 0.8rem;
  }
`;

export default GlobalStyle;
