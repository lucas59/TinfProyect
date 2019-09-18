import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'
import template from '../vistas/alta_carrera';
class alta_carrera extends Component {

    constructor() {
        super();

    }


    render() {
        return template.call(this);
    }
}

export default alta_carrera;