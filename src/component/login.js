import React, { Component } from "react";
import { server } from "../config/config";
import stylesSignup from "../estilos/signup.css"; // Tell Webpack that Button.js uses these styles
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      contraseña: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  enviardatos = () => {
    const { cedula, contraseña } = this.state;
    if (cedula == "" || contraseña == "") {
      return;
    }

    var data = new URLSearchParams();
    data.append("cedula", cedula);
    data.append("pass", contraseña);

    fetch(server.api + "administrador/login", {
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
        if (data.retorno == true) {
          sessionStorage.setItem("session", JSON.stringify(data.user));
          window.location.reload();
          NotificationManager.success("Bienvenido", 'Exito');
        } else {
          console.log("error");
          NotificationManager.error(data.mensaje, 'Error');
        }
      })
      .catch(function(res) {
        console.log("res", res);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  

  render() {
    const { cedula, contraseña } = this.state;
    return (


      <div className="register-photo">

        <div className="form-container">
          <div className="image-holder" />
          <div className="form">
          <NotificationContainer/>

            <h2 className="text-center">
              <strong>Bienvenido</strong>.
            </h2>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="cedula"
                value={cedula}
                placeholder="Correo"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="contraseña"
                value={contraseña}
                placeholder="Contraseña"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <button
                onClick={this.enviardatos}
                className="btn btn-primary btn-block"
                type="submit"
              >
                Ingresar
              </button>
            </div>
            <a href="/registrarse" className="already">
              Crear una cuenta
            </a>
          </div>
        </div>

      </div>
    );
  }
}

export default Login;
