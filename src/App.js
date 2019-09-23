import React, { Component } from 'react';
import Cabecera from './component/navigation'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Body from './component/body'

class App extends Component {
  constructor() {
    super();
    this.state = { usuario: "" };
  }

  render() {
    return (
      <div>
        <Cabecera />
      </div>
    );
  }
}

export default App;
