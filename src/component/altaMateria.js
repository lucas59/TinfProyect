import React, { Component } from 'react';
import Style from '../estilos/altaMateria.css';

class altaMateria extends Component {
    constructor(props) {
        super(props);
    }


    crearMateria = () => {
      /*  event.preventDefault();
        let
            materia = {
                nombre: event.target.Nombre.value,
                creditos: event.target.Creditos.value,


            }*/
    }

    render() {
        return (
            <div className="container">
                <div>
                    <form>
                        <div className="form-group">
                            <center><p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 34 }}><strong>Agregar Materia</strong></p></center>
                            <div id="formdiv">
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Nombre:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1"><input className="form-control" type="text" name="Nombre" placeholder="Nombre..." style={{ marginLeft: 0, fontFamily: 'Roboto, sans-serif' }} /></div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Creditos:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1"><input className="form-control" type="text" name="Creditos" placeholder="Creditos..." style={{ marginLeft: 0, fontFamily: 'Roboto, sans-serif' }} /></div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Semestre:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1" style={{ fontFamily: 'Roboto, sans-serif' }}><select className="form-control" name="Semestre"><option value={1}>Primer Semestre</option><option value={2}>Segundo Semestre</option><option value={3}>Tercer Semestre</option><option value={4}>Cuarto Semestre</option><option value={5}>Quinto Semestre</option><option value={6}>Sexto Semestre</option></select></div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Objetivos:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1"><textarea className="form-control" rows={15} defaultValue={""} /></div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Bibliografía:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1"><textarea className="form-control" rows={15} placeholder="Bibliografía..." defaultValue={""} /></div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-md-8 offset-md-1">
                                        <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: 24 }}><strong>Evaluación:</strong></p>
                                    </div>
                                    <div className="col-md-10 offset-md-1"><textarea className="form-control" placeholder="Evaluación..." style={{ fontFamily: 'Roboto, sans-serif' }} defaultValue={""} /></div>
                                </div>
                                <div className="form-row" style={{ marginRight: 0, marginLeft: 0, paddingTop: 24 }}>
                                    <div className="col-12 col-md-4 offset-md-4" style={{ width: 259 }}><button className="btn btn-light btn-lg" type="reset" style={{ fontFamily: 'Roboto, sans-serif' }}>Salir</button><button onClick={this.crearMateria} className="btn btn-light btn-lg" type="submit" style={{ marginLeft: 16 }}>Crear</button></div>
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