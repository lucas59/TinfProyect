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
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { delay } from "q";

class Lista_Alumnos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(sessionStorage.getItem("session")),
      materia: sessionStorage.getItem("gestionMateria"),
      lista_carrera: "",
      lista: "",
      modalAdd: false,
      modalShow: false,
      nuevoAlumno: "",
      listaTodosEstudiantes: ""
    };
  }

  promesa = async () => {
    console.log("promesa");
    var data = new URLSearchParams();
    data.append("id", this.state.materia);
    return new Promise(function(resolve, reject) {
      fetch(server.api + "materia/alumnos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
      })
        .then(res => {
          return res.json();
        })
        .then(async data => {
          resolve(data);
        });
    });
  };

  promesaListaTodos = async () => {
    return new Promise(function(resolve, reject) {
      fetch(server.api + "estudiantes/", {
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

  promesaAgregarAlumno = async (cedula, materia) => {
    return new Promise(function(resolve, reject) {
      var data = new URLSearchParams();
      data.append("cedula", cedula);
      data.append("materia", materia);

      fetch(server.api + "estudiantes/addMateria", {
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

  promesa_eliminar = async (id, materia) => {
    return new Promise(function(resolve, reject) {
      var data = new URLSearchParams();
      data.append("id", id);
      data.append("materia", materia);

      fetch(server.api + "estudiantes/deleteMateria", {
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

  agregarMateria = id => {
    sessionStorage.setItem("idCarrera", id);
    window.location.replace("http://localhost:3000/altaMateria");
  };

  Listar = () => {
    this.promesa().then(data => {
      if (data.estudiantes.length > 0) {
        var ret = data.estudiantes.map((data, i) => {
          return (
            <tr id={i}>
              <td>{data.nombre}</td>
              <td>{data.email}</td>
              <td>
                <button
                  onClick={() => this.eliminar_id(data._id)}
                  className="btn btn-info"
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

  ListarTodos = () => {
    const { lista } = this.state;
    this.promesaListaTodos().then(data => {
      if (data.estudiantes.length > 0) {
        var ret = data.estudiantes.map((data, i) => {
          return (
            <tr id={i}>
              <td>{data.nombre}</td>
              <td>{data.cedula}</td>
              <td>
                <button
                  onClick={() => this.eliminar_id(data._id)}
                  className="btn btn-info"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        });
        this.setState({ listaTodosEstudiantes: ret });
      } else {
        return <div>Lista vacia</div>;
      }
    });
  };

  agregarAlumno = () => {
    this.state.modalAdd = true;
    console.log("asdasdasd");
  };

  componentDidMount() {
    this.Listar();
    //this.ListarTodos();
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buscar = () => {
    const { nuevoAlumno, materia } = this.state;

    this.promesaAgregarAlumno(nuevoAlumno, materia).then(data => {
      if (data.retorno == true) {
        NotificationManager.success(
          "Se a agregado correctamente el alumno",
          "Aviso"
        );
      } else {
        NotificationManager.error("Error al agregar al alumno", "Error");
      }
      this.Listar();
      this.state.modalAdd = false;
    });
  };

  eliminar_id = id => {
    const { materia } = this.state;
    this.promesa_eliminar(id, materia).then(data => {
      console.log(data);
      if (data.retorno == true) {
        NotificationManager.success(
          "Se a eliminado el alumno de la materia",
          "Aviso"
        );
      } else {
        NotificationManager.error("Error al eliminar el alumno", "Error");
      }
      this.setState({lista:""});
      this.Listar();
    });
  };

  cerrarModal = () => {
    this.setState({modalAdd: false});
  };

  render() {
    const handleClose = () => {
      this.setState({modalShow:true});
    };

    const handleShow = () => {
      console.log("cerrando");
      this.state.modalAdd = false;
      //      this.setState("modalAdd", false);
    };

    const { modalAdd } = this.state;
    return (
      <>
        <NotificationContainer />

        <div className={styles.tabla_carreras}>
          <h1 className={styles.titulo_carreras}>Lista de alumnos</h1>
          <NavLink
            style={{ fontSize: 20 }}
            className={styles.links}
            onClick={() => {
              this.agregarAlumno();
            }}
          >
            Agregar alumno
          </NavLink>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre Apellido</th>
                <th>Correo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>{this.state.lista ? this.state.lista : "cargando"}</tbody>
          </table>
        </div>

        <Modal show={modalAdd} onHide={this.handleShow} animation={false}>
          <Modal.Header>
            <Modal.Title>Cambio de contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={this.state.nuevoAlumno}
                  name="nuevoAlumno"
                  onChange={this.onChange}
                />
                <Button
                  onClick={() => {
                    this.buscar();
                  }}
                  variant="primary"
                >
                  Buscar
                </Button>
              </InputGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.cerrarModal();
              }}
            >
              Listo
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Lista_Alumnos;
