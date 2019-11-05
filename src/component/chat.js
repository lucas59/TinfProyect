import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
class chat extends Component {
    constructor() {
        super();
        this.state = {
            response: 0,
            endpoint: "http://localhost:3050"
        };
    }
    componentDidMount = () => {
        const {endpoint} = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("outgoing data", data =>console.log( data.num));
    }
    render() {
        console.log("prueba");
        return (
            <>

            </>
        )

    }
}

export default chat;