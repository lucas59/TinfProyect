import React, { Component } from "react";
import { server } from "../config/config";
import stylesSignup from "../estilos/signup.css"; // Tell Webpack that Button.js uses these styles
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      correo: "",
      password: "",
      nombre: "",
      apellido: "",
      cedula: ""
    };
  }

  render() {
    return (
      <div className="register-photo">
        <div className="form-container">
          <div className="image-holder" />
          <form method="post">
            <h2 className="text-center">
              <strong>Crea</strong> tu cuenta.
            </h2>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password-repeat"
                placeholder="Confirmar contraseña"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Crear cuenta
              </button>
            </div>
            <a href="/ingresar" className="already">
              Iniciar sesión
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
