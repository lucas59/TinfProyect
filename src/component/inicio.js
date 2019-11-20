import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import alumno from "./alumno";
import PublicRoute from "./ruta_publica";
import $ from "jquery";
import { server } from "../config/config";
import "../estilos/inicio.css";
import socketIOClient from "socket.io-client";
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";
import {FontAwesome} from "react-fontawesome";

class Inicio extends Component {
  constructor() {
    super();
    this.state = {
      session: JSON.parse(sessionStorage.getItem("session")),
      novedades: "",
      // socket: socketIOClient("http://localhost:3050"),
      modalView: false
    };
  }

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

  ListarNovedades = () => {
    this.promesa().then(data => {
      var dateFormat = require("dateformat");
      if (data.novedades.length > 0) {
        this.setState({ listaNovedades: data.novedades });
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
                  onClick={() => this.visualizar(data._id)}
                  className="btn btn-info"
                >
                  <FontAwesome icon={["fab", "apple"]} /> Ver
                </button>
              </td>
            </tr>
          );
        });
        this.setState({ novedades: ret });
      } else {
        return <div>Lista vacia</div>;
      }
    });
  };

  visualizar = id => {
    var dateFormat = require("dateformat");
    const { listaNovedades } = this.state;
    listaNovedades.forEach(element => {
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

  componentDidMount() {
    this.ListarNovedades();
  }

  render() {
    const { session, modalView } = this.state;
    return (
      <>
        <div class="contenedorInicio"> </div>
        <section id="novedades">
          <div id="tablaNovedades">
            <div id="titulo">
              <h1>NOVEDADES</h1>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Contenido</th>
                  <th>Contacto</th>
                  <th>Fecha</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.novedades ? this.state.novedades : "cargando"}
              </tbody>
            </table>
          </div>
        </section>

        <footer class="page-footer font-small blue">
          <div id="footer" class="footer-copyright text-center py-3">
            2019 TECNOLÓGOS EN INFORMÁtica :
            <a href="https://mdbootstrap.com/education/bootstrap/">
              {" "}
              tecnoinf.com
            </a>
          </div>
        </footer>
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

export default Inicio;
