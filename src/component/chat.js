import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { server } from "../config/config";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.state = {
      response: 0,
      endpoint: "http://localhost:3050",
      idMateria: ""
    };
  }

  promesa = async () => {
    const { session, idMateria } = this.state;
    console.log(idMateria);
    return new Promise(function(resolve, reject) {
      var data = new URLSearchParams();
      data.append("id", idMateria);
      
      fetch(server.api + "materia/mensajes", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        })
        .then(res => {
          console.log(res,"res");
          return res.json();
        })
        .then(async data => {
          resolve(data);
        });
    });
  };

  Listar = () => {
    this.promesa().then(data => {

 if (data.retorno.mensajesChat.length > 0) {
        var ret = data.retorno.mensajesChat.map((data, i) => {
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
    this.state.idMateria = sessionStorage.getItem("chatActual");
    this.Listar();
  };
  render() {
    const { endpoint } = this.state;
    //Very simply connect to the socket
    const socket = socketIOClient(endpoint);
    socket.emit("click", sessionStorage.getItem("session"));
  }
  _handleKeyDown = e => {
    if (e.key === "Enter") {
      console.log("do validate");
    }
  };

  render() {
    return (
      <>
        <h5>Integrantes del chat</h5>
        <p>Estdudiante: "prueba"</p>
        <p>Estdudiante: "prueba_1"</p>
        <p>Estdudiante: "prueba_2"</p>
        <Paper
          ref={this.chat}
          style={{
            position: "absolute",
            top: 55,
            left: 200,
            right: 0,
            bottom: 0
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Mensaje de materia : "materia"
          </h1>
          <Typography component="p">Mensaje</Typography>
          <FormControl
            style={{ position: "absolute", bottom: 0 }}
            margin="normal"
            fullWidth
          >
            <InputLabel htmlFor="name">Mensaje</InputLabel>
            <Input onKeyDown={this._handleKeyDown} id="name" type="text" />
          </FormControl>
        </Paper>
      </>
    );
  }
}

export default Chat;
