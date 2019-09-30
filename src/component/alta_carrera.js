import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'
import template from '../vistas/alta_carrera';
import styles from '../estilos/alta_carrera.module.css';
class alta_carrera extends Component {

    constructor() {
        super();
        this.state = {
            nombre: "",
            desc: "",
            perfil_ing: "",
            perfil_egr: "",
            cont: "",
            materias: ""
        };
        this.NombreChange = this.NombreChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.perfil_ingChange = this.perfil_ingChange.bind(this);
        this.perfil_egrChange = this.perfil_egrChange.bind(this);
        this.contChange = this.contChange.bind(this);
        this.materiasChange = this.materiasChange.bind(this);
    }
    NombreChange(event) {
        this.setState({nombre: event.target.value});
    }
    descChange(event) {
        this.setState({desc: event.target.value});
    }
    perfil_ingChange(event) {
        this.setState({perfil_ing: event.target.value});
    }
    perfil_egrChange(event) {
        this.setState({perfil_egr: event.target.value});
    }
    contChange(event) {
        this.setState({cont: event.target.value});
    }
    materiasChange(event) {
        this.setState({materias: event.target.value});
    }
    
    Alta_carrera() {
        console.log("entra");
        const { nombre, desc, perfil_egr, perfil_ing, cont, materias } = this.state;
        var data = new URLSearchParams();
        data.append("nombre_carrera", nombre);
        data.append("descripcion_carrera", desc);
        data.append("perfilingreso_carrera", perfil_ing);
        data.append("perfilegreso_carrera", perfil_egr);
        data.append("contactos_carrera", cont);
        data.append("materias_carrera", materias);

        fetch('http://localhost:3050/carrera/altaCarrera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        })
            .then(res => {
                return res.json()
            })
            .then(async data => {
                const retorno = data;
                console.log(data);
            })
            .catch(function (err) {
                console.log('error', err);
            })

    }

    render() {
        return (
        < div >
            <h1 classname="{styles.titulo}">Alta carrera</h1>
            <form classname="{styles.form}">
                <p>Nombre</p><input value={this.state.nombre} onChange={this.NombreChange} className="form-control texto" type="text" placeholder="Nombre de la carrera" />
                <p>Descripción</p><input value={this.state.desc} onChange={this.descChange} className="form-control texto" id="descripcion" type="text" placeholder="Descripción de la carrera" />
                <p>Perfil de ingreso</p><textarea value={this.state.perfil_ing} onChange={this.perfil_ingChange} className="form-control texto" id="perfil_ing" placeholder="Perfil de ingreso" defaultValue={""} />
                <p>Perfil de egreso</p><textarea value={this.state.perfil_egr} onChange={this.perfil_egrChange} className="form-control texto" id="perfil_egr" placeholder="Perfil de egreso" defaultValue={""} />
                <p>Contactos</p><textarea value={this.state.cont} onChange={this.contChange} className="form-control texto" id="contactos" placeholder="Contactos" defaultValue={""} />
         
                <p>Materias</p>
                <select id="materias" value={this.state.materias} onChange={this.materiasChange}>
                    <option value=".Net">.Net</option>
                    <option value="Probabilidad">Probabilidad y estadisticas</option>
                    <option value="sistemas de control">Sistemas de control</option>
                </select>
                <input id="aceptar" onClick={this.Alta_carrera()} name="aceptar" defaultValue="Aceptar" type="button" />
            </form>
            </div >
            )
    }

}

export default alta_carrera;