import React, { Component } from 'react';
import template from '../vistas/altaMateria';

class altaMateria extends Component {
    constructor() {
        super();


    }

    render() {
        return template.call(this);
    }
}

export default altaMateria;