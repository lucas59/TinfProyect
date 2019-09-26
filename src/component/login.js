import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import alumno from './alumno'
import PublicRoute from './ruta_publica';
import template from '../vistas/login';
class Login extends Component {

    constructor() {
        super();
    }

    render() {
        return template.call(this);
    }
}

export default Login;