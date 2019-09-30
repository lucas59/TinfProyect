import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'
import template from '../vistas/alta_carrera';
class alta_carrera extends Component {

    constructor() {
        super();

    }
    Alta_carrera() {
        let asistencia_send = {
            nombre_empresa: "prueba"
        }
        fetch('http://192.168.1.6:3000/AltaCarrera', {
            method: 'POST',
            headers: {
                'Aceptar': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(asistencia_send)
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
        return template.call(this);
    }
}

export default alta_carrera;