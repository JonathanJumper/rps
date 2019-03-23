import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './assets/logo.png';

import Menu from './components/Menu'
import Game from './components/Game/Game'
import Toast from './components/Toast';

export const AppContext = React.createContext();

class App extends Component {

  state= {
    toastVisible: false,
    toastMessage: 'asasas'
  };

  showToast = (message) => {
    this.setState({toastVisible: true, toastMessage: message}
      , () => {
        window.setTimeout(() =>
          this.setState({toastVisible: false})
        , 2000)
    })
  };

  render() {
    const {toastMessage, toastVisible} = this.state;
    return (
      <AppContext.Provider value={{showToast: this.showToast}}>
        <Router>
          <div className="App">

            <header className="App-header">
              ¿¡Piedra, Papel o Tijera!?
            </header>

            <div className="App-container">
              <Route path="/" exact component={Menu} />
              <Route path="/play" exact component={Game} />
              <Route path="/historic" exact component={Menu} />
            </div>

            <div>
              <img src={logo} className="App-logo" alt="logo"/>
            </div>

            <Toast message={toastMessage} visible={toastVisible} />

          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
