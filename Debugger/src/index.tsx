import * as React from "react"
import * as ReactDom from "react-dom"
import App from './App';

const start = async (event:any) => {

  ReactDom.render(
      <App />,
      document.getElementById("root")
  );
}

window.addEventListener('load', start);