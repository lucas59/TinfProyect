import React, { Component } from "react";
import { server } from "../config/config";
import stylesSignup from "../estilos/signup.css"; // Tell Webpack that Button.js uses these styles
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      correo: "",
      contraseña: "",
      nombre: "",
      apellido: "",
      cedula: "",
      contraseña2: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  enviardatos = () => {
    const {
      cedula,
      contraseña,
      contraseña2,
      apellido,
      correo,
      nombre
    } = this.state;
    if (
      cedula == "" ||
      contraseña == "" ||
      contraseña2 == "" ||
      apellido == "" ||
      nombre == "" ||
      correo == "" ||
      apellido == ""
    ) {
      return;
    }

    if (contraseña != contraseña2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    var data = new URLSearchParams();
    data.append("cedula", cedula);
    data.append("pass", contraseña);
    data.append("apellido", apellido);
    data.append("nombre", nombre);
    data.append("correo", correo);

    fetch(server.api + "estudiantes/registro", {
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
        alert(data.retorno);
        console.log(data);

        if (data.retorno == false) {
          alert(data.mensaje);
        } else {
          sessionStorage.setItem("session", data.user);
          window.location.reload();
        }

        /*  if (data.retorno == true) {
          
        } else {
          alert(data.mensaje);
        }*/
      })
      .catch(function(res) {
        console.log("res", res);
      });
  };

  render() {
    const {
      cedula,
      apellido,
      correo,
      nombre,
      contraseña,
      contraseña2
    } = this.state;
    return (
      <div className="register-photo">
        <div className="form-container">
          <div className="image-holder" />
          <div className="form">
            <h2 className="text-center">
              <strong>Crea</strong> tu cuenta.
            </h2>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="cedula"
                value={cedula}
                placeholder="Cédula"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="correo"
                value={correo}
                placeholder="Correo"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={nombre}
                placeholder="Nombre"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="apellido"
                value={apellido}
                placeholder="Apellido"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="contraseña"
                value={contraseña}
                placeholder="Contraseña"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="contraseña2"
                value={contraseña2}
                placeholder="Confirmar contraseña"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <button
                onClick={this.enviardatos}
                className="btn btn-primary btn-block"
                type="submit"
              >
                Crear cuenta
              </button>
            </div>
            <a href="/ingresar" className="already">
              Iniciar sesión
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
