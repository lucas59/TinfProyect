import React, { Component, View, Text } from 'react';
import styles from '../estilos/lista_carreras.module.css';
import { server } from "../config/config";
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from "react-router-dom";
import {
    DropdownButton,
    Dropdown,
    Button,
    Col,
    Modal,
    Container,
    Row,
    InputGroup,
    FormGroup,
    FormControl
  } from "react-bootstrap";
class lista_carreras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista_carrera: "",
            lista: ""
        }

    };
    render() {
        this.Listar();
        return (
            <>
                <div className={styles.tabla_carreras}>
                    <h1 className={styles.titulo_carreras}>Lista de carreras</h1>
                    <NavLink style={{ fontSize: 20 }} className={styles.links} to="/alta_carrera">
                        Agregar carrera
                </NavLink>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.lista ? this.state.lista : "cargando"}</tbody>
                    </table>
                </div>
            </>
        )

    }
}

export default lista_carreras;