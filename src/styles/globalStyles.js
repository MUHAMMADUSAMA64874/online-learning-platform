import { createglobalStyle } from 'styled-components';

const globalStyles = createglobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    color: #343a40;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0.5em 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 0.5em 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0.5em 0;
  }

  button:hover {
    background-color: #0056b3;
  }

  input {
    padding: 0.5em;
    margin: 0.5em 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1em;
  }

  .card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default globalStyles;
