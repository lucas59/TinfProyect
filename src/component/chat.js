import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3050');
class chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        socket.emit('click', 1000);
        console.log("prueba");
        return (
            <>
               
            </>
        )

    }
}

export default chat;