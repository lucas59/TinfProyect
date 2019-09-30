import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'
import template from '../vistas/alta_carrera';
import styles from '../estilos/alta_carrera.module.css';
import { server } from "../config/config";

class alta_carrera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "sd",
            desc: "sd",
            perfil_ing: "sd",
            perfil_egr: "sd",
            cont: "d",
            materias: "d"
        };
    }

    Alta_carrera = () => {
        console.log("entra");
        const { nombre, desc, perfil_egr, perfil_ing, cont, materias } = this.state;
        var data = new URLSearchParams();
        data.append("nombre_carrera", nombre);
        data.append("descripcion_empresa", desc);
        data.append("perfilingreso_empresa", perfil_ing);
        data.append("perfilegreso_empresa", perfil_egr);
        data.append("contactos_empresa", cont);
        data.append("materias_empresa", materias);
        console.log(JSON.stringify(data));
        fetch(server.api + 'carrera/altaCarrera', {
            method: "POST",
            credentials: "include", 
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(data)
        })
        .then(function(res) {
            console.log(res);
          })
          .catch(function(res) {
            console.log("res", res);
          });

    };

    render() {
        return (
        < div >
                <p>Nombre</p><input onChange={nombre => this.setState({nombre})} className="form-control"
            type="text"
            name="email"
            placeholder="Email" />
                <p>Descripción</p><input onChange={desc => this.setState({desc})} className="form-control"
            type="text"
            name="email"
            placeholder="Email" />
                <p>Perfil de ingreso</p><textarea onChange={perfil_ing => this.setState({perfil_ing})}className="form-control"
            type="text"
            name="email"
            placeholder="Email" />
                <p>Perfil de egreso</p><textarea onChange={perfil_egr => this.setState({perfil_egr})} id="perfil_egr" className="form-control"
            type="text"
            name="email"
            placeholder="Email"/>
                <p>Contactos</p><textarea onChange={cont => this.setState({cont})} className="form-control"
            type="text"
            name="email"
            placeholder="Email" />
         
                <p>Materias</p>
                <select className="form-control"
            type="text"
            name="email"
            placeholder="Email" onChange={materias => this.setState({materias})}>
                    <option value=".Net">.Net</option>
                    <option value="Probabilidad">Probabilidad y estadisticas</option>
                    <option value="sistemas de control">Sistemas de control</option>
                </select>
                <button
            onClick={this.Alta_carrera}
            className="btn btn-primary btn-block"
            type="submit"
          >
            Log In
          </button>
            </div >
            )
    }

}

export default alta_carrera;