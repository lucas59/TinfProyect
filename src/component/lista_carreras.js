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

    Listar = () => {
        this.promesa().then(data => {
            if (data.mensaje.length > 0) {
                var ret = data.mensaje.map((data, i) => {
                    console.log(data._id);
                    return (
                        <tr id={i}>
                            <td>{data.nombre_carrera}</td>
                            <td>{data.descripcion_carrera}</td>
                            <td><button className="btn btn-info">Eliminar</button> <button className="btn btn-info">Modificar</button></td>
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
                        <tbody>{this.state.lista}</tbody>
                    </table>
                </div>
            </>
        )

    }
}

export default lista_carreras;