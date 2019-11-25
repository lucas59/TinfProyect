import React, { Component, View, Text } from "react";
import styles from "../estilos/lista_carreras.module.css";
import { server } from "../config/config";
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
var show = false;

const handleClose = () => (show = false);
const handleShow = () => (show = true);

class Lista_carreras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(sessionStorage.getItem("session")),
      lista_carrera: "",
      lista: "",
      modalUpdate: false,
      modalAlta: false,
      nombre: "",
      descripcion: "",
      egreso: "",
      ingreso: "",
      contacto: "",
      id_carrera: "",
      nombre: "",
      desc: "",
      perfil_ing: "",
      perfil_egr: "",
      cont: "",
      nombre_mod: "",
      desc_mod: "",
      perfil_ing_mod: "",
      perfil_egr_mod: "",
      cont_mod: ""
    };
  }

  Actualizar_carrera = () => {
    const { nombre, descripcion, egreso, ingreso, contacto } = this.state;
    var data = new URLSearchParams();
    data.append("id_carrera", this.state.id_carrera);
    data.append("nombre_carrera", nombre);
    data.append("descripcion_carrera", descripcion);
    data.append("perfilingreso_carrera", ingreso);
    data.append("perfilegreso_carrera", egreso);
    data.append("contactos_carrera", contacto);
    console.log(JSON.stringify(data));
    fetch(server.api + "carrera/modificarcarrera", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    })
      .then(function (res) {
        return res.json();
      })
      .then(data => {
        this.cloaseModalUpdate();
      })
      .catch(function (res) {
        console.log("res", res);
        this.cloaseModalUpdate();
      });
  };

  cloaseModalUpdate = () => {
    this.setState({ modalUpdate: false });
  };

  openModalUpdate = (nombre, desc, perfil_egr, perfil_ing, cont) => {
    this.setState({ modalUpdate: true });
    this.setState({ nombre_mod: nombre });
    this.setState({ desc_mod: desc });
    this.setState({ perfil_egr_mod: perfil_egr });
    this.setState({ perfil_ing: perfil_ing });
    this.setState({ cont_mod: cont });

  };

  cloaseModal_alta = () => {
    this.setState({ modalAlta: false });
  };

  openModal_alta = () => {
    this.setState({ modalAlta: true });
  };

  promesa = async () => {
    return new Promise(function (resolve, reject) {
      fetch(server.api + "carrera/listarCarreras", {
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
    return new Promise(function (resolve, reject) {
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
        .then(function (res) {
          return res;
        })
        .then(async data => {
          resolve(data);
        });
    });
  };

  Modificar_carrera = () => {
    var data = new URLSearchParams();
    const { nombre_mod, desc_mod, perfil_egr_mod, perfil_ing_mod, cont_mod } = this.state;
    data.append("nombre_carrera", nombre_mod);
    data.append("descripcion_carrera", desc_mod);
    data.append("perfilegreso_carrera", perfil_egr_mod);
    data.append("perfilingreso_carrera", perfil_ing_mod);
    data.append("contactos_carrera", cont_mod);
    fetch(server.api + "carrera/ModificarCarrera", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    })
      .then(function (res) {
        return res.json();
      })
      .then(data => {

        if (data.retorno == false) {
          NotificationManager.error(data.mensaje, "Error");
        } else {
          NotificationManager.success("Se modificó correctamente", "Exito");
          this.Listar();
          this.setState({ modalUpdate: false });
        }
      })
      .catch(function (res) {
        console.log("res", res);
      });
  }


  Alta_carrera = () => {
    console.log("entra");
    const { nombre, desc, perfil_egr, perfil_ing, cont } = this.state;
    console.log(nombre);
    console.log(desc);
    console.log(perfil_egr);
    console.log(perfil_ing);
    console.log(cont);
    var data = new URLSearchParams();
    data.append("nombre_carrera", nombre);
    data.append("descripcion_carrera", desc);
    data.append("perfilingreso_carrera", perfil_ing);
    data.append("perfilegreso_carrera", perfil_egr);
    data.append("contactos_carrera", cont);
    console.log(JSON.stringify(data));
    fetch(server.api + 'carrera/altaCarrera', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    })
      .then(function (res) {
        return res.json();
      })
      .then(data => {
        console.log("id de la respuesta:", data.respuesta);
        sessionStorage.setItem("idCarrera", data.respuesta);
        //return <Redirect to='/altaMateria' />
        window.location.replace("http://localhost:3000/altaMateria");
      })
      .catch(function (res) {
        console.log("res", res);
        return <Redirect to='/alta_carrera' />
      });

  };

  eliminar_id = id => {
    this.promesa_eliminar(id).then(data => {
      console.log(data);
    });
  };

  agregarMateria = id => {
    sessionStorage.setItem("idCarrera", id);
    window.location.replace("http://localhost:3000/altaMateria");
  };

  Listar = () => {
    this.promesa().then(data => {
      var FA = require('react-fontawesome')

      if (data.mensaje.length > 0) {
        var ret = data.mensaje.map((data, i) => {
          return (
            <tr id={i}>
              <td>{data.nombre_carrera} </td>
              <td>{data.descripcion_carrera}</td>
              <td>
                <button
                  onClick={() => this.agregarMateria(data._id)}
                  className="btn btn-success"
                >
                  Agregar materia
                </button>

                <Button
                  onClick={() => {
                    this.openModalUpdate(
                      data.nombre_carrera,
                      data.descripcion_carrera,
                      data.egreso,
                      data.ingreso,
                      data.contacto
                    );
                  }}
                >
                  Modificar
              </Button>
                <button
                  onClick={() => this.eliminar_id(data._id)}
                  className="btn btn-danger"
                >
                  Eliminar
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
    const { modalAdd, modalUpdate } = this.state;
    return (
      <>
        <NotificationContainer />

        <div className={styles.tabla_carreras}>
          <h1 className={styles.titulo_carreras}>Lista de carreras</h1>
          <Button
            className="btn btn-info"
            onClick={() => this.openModal_alta()}
            style={{ marginBottom: 10 }}
          >
            Alta carrera
                </Button>
          <Paper
            ref={this.chat}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.state.lista ? this.state.lista : "Lista vacía"}</tbody>
            </table>
          </Paper>
        </div>

        <Modal
          show={this.state.modalAlta}
          onHide={this.cloaseModal_alta}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Alta carrera</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.nombre}
                name="nombre"
                placeholder="Nombre"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.desc}
                name="desc"
                placeholder="Descripción"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.perfil_egr}
                name="perfil_egr"
                placeholder="Egreso"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <FormControl
                onChange={this.onChange}
                value={this.state.perfil_ing}
                name="perfil_ing"
                placeholder="Ingreso"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.cont}
                name="cont"
                placeholder="Contacto"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cloaseModal_alta}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.Alta_carrera}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal
          show={this.state.modalUpdate}
          onHide={this.cloaseModalUpdate}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modificar carrera</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.nombre_mod}
                name="nombre_mod"
                placeholder="Nombre"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.desc_mod}
                name="desc_mod"
                placeholder="Descripción"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.perfil_egr_mod}
                name="perfil_egr_mod"
                placeholder="Egreso"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <FormControl
                onChange={this.onChange}
                value={this.state.perfil_ing_mod}
                name="perfil_ing_mod"
                placeholder="Ingreso"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.cont_mod}
                name="cont_mod"
                placeholder="Contacto"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cloaseModal_modificar}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.Modificar_carrera}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Lista_carreras;
