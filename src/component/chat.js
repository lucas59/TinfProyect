import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3050');

class chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };


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