import React, { Component } from 'react';
import { server } from "../config/config";
import Style from '../estilos/altaMateria.css';

class altaMateria extends Component {
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


    crearMateria = () => {
        const { nombre, creditos, semestre, objetivos, bibliografia, evaluacion } = this.state;

        var params = {
            "nombre": nombre,
            "creditos": creditos,
            "semestre": semestre,
            "objetivos": objetivos,
            "bibliografia": bibliografia,
            "evaluacion": evaluacion
        };


        fetch(server.api + "altaMateria", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(params)
        })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log("res", res);
            });
    };

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    render() {
        return (
            <div className="container">
                <div>
                    <form>
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
                                        <input onChange={nombre => this.setState({ nombre })} className="form-control" type="text" name="Nombre" placeholder="Nombre..." style={{ marginLeft: 0, fontFamily: 'Roboto, sans-serif' }} />
                                    </div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Creditos:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1">
                                        <input onChange={creditos => this.setState({ creditos })} className="form-control" type="text" name="Creditos" placeholder="Creditos..." style={{ marginLeft: 0, fontFamily: 'Roboto, sans-serif' }} />
                                    </div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Semestre:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        <select onChange={semestre => this.setState({ semestre })} className="form-control" name="Semestre">
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
                                        <textarea onChange={objetivo => this.setState({ objetivo })} className="form-control" name="Objetivo" rows={15} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Bibliografía:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1">
                                        <textarea onChange={bibliografia => this.setState({ bibliografia })} className="form-control" rows={15} name="bibliografia" placeholder="Bibliografía..." defaultValue={""} />
                                    </div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Evaluación:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1">
                                        <textarea onChange={evaluacion => this.setState({ evaluacion })} className="form-control" name="Evaluacion" placeholder="Evaluación..." style={{ fontFamily: 'Roboto, sans-serif' }} defaultValue={""} />
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
                    </form>
                </div>
            </div>
        )
    }
}

export default altaMateria;