import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import server from '../config/config';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class chat extends Component {
  constructor() {
    super();
    this.title = React.createRef()
    this.state = {
      response: 0,
      endpoint: "http://localhost:3050"
    };
  }

  promesa = async () => {
    const { session } = this.state;
    return new Promise(function (resolve, reject) {
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
    console.log("prueba");
    const { endpoint } = this.state;
    //Very simply connect to the socket
    const socket = socketIOClient(endpoint);
    socket.emit("click", sessionStorage.getItem("session"));
  };
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
}
  
  render() {
    return <>
      <h5>Integrantes del chat</h5>
      <p>Estdudiante: "prueba"</p>
      <p>Estdudiante: "prueba_1"</p>
      <p>Estdudiante: "prueba_2"</p>
      <Paper ref={this.chat} style={{ position: 'absolute', top: 55, left: 200, right: 0, bottom: 0 }} >
      <h1 style={{ textAlign: 'center' }}>Mensaje de materia : "materia"</h1>
        <Typography component="p">
          Mensaje
    </Typography>
        <FormControl style={{ position: 'absolute', bottom: 0 }} margin="normal" fullWidth>
          <InputLabel htmlFor="name">Mensaje</InputLabel>
          <Input onKeyDown={this._handleKeyDown} id="name" type="text" />
        </FormControl>
      </Paper></>;
  }
}

export default chat;
