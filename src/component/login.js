import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import alumno from './alumno'
import PublicRoute from './ruta_publica';
//import template from '../vistas/login';
import $ from 'jquery';
import { server } from "../config/config";

class Login extends Component {


    constructor() {
        super();
    }


    componentDidMount() {

        $("#btnEnviar").click(function () {
            var correo = $("#correo").val();
            var pass = $("#contraseña").val();
            console.log(correo, pass);
            if (correo == null || pass == null) {

            } else {
                console.log(server.api)
                fetch(server.api + "estudiantes/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify({ user: correo, pass: pass })
                })
                    .then(function (res) { console.log(res) })
                    .catch(function (res) { console.log(res) })

            }
        });
    }

    render() {

//        return template.call(this)
return (
    <div className="login-dark">
    <form method="post">
        <h2 className="sr-only">Login Form</h2>
        <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
        <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email"/></div>
        <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password"/></div>
        <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Log In</button></div><a href="#" class="forgot">Forgot your email or password?</a>
        </form>
    </div>
);

    }
}

export default Login;