import React, { Component, View, Text } from "react";
import styles from "../estilos/lista_carreras.module.css";
import { server } from "../config/config";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

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

class ListaMaterias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(sessionStorage.getItem("session")),
      lista_carrera: "",
      lista: "",
      listarMaterias: "",
      modalVincular: false
    };
  }

  cerrarModal = () => {
    this.setState({ modalVincular: false });
  };

  abrirModal = () => {
    this.setState({ modalVincular: true });
  };

  promesa = async () => {
    const { session } = this.state;
    return new Promise(function(resolve, reject) {
      var datos = new URLSearchParams();
      datos.append("id", session._id);
      console.log("datos", session._id);
      fetch(server.api + "materia/listarMaterias", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: datos
      })
        .then(res => {
          return res.json();
        })
        .then(async data => {
          resolve(data);
        });
    });
  };

  promesaListarTodasMaterias = async () => {
    const { session } = this.state;
    return new Promise(function(resolve, reject) {
      fetch(server.api + "materia/listarTodasMaterias", {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(async data => {
          resolve(data);
        });
    });
  };

  promesa_eliminar = async id => {
    return new Promise(function(resolve, reject) {
      var data = new URLSearchParams();
      data.append("id", id);
      fetch(server.api + "carrera/EliminarCarrera", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
      })
        .then(function(res) {
          return res;
        })
        .then(async data => {
          resolve(data);
        });
    });
  };

  desvincularme = id => {
    this.promesa_eliminar(id).then(data => {
      console.log(data);
    });
  };

  Listar = () => {
    this.promesa().then(data => {
      console.log("largo", data.materias.length);
      if (data.materias.length > 0) {
        var ret = data.mensaje.map((data, i) => {
          return (
            <tr id={i}>
              <td>{data.nombre_carrera}</td>
              <td>
                <button
                  onClick={() => this.eliminar_id(data._id)}
                  className="btn btn-info"
                >
                  Eliminar
                </button>
                <button className="btn btn-info">Modificar</button>
              </td>
            </tr>
          );
        });
        this.setState({ lista: ret });
      } else {
          return <div>Lista vacia</div>;
        
      }
    });
  };

  ListarTodasMaterias = () => {
    this.promesaListarTodasMaterias().then(data => {
      console.log("Todas las materias", data);
      if (data.length > 0) {
        var ret = data.mensaje.map((data, i) => {
          return (
            <tr id={i}>
              <td>{data.nombre_carrera}</td>
              <td>
                <button
                  onClick={() => this.desvincularme(data._id)}
                  className="btn btn-info"
                >
                  Eliminar
                </button>
                <button className="btn btn-info">Modificar</button>
              </td>
            </tr>
          );
        });
        this.setState({ lista: ret });
      } else {
        return <div>Lista vacia</div>;
      }
    });
  };

  componentDidMount() {
    this.Listar();
    this.ListarTodasMaterias();
  }

  render() {
    const { modalVincular } = this.state;

    return (
      <>
        <div className={styles.tabla_carreras}>
          <h1 className={styles.titulo_carreras}>Lista de materias</h1>
          <NavLink
            style={{ fontSize: 20 }}
            className={styles.links}
            onClick={this.abrirModal}
          >
            Vincularme a materia
          </NavLink>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>{this.state.lista ? this.state.lista : "cargando"}</tbody>
          </table>
        </div>

        <Modal show={modalVincular} onHide={this.cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.listarMaterias
                  ? this.state.listarMaterias
                  : "cargando"}
              </tbody>
            </table>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ListaMaterias;
