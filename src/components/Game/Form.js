import React from 'react';

export default function GameForm({player1, player2, player1Error, player2Error, handleChange, handleSubmit}){
  return (
    <form className="Game-form" onSubmit={handleSubmit}>
      <input type="text" value={player1} onChange={handleChange('player1')} placeholder="nombre" className={player1Error ? "error" : ""} autoFocus={true} />
      Jugador 1

      <input type="text" value={player2} onChange={handleChange('player2')} placeholder="nombre" className={player2Error ? "error mt3" : "mt3"} />
      Jugador 2

      <input type="submit" value="Comenzar" className="mt5"/>
    </form>
  )
}