import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import altaCarrera from './alta_carrera';
import modificarCarrera from './modificar_carrera';
import eliminarCarrera from './eliminar_carrera';
import alumno from './alumno';
import Body from './body'
import altaMateria from './altaMateria';
import styles from '../estilos/navigation.module.css';

import Login from './login';
import Signup from './signup';

const Cabecera = ({ match }) => (
    <Router>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <NavLink class='navbar-brand' style={{ color: 'white' }} to="/">Inicio</NavLink>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <NavLink className={styles.links} to="/altaCarrera">Alta carrera</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className={styles.links} to="/modificarCarrera">Modificar carrera</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className={styles.links} to="/eliminarCarrera">Eliminar carrera</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        <Route exact path="/" component={Body} />
        <Route path="/altaCarrera" component={altaCarrera} />
        <Route path="/modificarCarrera" component={modificarCarrera} />
        <Route path="/eliminarCarrera" component={eliminarCarrera} />
        <Route path="/alumno" component={alumno} />
        <Route path="/altaMateria" component={altaMateria} />
        <Route path="/ingresar" component={Login} />

            <Router>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Inicio<span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <Link to={`/altaCarrera`}>Alta carrera</Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                    <Switch>
                        <Route exact path="/" component={Body} />
                        <Route path="/altaCarrera" component={altaCarrera} />
                        <Route path="/alumno" component={alumno} />
                        <Route path="/ingresar" component={Login} />
                        <Route path="/registrarme" component={Signup} />
                        
                        
                    </Switch>

            </Router>



export default Cabecera;