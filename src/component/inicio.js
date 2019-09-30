import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import alumno from './alumno'
import PublicRoute from './ruta_publica';
import $ from 'jquery';
import { server } from "../config/config";

class Inicio extends Component {


    constructor() {
        super();
    }



    render() {

        //        return template.call(this)
        return (
            <h1>Inicio</h1>
        );

    }
}

export default Inicio;