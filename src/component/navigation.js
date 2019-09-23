import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import altaCarrera from './alta_carrera';
import modificarCarrera from './modificar_carrera';
import eliminarCarrera from './eliminar_carrera';
import alumno from './alumno';
import Body from './body'
import altaMateria from './altaMateria';
import { Nav, Navbar, NavItem } from "react-bootstrap";

import Login from './login';

const Cabecera = ({ match }) => (
    <Router>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Inicio</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/altaCarrera">Alta carrera</Nav.Link>
                <Nav.Link href="/modificarCarrera">Modificar carrera</Nav.Link>
                <Nav.Link href="/eliminarCarrera">Eliminar carrera</Nav.Link>
            </Nav>
        </Navbar >
        <Switch>
            <Route exact path="/" component={Body} />
            <Route path="/altaCarrera" component={altaCarrera} />
            <Route path="/modificarCarrera" component={modificarCarrera} />
            <Route path="/eliminarCarrera" component={eliminarCarrera} />
            <Route path="/alumno" component={alumno} />
            <Route path="/altaMateria" component={altaMateria} />
            <Route path="/ingresar" component={Login} />
        </Switch>
    </Router >
);



export default Cabecera;