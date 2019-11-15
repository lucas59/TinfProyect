import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'
import template from '../vistas/modificar_carrera';
class Modificar_carrera extends Component {

    constructor() {
        super();

    }


    render() {
        return template.call(this);
    }
}

export default Modificar_carrera;