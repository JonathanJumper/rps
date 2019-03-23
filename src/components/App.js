import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../assets/logo.png';

import Menu from './Menu'
import Game from './Game/Game'
import Toast from './Toast';

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
              <Link to="/">
                ¿¡Piedra, Papel o Tijera!?
              </Link>
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
