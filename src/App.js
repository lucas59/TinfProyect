import React, { Component } from "react";
import Cabecera from "./component/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./estilos/generales.css";
class App extends Component {
  constructor() {
    super();
    this.state = { usuario: "" };
  }

  render() {
    return (
      <body
        className="body"
      >
        <Cabecera />
      </body>
    );
  }
}

export default App;
