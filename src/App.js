import React, { Component } from 'react';
import Cabecera from './component/navigation'
import Body from './component/body'

class App extends Component {
  constructor() {
    super();
    this.state = { usuario: "" };
  }

  render() {
    return (
      <div className="App">
              <Cabecera />
              <Body/>

      </div>


    );
  }
}

export default App;
