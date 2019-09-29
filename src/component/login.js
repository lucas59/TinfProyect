import React, { Component } from "react";
import { server } from "../config/config";

import stylesLogin from "../estilos/login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "asd",
      password: "asd"
    };
  }

  enviardatos = () => {
    const { correo, password } = this.state;
    /*   if (correo == "" || password == "") {
      return;
    }*/
    var params = {
      "correo": correo,
      "password": password
    };

    fetch(server.api + "estudiantes/login", {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(params)
    })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(res) {
        console.log("res", res);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <div className="login-clean">
        <h2 className="sr-only">Login Form</h2>
        <div className="illustration">
          <i className="icon ion-ios-navigate" />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            onChange={correo => this.setState({ correo })}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={password => this.setState({ password })}
          />
        </div>
        <div className="form-group">
          <button
            onClick={this.enviardatos}
            className="btn btn-primary btn-block"
            type="submit"
          >
            Log In
          </button>
        </div>
        <a href="#" className="forgot">
          Forgot your email or password?
        </a>
      </div>
    );
  }
}

export default Login;
