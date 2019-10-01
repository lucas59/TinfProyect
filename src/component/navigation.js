import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";
import lista_carreras from "./lista_carreras";
import modificarCarrera from "./modificar_carrera";
import eliminarCarrera from "./eliminar_carrera";
import alumno from "./alumno";
import Inicio from "./inicio";
import altaMateria from "./altaMateria";
import styles from "../estilos/navigation.module.css";
import alta_carrera from "./alta_carrera";

import Login from "./login";
import Signup from "./signup";

class Cabecera extends Component {
  constructor() {
    super();

    this.state = {
      session: null
    };

    if (sessionStorage.getItem("session")) {
      this.state = sessionStorage.getItem("session");
    }
  }

  cerrarSession = () => {
    sessionStorage.removeItem("session");
    window.location.reload();
  };

  iniciarSession = () => {
    alert("asdasd");
  };

  render() {
    return (
      <Router>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <NavLink class="navbar-brand" style={{ color: "white" }} to="/">
            Inicio
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink className={styles.links} to="/lista_carreras">
                  Carreras
                </NavLink>
              </li>
            
            </ul>
          </div>
          {!sessionStorage.getItem("session") ? (
            <button onClick={this.iniciarSession}>Ingresar</button>
          ) : (
            <button onClick={this.cerrarSession}>Cerrar session</button>
          )}
        </nav>

        <Route
          exact
          path="/"
          component={() => {
            if (!sessionStorage.getItem("session")) {
              return <Login />;
            } else {
              return <Inicio />;
            }
          }}
        />

        <Route path="/lista_carreras" component={lista_carreras} />
        <Route path="/alta_carrera" component={alta_carrera} />
        <Route path="/modificarCarrera" component={modificarCarrera} />
        <Route path="/eliminarCarrera" component={eliminarCarrera} />
        <Route path="/alumno" component={alumno} />
        <Route path="/altaMateria" component={altaMateria} />

        <Route
          path="/registrarse"
          component={() => {
            if (sessionStorage.getItem("session")) {
              return <Inicio />;
            } else {
              return <Signup />;
            }
          }}
        />

        <Route
          path="/ingresar"
          component={() => {
            if (sessionStorage.getItem("session")) {
              return <Inicio />;
            } else {
              return <Login />;
            }
          }}
        />
      </Router>
    );
  }
}

export default Cabecera;
