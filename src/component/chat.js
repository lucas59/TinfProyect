import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
class chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: 0,
            endpoint: "http://localhost:3050",
            titulo: ''
        };
    }
    componentDidMount = () => {
        var tit;
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit("click", sessionStorage.getItem("session"));
        socket.on('titulo', function (data) {
            console.log(data);
            tit = data;
        });
        this.setState({ titulo: tit });
        console.log(this.state.titulo);
    }



    render() {
        console.log(this.state.titulo);
        return (
            <>
                <label>{this.state.titulo}</label>
            </>
        )

    }
}

export default chat;