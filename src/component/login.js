import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import alumno from './alumno'
import PublicRoute from './ruta_publica';
class Login extends Component {

    constructor() {
        super();
    }


    render() {

        return (
            <>
                <h1>Login</h1>
                <Link to="/docente">Alumno</Link>
            </>
        );
    }
}

export default Login;