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
class chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista_carrera: "",
            lista: "",
            session: sessionStorage.getItem("session")
        }

    };

    promesa = async () => {
        const {session} = this.state;
            return new Promise(function (resolve, reject) {
                fetch(server.api + 'materia/mensajes', {
                    method: "GET"
                })
                    .then(res => {
                        return res.json();
                    })
                    .then(async data => {
                        resolve(data);
                    })
            });   
    };

    Listar = () => {
        this.promesa().then(data => {
            if (data.length > 0) {
                var ret = data.mensaje.map((data, i) => {
                    return (
                        <tr id={i}>
                            <td>{data.nombre_carrera}</td>
                            <td>{data.descripcion_carrera}</td>
                            <td><button onClick={() => this.eliminar_id(data._id)} className="btn btn-info">Eliminar</button>
                                <button className="btn btn-info">Modificar</button></td>
                        </tr>
                    )
                });
                this.setState({ lista: ret });
            }
            else {
                return (
                    <div>Lista vacia</div>
                )
            }
        });
    }

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

export default chat;