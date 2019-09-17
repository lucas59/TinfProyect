import React, { Component, View, Text } from 'react';
import Cabecera from './navigation'

class alta_carrera extends Component {

    constructor() {
        super();

    }


    render() {
        return (
            <>
                <h1>Alta carrera</h1>
                <form>
                    <input type="submit" name="Nombre de la carrera" />

                </form>
            </>
        );
    }
}

export default alta_carrera;