import React, { Component } from 'react';
import template from '../vistas/login';
class Login extends Component {

    constructor() {
        super();
    }

    render() {
       return template.call(this)
        
    }
}

export default Login;