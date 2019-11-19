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
      idMateria: "",
      nombreMateria: '',
      usuario: '',
      mensaje: ''
    };
  }

  Alta_mensaje = () => {
    const { idMateria, usuario, mensaje  } = this.state;
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
    this.setState({usuario : JSON.parse(sessionStorage.getItem("session"))});
    //this.Listar();
  };
  
  _handleKeyDown = async e => {
    if (e.key === "Enter") {
      console.log("pru");
      var panel = document.getElementById("Chat_panel");
      var mensaje = document.getElementById("Chat_mensaje").value;
      console.log(mensaje);
      var usuario = this.state.usuario;
      await this.setState({mensaje: mensaje});
      panel.innerHTML += "<Typography component=\"p\">Usuario: " + usuario.nombre+ "<br> Mensaje: " + mensaje+"</Typography><br><br>";
      /*const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.emit("mensaje", sessionStorage.getItem("session"));*/
      this.Alta_mensaje();
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
