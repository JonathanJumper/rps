import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Menu extends Component {

  render() {
    return (
      <div className="container">

        <Link to="/play">
          <button >
            Nuevo Juego
          </button>
        </Link>

        <Link to="/historic">
          <button >
            Histórico
          </button>
        </Link>

      </div>
    );
  }
}

export default Menu;
