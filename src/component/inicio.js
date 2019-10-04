import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import alumno from "./alumno";
import PublicRoute from "./ruta_publica";
import $ from "jquery";
import { server } from "../config/config";
import "../estilos/inicio.css";

class Inicio extends Component {
  constructor() {
    super();
    this.state = {
      session: JSON.parse(sessionStorage.getItem("session"))
    };
  }

  render() {
    const { session } = this.state;
    return (
      <>
        <div class="contenedorInicio">
        </div>
      </>
    );
  }
}

export default Inicio;
