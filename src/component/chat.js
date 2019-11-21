import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { server } from "../config/config";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListGroup from 'react-bootstrap/ListGroup';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.state = {
      response: 0,
      idMateria: sessionStorage.getItem("chatActual"),
      nombreMateria: sessionStorage.getItem("chatActual_nombre"),
      usuario: JSON.parse(sessionStorage.getItem("session")),
      mensaje: '',
      socket: socketIOClient(server.api),
      lista: ''
    };
  }

  Alta_mensaje = () => {
    const { idMateria, usuario, mensaje } = this.state;
    var data = new URLSearchParams();
    console.log("entra usuario", usuario);
    data.append("idMateria", idMateria);
    data.append("usuario", usuario.nombre + " " + usuario.apellido);
    data.append("tipo_usuario", usuario.tipo);
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
    console.log("entra promesa");
    console.log("nombre", sessionStorage.getItem("chatActual_nombre"));
    const { session, idMateria } = this.state;
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
          console.log("!", data);
          resolve(data);
        });
    });
  };

  Listar = () => {
    console.log("entra 2");
    this.promesa().then(async data => {
      console.log(data.retorno);
      if (data.retorno.mensajesChat.length > 0) {
        var ret = data.retorno.mensajesChat.map((data, i) => {
          console.log(data);
          let date_ob = new Date(data.fechaMensaje);
          let hours = date_ob.getHours();
          let minutes = date_ob.getMinutes();
          return (
            <ListGroup.Item>
              <Avatar alt="Remy Sharp" src="https://www.fourjay.org/myphoto/s/20/206383_user-png.png" />
              Nombre: {data.autormensaje} {hours}:{minutes} <br></br> Mensaje: {data.mensaje}</ListGroup.Item>
          );
        });
        await this.setState({ lista: ret });
        console.log(this.state.lista);
        this.scrollToBottom();
      } else {
        return <div>Lista vacia</div>;
      }
    });
  };
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'instant' });
  }
  componentDidMount = () => {
    const { socket, usuario, mensaje } = this.state;
    var panel_usuarios = document.getElementById("usuarios_panel");
    var panel = document.getElementById("Chat_panel");
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    console.log(usuario);
    socket.emit("conectar", usuario);
    socket.emit("sala_materia", this.state.idMateria);

    socket.on('usuarios', function (data) {
      console.log("usuarios: ", data);
      panel_usuarios.innerHTML = <ListItemText primary="+ data +" />;
    });
    socket.on('usuarios', function (data) {
      panel_usuarios.innerHTML = "Usuarios: " + data.usuarios;
    });
    socket.on('connectToRoom', function (data) {
      console.log(data);
    });
    socket.on('Mensaje_materia', function (data) {
      console.log("entra mensaje");
      console.log(data);
      panel.innerHTML += "<div role=\"tab\" tabindex=\"-1\" class=\"list-group-item\"><ListGroup.Item>Nombre: " + data.mensaje.usuario + " "+ data.mensaje.apellido + " " + hours + ":" + minutes + "<br>Mensaje: " + data.mensaje.mensaje + "</ListGroup.Item></div>";

    });
    console.log("entra 1");
    this.Listar();

  };


  _handleKeyDown = async e => {
    if (e.key === "Enter") {
      console.log("pru");
      var mensaje = document.getElementById("Chat_mensaje").value;
      console.log(mensaje);
      var usuario = this.state.usuario;
      await this.setState({ mensaje: mensaje });
      this.state.socket.emit('mensaje', {
        sala: this.state.idMateria,
        mensaje: mensaje,
        usuario: usuario.nombre,
        apellido: usuario.apellido
      });
      this.Alta_mensaje();
      document.getElementById("Chat_mensaje").value = "";

    }
  };

  render() {
    return (
      <>

        <div
          id="usuarios_panel"
        >
        </div>
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
          <h5 style={{ textAlign: "left" }}>
            Chat de materia : {this.state.nombreMateria}
          </h5>
          < ListGroup
            responsive
            id="Chat_panel"
            style={{ 'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto' }}
          >
            {this.state.lista}
            <div ref={el => { this.el = el; }} />
          </ ListGroup>
          <FormControl
            style={{ position: "absolute", bottom: '11px', width: '79%', left: '10%', borderRadius: '5px !important', border: '1px solid black', borderRadius: '10px', borderWidth: '1px', }}
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
