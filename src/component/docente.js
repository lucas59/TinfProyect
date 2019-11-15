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
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Docente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: "",
      modalAdd: "",
      nombre: "",
      apellido: "",
      cedula: "",
      contraseña: "",
      email: "",
      celular: "",
      contraseña2: "",
      web: "",
      modalUpdate: false,
      modalBajaDocente: false,
      listaMaterias: ""
    };
  }

  promesa = async () => {
    return new Promise(function (resolve, reject) {
      fetch(server.api + "docentes/listar", {
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
  openModalPass = () => {
    this.setState({ modalPass: true });
  };
  agregarDocente = () => {
    const {
      nombre,
      apellido,
      web,
      contraseña2,
      contraseña,
      cedula,
      celular,
      email
    } = this.state;
    if (
      cedula == "" ||
      contraseña == "" ||
      apellido == "" ||
      nombre == "" ||
      email == "" ||
      celular == ""
    ) {
      return;
    }

    if (contraseña != contraseña2) {
      NotificationManager.error("Las contraseñas no coinciden", "Error");
      return;
    }

    var data = new URLSearchParams();
    data.append("cedula", cedula);
    data.append("pass", contraseña);
    data.append("apellido", apellido);
    data.append("nombre", nombre);
    data.append("email", email);
    data.append("celular", celular);
    data.append("web", web);

    fetch(server.api + "docentes/registro", {
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
          NotificationManager.success("Se regitro correctamente el docente", "Exito");
          this.Listar();
        }

      })
      .catch(function (res) {
        console.log("res", res);
      });
  };

  promesa = async () => {
    return new Promise(function (resolve, reject) {
      fetch(server.api + 'carrera/listarMaterias', {
        method: "GET"
      })

        .then(res => {
          return res.json();
        })
        .then(async data => {
          resolve(data);
        })
    });
  };

  ListarMateria = () => {
    this.promesa().then(data => {
      if (data.retorno.length > 0) {
        var ret = data.retorno.map((data, i) => {
          return (
            <Dropdown.Item onClick={this.onChange}>{data.nombre}</Dropdown.Item>
          )
        });
        this.setState({ lista: ret });
      } else {
        return (
          <div>Lista vacia</div>
        )
      }
    });
  }

  abrirModalModificar = (cedula, nombre, apellido, email, web, celular) => {
    this.setState({ modalUpdate: true });
    this.setState({ cedula: cedula });
    this.setState({ nombre: nombre });
    this.setState({ apellido: apellido });
    this.setState({ email: email });
    this.setState({ web: web });
    this.setState({ celular: celular });
  };

  Listar = () => {
    this.promesa().then(data => {
      console.log("cantidad: ", data.retorno.length);
      if (data.retorno.length > 0) {
        var ret = data.retorno.map((data, i) => {
          return (
            <tr id={i}>
              <td>{data.cedula}</td>
              <td>
                {data.nombre + " "}
                {data.apellido}
              </td>
              <td>{data.email}</td>
              <td>{data.celular}</td>
              <td>{data.web}</td>
              <td></td>
              <Button
                onClick={() => {
                  this.abrirModalModificar(
                    data.cedula,
                    data.nombre,
                    data.apellido,
                    data.email,
                    data.web,
                    data.celular
                  );
                }}
              >
                Modificar
              </Button>
            </tr> /*
                <th>Cédula</th>
                <th>Nombre Apellido</th>
                <th>Correo</th>
                <th>Celular</th>
                <th>Web</th>*/
          );
        });
        this.setState({ lista: ret });
      } else {
        return <div>Lista vacia</div>;
      }
    });
  };

  cloaseModalAdd = () => {
    this.setState({ modalAdd: false });
    this.setState({ modalUpdate: false });
  };

  openModalAdd = () => {
    this.setState({ modalAdd: true });
  };
  openModalUpdate = () => {
    this.setState({ modalUpdate: true });
  };
  componentDidMount() {
    this.Listar();
  }

  onChange = e => {
    this.state.nuevocambios = false;
    this.setState({ [e.target.name]: e.target.value });
  };

  modificarDocente = () => {
    const { nombre, apellido, web, cedula, celular, email } = this.state;
    if (
      cedula == "" ||
      apellido == "" ||
      nombre == "" ||
      email == "" ||
      celular == ""
    ) {
      return;
    }

    var data = new URLSearchParams();
    data.append("cedula", cedula);
    data.append("apellido", apellido);
    data.append("nombre", nombre);
    data.append("email", email);
    data.append("celular", celular);
    data.append("web", web);

    fetch(server.api + "docentes/update", {
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
          NotificationManager.error(data.mensaje,"Error");
        } else {
          NotificationManager.success("Se registro correctamente el docente", "Exito");
          this.Listar();
          this.setState({ modalUpdate: false });
        } 
      })
      .catch(function (res) {
        console.log("res", res);
      });
  };

  render() {
    const { modalAdd, modalUpdate } = this.state;
    return (
      <>
        <div className={styles.tabla_carreras}>
        <NotificationContainer/>

          <h1 className={styles.titulo_carreras}>Lista de docentes</h1>
          <NavLink
            style={{ fontSize: 20 }}
            className={styles.links}
            onClick={this.openModalAdd}
          >
            Agregar docente
          </NavLink>
          <table className="table">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre Apellido</th>
                <th>Correo</th>
                <th>Celular</th>
                <th>Web</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.state.lista}</tbody>
          </table>
        </div>
        <Modal show={modalAdd} onHide={this.cloaseModalAdd} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar docente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.cedula}
                name="cedula"
                placeholder="Cédula"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                placeholder="Correo electronico"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.nombre}
                name="nombre"
                placeholder="Nombre"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <FormControl
                onChange={this.onChange}
                value={this.state.apellido}
                name="apellido"
                placeholder="Apellido"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.web}
                name="web"
                placeholder="Sitio web"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.celular}
                name="celular"
                placeholder="Celular"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.contraseña}
                name="contraseña"
                placeholder="Contraseña"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="password"
              />
              <FormControl
                onChange={this.onChange}
                value={this.state.contraseña2}
                name="contraseña2"
                placeholder="Confirme la contraseña"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="password"
              />
            </InputGroup>
            <DropdownButton id="dropdown-basic-button" title="Materias" onSelect="">
              {this.state.listaMaterias ? this.state.listaMaterias : "cargando"}
            </DropdownButton>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cloaseModalAdd}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.agregarDocente}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        {
          //*****************************************************************Modal para modifiar el usuario */
        }
        <Modal show={modalUpdate} onHide={this.cloaseModalAdd} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.cedula}
                name="cedula"
                placeholder="Cédula"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <FormControl
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                placeholder="Correo electronico"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.nombre}
                name="nombre"
                placeholder="Nombre"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <FormControl
                onChange={this.onChange}
                value={this.state.apellido}
                name="apellido"
                placeholder="Apellido"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.web}
                name="web"
                placeholder="Sitio web"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                onChange={this.onChange}
                value={this.state.celular}
                name="celular"
                placeholder="Celular"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cloaseModalAdd}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.modificarDocente}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Docente;
