import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'
import template from '../vistas/eliminar_carrera';
class modificar_carrera extends Component {

    constructor() {
        super();

    }


    render() {
        return template.call(this);
    }
}

export default modificar_carrera;