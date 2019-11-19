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
var show = false;

const handleClose = () => show = false;
const handleShow = () => show = true;

class Lista_carreras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(sessionStorage.getItem("session")),
      lista_carrera: "",
      lista: "",
      modalUpdate: false,
      nombre: '',
      descripcion: '',
      egreso: '',
      ingreso: '',
      contacto: '',
      id_carrera: ''
    };
  }

  Actualizar_carrera = () => {
    const { nombre, descripcion, egreso, ingreso, contacto} = this.state;
    var data = new URLSearchParams();
    data.append("id_carrera", this.state.id_carrera);
    data.append("nombre_carrera", nombre);
    data.append("descripcion_carrera", descripcion);
    data.append("perfilingreso_carrera", ingreso);
    data.append("perfilegreso_carrera", egreso);
    data.append("contactos_carrera", contacto);
    console.log(JSON.stringify(data));
    fetch(server.api + 'carrera/modificarcarrera', {
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

  openModalUpdate = (id) => {
    this.setState({ modalUpdate: true });
    this.setState({id_carrera : id});
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
      if (data.mensaje.length > 0) {
        var ret = data.mensaje.map((data, i) => {
          return (
            <tr id={i}>
              <td>{data.nombre_carrera}</td>
              <td>{data.descripcion_carrera}</td>
              <td>
                <button
                  onClick={() => this.agregarMateria(data._id)}
                  className="btn btn-info"
                >
                  Agregar materia
                </button>

                <button
                  onClick={() => this.eliminar_id(data._id)}
                  className="btn btn-info"
                >
                  Eliminar
                </button>
                <Button
                  className="btn btn-info"
                  onClick={() => this.openModalUpdate(data._id)}
                >
                  Modificar
          </Button>

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
        <div className={styles.tabla_carreras}>
          <h1 className={styles.titulo_carreras}>Lista de carreras</h1>
          <NavLink
            style={{ fontSize: 20 }}
            className={styles.links}
            to="/alta_carrera"
          >
            Agregar carrera
          </NavLink>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>{this.state.lista ? this.state.lista : "cargando"}</tbody>
          </table>
        </div>

        <Modal show={modalUpdate} onHide={this.cloaseModalUpdate} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar datos</Modal.Title>
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
                value={this.state.descripcion}
                name="descripcion"
                placeholder="Descripción"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.egreso}
                name="egreso"
                placeholder="Egreso"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <FormControl
                onChange={this.onChange}
                value={this.state.ingreso}
                name="ingreso"
                placeholder="Ingreso"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
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
            <Button variant="primary" onClick={this.Actualizar_carrera}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Lista_carreras;
