import React from 'react';
import { Link } from "react-router-dom";

export default function Menu(){
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
  )
}