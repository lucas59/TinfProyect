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

    promesa = async () => {
        return new Promise(function (resolve, reject) {
            fetch(server.api + 'carrera/listarCarreras', {
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

    promesa_eliminar = async (id) => {
        return new Promise(function (resolve, reject) {
            var data = new URLSearchParams();
            data.append("id", id);
            fetch(server.api + 'carrera/EliminarCarrera', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
                .then(function (res) {
                    return res;
                })
                .then(async data => {
                    resolve(data);
                })
        });
    };

    eliminar_id = (id) => {
        this.promesa_eliminar(id).then(data => {
            console.log(data);
        });
    }

    Listar = () => {
        this.promesa().then(data => {
            if (data.mensaje.length > 0) {
                var ret = data.mensaje.map((data, i) => {
                    return (
                        <tr id={i}>
                            <td>{data.nombre_carrera}</td>
                            <td>{data.descripcion_carrera}</td>
                            <td><button onClick={() => this.eliminar_id(data._id)} className="btn btn-info">Eliminar</button>
                                </td>
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

    componentDidMount() {
        this.Listar();
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

export default lista_carreras;