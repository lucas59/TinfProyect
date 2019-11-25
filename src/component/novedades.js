import React, { Component, View, Text } from "react";
import styles from "../estilos/lista_carreras.module.css";
import { server } from "../config/config";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
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
  FormControl,
  Form
} from "react-bootstrap";
var show = false;

const handleClose = () => (show = false);
const handleShow = () => (show = true);

class Novedades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(sessionStorage.getItem("session")),
      lista: "",
      modalAdd: false,
      titulo: "",
      cuerpo: "",
      contacto: "",
      novedades: "",
      modalView: false
    };
  }

  crearNovedad = () => {
    const { titulo, cuerpo, contacto } = this.state;
    var data = new URLSearchParams();
    data.append("titulo", titulo);
    data.append("cuerpo", cuerpo);
    data.append("contacto", contacto);
    fetch(server.api + "carrera/nuevaNovedad", {
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
          NotificationManager.success(data.mensaje, "Aviso");
          this.closeModalAdd();
        } else {
          NotificationManager.error(data.mensaje, "Error");
        }
        this.Listar();
      })
      .catch(function(res) {
        console.log("res", res);
        this.closeModalAdd();
      });
  };

  closeModalAdd = () => {
    this.setState({ modalAdd: false });
  };

  promesa = async () => {
    return new Promise(function(resolve, reject) {
      fetch(server.api + "carrera/novedades", {
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

  visualizar = id => {
    var dateFormat = require("dateformat");

    const { novedades } = this.state;
    console.log(novedades);
    novedades.forEach(element => {
      if (element._id == id) {
        var fecha = dateFormat(element.fecha, "yyyy-mm-dd h:MM:ss");
        this.setState({ titulo: element.titulo });
        this.setState({ cuerpo: element.cuerpo });
        this.setState({ contacto: element.contacto });
        this.setState({ fecha: fecha });
        this.abrirModalVista();
      }
    });
  };

  abrirModalVista = () => {
    this.setState({ modalView: true });
  };
  cerrarModalView = () => {
    this.setState({ modalView: false });
  };

  promesa_eliminar = async id => {
    return new Promise(function(resolve, reject) {
      var data = new URLSearchParams();
      data.append("id", id);
      fetch(server.api + "carrera/eliminarNovedad", {
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
        .then(async data => {
          resolve(data);
        });
    });
  };

  eliminar_id = id => {
    this.promesa_eliminar(id).then(data => {
      if (data.retorno == true) {
        NotificationManager.success(data.mensaje, "Aviso");
      } else {
        NotificationManager.error("Error al eliminar la novedad", "Error");
      }
      this.Listar();
    });
  };
  agregarMateria = id => {
    sessionStorage.setItem("idCarrera", id);
    window.location.replace("http://localhost:3000/altaMateria");
  };
  abrirModal = () => {
    this.setState({ modalAdd: true });
  };

  Listar = () => {
    this.promesa().then(data => {
      var dateFormat = require("dateformat");
      if (data.novedades.length > 0) {
        this.setState({ novedades: data.novedades });
        var ret = data.novedades.map((data, i) => {
          var fecha = dateFormat(data.fecha, "yyyy-mm-dd h:MM:ss");
          return (
            <tr id={i}>
              <td>{data.titulo}</td>
              <td>{data.cuerpo}</td>
              <td>{data.contacto}</td>
              <td>{fecha}</td>

              <td>
                <button
                  onClick={() => this.eliminar_id(data._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => this.visualizar(data._id)}
                  className="btn btn-info"
                >
                  Ver
                </button>
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
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { modalAdd, modalView } = this.state;
    return (
      <>
        <NotificationContainer />
        <div className={styles.tabla_carreras}>
          <h1 className={styles.titulo_carreras}>Lista de novedades</h1>
        
          <Button
            className="btn btn-info"
            style={{ fontSize: 20 }}
            onClick={this.abrirModal}
            style={{ marginBottom: 10 }}
          >
            Agregar novedad
                </Button>
          <Paper
            ref={this.chat}
          >
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Contenido</th>
                <th>Contacto</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.state.lista ? this.state.lista : "Lista vacía"}</tbody>
            </table>
            </Paper>
        </div>

        <Modal show={modalAdd} onHide={this.closeModalAdd} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva novedad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.titulo}
                name="titulo"
                placeholder="Titulo"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <Form.Control
                onChange={this.onChange}
                value={this.state.cuerpo}
                name="cuerpo"
                as="textarea"
                rows="3"
                placeholder="Descripción"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.contacto}
                name="contacto"
                placeholder="Contacto"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cloaseModalAdd}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.crearNovedad}>
              Crear
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalView} onHide={this.cerrarModalView} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva novedad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-1">
              <FormControl
                value={this.state.titulo}
                name="titulo"
                placeholder="Titulo"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <Form.Control
                value={this.state.cuerpo}
                name="cuerpo"
                as="textarea"
                rows="3"
                placeholder="Descripción"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                value={this.state.contacto}
                name="contacto"
                placeholder="Contacto"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                value={this.state.fecha}
                name="fecha"
                placeholder="Fecha"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cerrarModalView}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Novedades;
