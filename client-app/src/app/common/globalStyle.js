import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   form > label {
    width: 100%;
    margin-bottom: 5px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.65rem;
    color: rgb(185, 187, 190);
  }
   form > input {
    width: 100%;
    padding: 7px 10px;
    color: white;
    margin-top: 5px;
    font-size: 1rem;
    background: rgb(49, 51, 57);
    border: 1px solid rgb(34, 36, 40);
    border-radius: 5px;
    outline: none;
    &:focus {
      border: 1px solid rgb(113, 135, 221);
    }
  }
  form > h3 {
    color: rgb(102, 119, 189);
    font-size: 0.7rem;
    margin-top: 5px;
    cursor: pointer;
  }
`;
