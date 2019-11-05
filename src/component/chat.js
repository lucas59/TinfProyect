import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3050');

class chat extends Component {
  constructor() {
    super();
    this.state = {
      response: 0,
      endpoint: "http://localhost:3050"
    };
  }

  promesa = async () => {
    const { session } = this.state;
    return new Promise(function(resolve, reject) {
      fetch(server.api + "materia/mensajes", {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(async data => {
          resolve(data);
        });
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
              <td>
                <button
                  onClick={() => this.eliminar_id(data._id)}
                  className="btn btn-info"
                >
                  Eliminar
                </button>
                <button className="btn btn-info">Modificar</button>
              </td>
            </tr>
          );
        });
        this.setState({ lista: ret });
      } else {
        return <div>Lista vacia</div>;
      }
    });
  };

  componentDidMount = () => {
    //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
  };
  render() {
    const { endpoint } = this.state;
    //Very simply connect to the socket
    const socket = socketIOClient(endpoint);
    socket.emit("click", sessionStorage.getItem("session"));
    console.log("prueba");
    return <></>;
  }
}

export default chat;
