import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'
import template from '../vistas/alta_carrera';
import styles from '../estilos/alta_carrera.module.css';
import { server } from "../config/config";

class alta_carrera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            desc: "",
            perfil_ing: "",
            perfil_egr: "",
            cont: "",
            materias: ""
        };
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    Alta_carrera = () => {
        console.log("entra");
        const { nombre, desc, perfil_egr, perfil_ing, cont, materias } = this.state;
        var data = new URLSearchParams();
        data.append("nombre_carrera", nombre);
        data.append("descripcion_carrera", desc);
        data.append("perfilingreso_carrera", perfil_ing);
        data.append("perfilegreso_carrera", perfil_egr);
        data.append("contactos_carrera", cont);
        data.append("materias_carrera", materias);
        console.log(JSON.stringify(data));
        fetch(server.api + 'carrera/altaCarrera', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        })
            .then(function (res) {
                console.log("carrera", res);
            })
            .catch(function (res) {
                console.log("res", res);
            });

    };

    render() {
        const { nombre, perfil_egr, perfil_ing, desc, materias, cont } = this.state;
        return (
            < div >
                <p>Nombre</p><input
                    className="form-control"
                    value={nombre}
                    name="nombre"
                    placeholder="Nombre"
                    onChange={this.onChange}
                    type="text" />
                <p>Descripción</p><input
                    className="form-control"
                    value={desc}
                    name="desc"
                    placeholder="Descripción"
                    onChange={this.onChange}
                    type="text" />
                <p>Perfil de ingreso</p><textarea
                    className="form-control"
                    value={perfil_ing}
                    name="perfil_ing"
                    placeholder="Perfil ingreso"
                    onChange={this.onChange}
                    type="text" />
                <p>Perfil de egreso</p><textarea
                    className="form-control"
                    value={perfil_egr}
                    name="perfil_egr"
                    placeholder="Perfil egreso"
                    onChange={this.onChange}
                    type="text" />
                <p>Contactos</p><textarea
                    className="form-control"
                    value={cont}
                    name="cont"
                    placeholder="Contactos"
                    onChange={this.onChange}
                    type="text" />
                <p>Materias</p>
                <select className="form-control"
                    value={materias}
                    name="materias"
                    placeholder="MAterias"
                    onChange={this.onChange}
                    type="text">
                    <option value=".Net">.Net</option>
                    <option value="Probabilidad">Probabilidad y estadisticas</option>
                    <option value="sistemas de control">Sistemas de control</option>
                </select>
                <button
                    onClick={this.Alta_carrera}
                    className="btn btn-primary btn-block"
                    type="submit"
                >
                    Aceptar
          </button>
            </div >
        )
    }

}

export default alta_carrera;