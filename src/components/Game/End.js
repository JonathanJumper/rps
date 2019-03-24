import React from 'react';
import { Link } from "react-router-dom";

export default function End({player1, player2, player1Score, player2Score, winner, onRestart}){
  return (
    <div className="Game-end">
      <div>
        {winner === 1 ? player1 : player2 } le gana el juego a { winner === 1 ?  player2 : player1 } por
        <span className="accent ml1">{ winner === 1 ? player1Score : player2Score }</span> a <span className="accent">{ winner === 1 ? player2Score : player1Score  }</span>
      </div>
      <div className="End-buttons">

        <button className="mb3 mt5" onClick={onRestart}>
          Revancha
        </button>

        <Link to="/historic">
          <button >
            Historico
          </button>
        </Link>

        <Link to="/">
          <button>
            Inicio
          </button>
        </Link>
      </div>
   </div>
  )
}