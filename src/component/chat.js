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
      idMateria: "",
      nombreMateria: '',
      usuario: '',
      mensaje: '',
      socket: socketIOClient("http://localhost:3050")
    };
  }

  Alta_mensaje = () => {
    const { idMateria, usuario, mensaje } = this.state;
    var data = new URLSearchParams();
    data.append("idMateria", idMateria);
    data.append("usuario", usuario._id);
    data.append("mensaje", mensaje);
    console.log(idMateria);
    console.log(usuario._id);
    console.log(mensaje);
    fetch(server.api + 'carrera/chat', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    })
      .then(function (res) {
        return res.json();
      })
      .then(data => {
        console.log("id de la respuesta:", data.respuesta);
      })
      .catch(function (res) {
        console.log("res", res);
      });

  };

  promesa = async () => {
    console.log("nombre", sessionStorage.getItem("chatActual_nombre"));
    const { session, idMateria } = this.state;
    console.log(idMateria);
    return new Promise(function (resolve, reject) {
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
          console.log(res, "res");
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
    this.setState({ idMateria: sessionStorage.getItem("chatActual") });
    this.setState({ nombreMateria: sessionStorage.getItem("chatActual_nombre") });
    this.setState({ usuario: JSON.parse(sessionStorage.getItem("session")) });
    var panel_usuarios  = document.getElementById("usuarios_panel");
    var panel = document.getElementById("Chat_panel");
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    this.state.socket.emit("conectar", this.state.usuario);
    this.state.socket.on('usuarios', function (data) {
      panel_usuarios.innerHTML = "Usuarios: " + data.usuarios;
    });
    this.state.socket.on('Mensaje_materia', function (data) {
      console.log("entra mensaje");
      console.log(data);
      panel.innerHTML += "<Typography component=\"p\">Usuario: " + data.mensaje.usuario +" " + hours + ":" + minutes + "<br>Mensaje: " + data.mensaje.mensaje + "</Typography><br><br>";
    });
    this.Listar();
  };

  _handleKeyDown = async e => {
    if (e.key === "Enter") {
      console.log("pru");
      var mensaje = document.getElementById("Chat_mensaje").value;
      
      console.log(mensaje);
      var usuario = this.state.usuario;
      await this.setState({ mensaje: mensaje });
      this.state.socket.emit("sala_materia", this.state.idMateria);
      this.state.socket.emit('mensaje', {
        sala: this.state.idMateria,
        mensaje: mensaje,
        usuario: usuario.nombre
      });
      this.Alta_mensaje();

    }
  };

  render() {
    return (
      <>
        <div id="usuarios_panel"></div>
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
            chat de materia : {this.state.nombreMateria}
          </h1>

          <div id="Chat_panel"></div>
          <FormControl
            style={{ position: "absolute", bottom: 0 }}
            margin="normal"
            fullWidth
          >
            <InputLabel htmlFor="name">Mensaje</InputLabel>
            <Input onKeyDown={this._handleKeyDown} id="Chat_mensaje" type="text" />
          </FormControl>
        </Paper>
      </>
    );
  }
}

export default Chat;
