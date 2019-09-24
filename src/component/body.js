import React, { Component } from 'react';
import Admin from '../component/admin';
import Alumno from '../component/alumno';
import Docente from '../component/docente';
import Login from './login';
import Inicio from './inicio'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Body extends Component {

    constructor() {
        super();
        this.state = { session: null };

    }


    render() {
      /*  if (this.state.session != null) {
            if (this.state.session.tipo == 1) {//docente
                return (<Docente />);
            } else if (this.state.session.tipo == 0) {//alumno
                return (<Alumno />);
            } else if (this.state.session.tipo == 2) {//administrador
                return (<Admin />);
            }
            return (
                <h1>asd</h1>
            );
        } else {
            return (
                <Login />
            );
        }*/
        return(<Inicio></Inicio>);
    }

}

export default Body;