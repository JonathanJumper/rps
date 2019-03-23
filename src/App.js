import React, { Component } from 'react';
import logo from './assets/logo.png';


class App extends Component {

  state = {
    player1: '',
    player2: '',

  };

  render() {
    return (
      <div className="App">

        <header className="App-header">
          ¿¡Piedra, Papel o Tijera!?
        </header>

        <div className="App-container">
          <button>
            Nuevo Juego
          </button>
          <button>
            Histórico
          </button>
        </div>

        <div>
          <img src={logo} className="logo"/>
        </div>

      </div>
    );
  }
}

export default App;
