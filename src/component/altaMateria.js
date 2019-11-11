import React, { Component } from 'react';
import { server } from "../config/config";
import Style from '../estilos/altaMateria.css';
import { Redirect } from "react-router-dom";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class AltaMateria extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            nombre: "",
            creditos: "",
            semestre: "",
            objetivos: "",
            bibliografia: "",
            evaluacion: "",
        };
    }


    onChange = e => this.setState({ [e.target.name]: e.target.value });

    crearMateria = () => {
        const { nombre, creditos, semestre, objetivos, bibliografia, evaluacion } = this.state;

        var data = new URLSearchParams();
        var idCarrera = sessionStorage.getItem("idCarrera");
        data.append("idCarrera",idCarrera);
        data.append("nombre", nombre);
        data.append("creditos", creditos);
        data.append("semestre", semestre);
        data.append("objetivo", objetivos);
        data.append("bibliografia", bibliografia);
        data.append("evaluacion", evaluacion);

        fetch(server.api + "carrera/altaMateria", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        })
            .then(function (res) {
                console.log("Aca estoy!");
                return res.json();
            })
            .then(data => {
                if (data.retorno == false) {
                    NotificationManager.error(data.mensaje, "Error");
                } else {
                    sessionStorage.removeItem("idCarrera");
                    NotificationManager.success("Se registro correctamente la Materia.", "Exito");
                }
            })
            .catch(function (res) {
                console.log("res", res);
            });
    };

    render() {
        const {nombre, creditos, semestre, objetivos, bibliografia, evaluacion } = this.state;
        return (
            <div className="container">
                          <NotificationContainer/>

                <div>
                    <div className="form-group">
                        <center>
                            <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 34 }}><strong>Agregar Materia</strong></p>
                        </center>

                        <div id="formdiv">
                            <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                <div className="col-md-8 offset-md-1">
                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Nombre:</strong></p>
                                </div>
                                <div className="col-md-10 offset-md-1">
                                    <input value={nombre} onChange={this.onChange} className="form-control" type="text" name="nombre" placeholder="Nombre..." style={{ marginLeft: 0, fontFamily: 'Roboto, sans-serif' }} />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                <div className="col-md-8 offset-md-1">
                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Creditos:</strong></p>
                                </div>
                                <div className="col-md-10 offset-md-1">
                                    <input value={creditos} onChange={this.onChange} className="form-control" type="text" name="creditos" placeholder="Creditos..." style={{ marginLeft: 0, fontFamily: 'Roboto, sans-serif' }} />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                <div className="col-md-8 offset-md-1">
                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Semestre:</strong></p>
                                </div>
                                <div className="col-md-10 offset-md-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    <select value={semestre} onChange={this.onChange} className="form-control" name="semestre">
                                        <option value={1}>Primer Semestre</option>
                                        <option value={2}>Segundo Semestre</option>
                                        <option value={3}>Tercer Semestre</option>
                                        <option value={4}>Cuarto Semestre</option>
                                        <option value={5}>Quinto Semestre</option>
                                        <option value={6}>Sexto Semestre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                <div className="col-md-8 offset-md-1">
                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Objetivos:</strong></p>
                                </div>
                                <div className="col-md-10 offset-md-1">
                                    <textarea value={objetivos} onChange={this.onChange} className="form-control" name="objetivos" rows={15} />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                <div className="col-md-8 offset-md-1">
                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Bibliografía:</strong></p>
                                </div>
                                <div className="col-md-10 offset-md-1">
                                    <textarea value={bibliografia} onChange={this.onChange} className="form-control" rows={15} name="bibliografia" placeholder="Bibliografía..." />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                <div className="col-md-8 offset-md-1">
                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Evaluación:</strong></p>
                                </div>
                                <div className="col-md-10 offset-md-1">
                                    <textarea value={evaluacion} onChange={this.onChange} className="form-control" name="evaluacion" placeholder="Evaluación..." style={{ fontFamily: 'Roboto, sans-serif' }} />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                <div className="col-12 col-md-4 offset-md-4" style={{ width: 259 }}>
                                    <button className="btn btn-light btn-lg" type="reset" style={{ fontFamily: 'Roboto, sans-serif' }}>Salir</button>
                                    <button onClick={this.crearMateria} className="btn btn-light btn-lg" type="submit" style={{ marginLeft: 16 }}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AltaMateria;