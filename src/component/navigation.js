import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";
import {
  DropdownButton,
  Dropdown,
  Button,
  Col,
  Modal,
  Container,
  Row,
  InputGroup,
  FormGroup,
  FormControl
} from "react-bootstrap";
import altaCarrera from "./alta_carrera";
import lista_carreras from "./lista_carreras";
import modificarCarrera from "./modificar_carrera";
import eliminarCarrera from "./eliminar_carrera";
import alumno from "./alumno";
import Inicio from "./inicio";
import altaMateria from "./altaMateria";
import docente from "./docente";

import styles from "../estilos/navigation.module.css";
import { server } from "../config/config";

import alta_carrera from "./alta_carrera";

import Login from "./login";
import Signup from "./signup";

class Cabecera extends Component {
  constructor() {
    super();

    this.state = {
      session: JSON.parse(sessionStorage.getItem("session")),
      nuevocambios: true,
      nuevonombre: "",
      nuevoapellido: "",
      nuevoemail: "",
      nuevocedula: "",
      nuevaPass: "",
      contraseñaActual: ""
    };
    if (this.state.session) {
      this.state.nuevoapellido = this.state.session.apellido;
      this.state.nuevonombre = this.state.session.nombre;
      this.state.nuevocedula = this.state.session.cedula;
      this.state.nuevoemail = this.state.session.email;
    }
  }

  cerrarSession = () => {
    sessionStorage.removeItem("session");
    window.location.reload();
  };

  onChange = e => {
    this.state.nuevocambios = false;
    this.setState({ [e.target.name]: e.target.value });
  };

  iniciarSession = () => {
    alert("asdasd");
  };

  enviarADocentes = () =>{

  }

  closeModalPass = () => {
    this.setState({ modalPass: false });
  };

  openModalPerfil = () => {
    this.setState({ modalPerfil: true });
  };

  closeModalPerfil = () => {
    this.setState({ modalPerfil: false });
  };

  closeModalPass = () => {
    this.setState({ modalPass: true });
  };

  guardarnuevoDatos = () => {
    ///funcion que guarda los datos que el usuario edita de su perfik
    const {
      nuevonombre,
      nuevoapellido,
      nuevoemail,
      nuevocedula,
      session
    } = this.state;
    console.log(nuevonombre, nuevoapellido, nuevoemail, nuevocedula);

    var data = new URLSearchParams();
    data.append("cedula", nuevocedula);
    data.append("correo", nuevoemail);
    data.append("apellido", nuevoapellido);
    data.append("nombre", nuevonombre);

    var url;
    if (session.tipo == 1) {
      url = server.api + "estudiantes/update";
    } else if (session.tipo == 2) {
      url = server.api + "docentes/update";
    } else {
      url = server.api + "administrador/update";
    }

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    })
      .then(function(res) {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.retorno == true) {
          // window.location.reload();
          console.log("actualizadoss")
          sessionStorage.setItem("session", JSON.stringify(data.user));
          this.state.session = JSON.parse(sessionStorage.getItem("session"));
          this.closeModalPerfil();
        } else {
          alert(data.mensaje);
        }
      })
      .catch(function(res) {
        console.log("res", res);
      });
  };

  enviarCambioPass = () => {
    ///funcion que guarda los datos que el usuario edita de su perfik
    const { nuevaPass, contraseñaActual, session } = this.state;
    console.log(nuevaPass, contraseñaActual);

    var data = new URLSearchParams();
    data.append("passvieja", contraseñaActual);
    data.append("nuevapass", nuevaPass);
    data.append("cedula", session.cedula);

    var url;
    if (session.tipo == 1) {
      url = server.api + "estudiantes/updatepass";
    } else if (session.tipo == 2) {
      url = server.api + "docentes/updatepass";
    } else {
      url = server.api + "administrador/updatepass";
    }

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    })
      .then(function(res) {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.retorno == true) {
          sessionStorage.removeItem("session");
          window.location.reload();
        } else {
          alert(data.mensaje);
        }
      })
      .catch(function(res) {
        console.log("res", res);
      });
  };

  render() {
    const { session, nuevocambios } = this.state;

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
              <li class="nav-item">
                <NavLink className={styles.links} onClick={this.mostrarsession}>
                  Alta materia
                </NavLink>
                <NavLink className={styles.links} to="/docentes">
                  Docentes
                </NavLink>
              </li>
            
            </ul>
          </div>
          {!this.state.session ? (
            <button onClick={this.iniciarSession}>Ingresar</button>
          ) : (
            <DropdownButton
              drop="left"
              id="dropdown-basic-button"
              title={session.nombre + " " + session.apellido}
            >
              <Dropdown.Item onClick={this.openModalPerfil}>
                Mi cuenta
              </Dropdown.Item>
              <Dropdown.Item onClick={this.openModalPass}>
                Modificar contraseña
              </Dropdown.Item>
              <Dropdown.Divider />
              <Col>
                <Button onClick={this.cerrarSession} variant="outline-danger">Cerrar sesión</Button>
              </Col>
            </DropdownButton>
          )}

          <Modal
            show={this.state.modalPerfil}
            onHide={this.closeModalPerfil}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Mi perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <InputGroup className="mb-1">
                  <FormControl
                    onChange={this.onChange}
                    value={this.state.nuevoemail}
                    name="nuevoemail"
                    placeholder="Email"
                    aria-label=""
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
                <InputGroup className="mb-1">
                  <FormControl
                    onChange={this.onChange}
                    value={this.state.nuevocedula}
                    name="nuevocedula"
                    placeholder="Cédula"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <FormControl
                    onChange={this.onChange}
                    value={this.state.nuevonombre}
                    name="nuevonombre"
                    placeholder="Nombre"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <FormControl
                    onChange={this.onChange}
                    value={this.state.nuevoapellido}
                    name="nuevoapellido"
                    placeholder="Apellido"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModalPerfil}>
                Close
              </Button>
              <Button
                disabled={nuevocambios}
                variant="primary"
                onClick={this.guardarnuevoDatos}
              >
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.modalPass}
            onHide={this.closeModalPass}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Cambio de contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-1">
                <FormControl
                  onChange={this.onChange}
                  value={this.state.contraseñaActual}
                  name="contraseñaActual"
                  placeholder="Contraseña actual"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <FormControl
                  onChange={this.onChange}
                  value={this.state.nuevaPass}
                  name="nuevaPass"
                  placeholder="Nueva contraseña"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModalPass}>
                Close
              </Button>
              <Button variant="primary" onClick={this.enviarCambioPass}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
        </nav>
        <Route
          exact
          path="/"
          component={() => {
            if (!this.state.session) {
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
        <Route path="/docentes" component={docente} />

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
