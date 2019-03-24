import React, { Component } from 'react';
import api from "../api";

class Historic extends Component {

  state = {

    inScores: true, // wether showing games or scores

    scores: [],
    games: []

  };

  componentDidMount(){
    this.updateScores();
    this.updateGames();
  };

  updateScores = () => {
    api.game.getScores()
      .then( response => {
        console.log("scores", response.data.scores);
        this.setState({
          scores: response.data.scores
        })
      });
  };

  updateGames = () => {
    api.game.getGames()
      .then( response => {
        console.log("games", response.data.games);
        this.setState({
          games: response.data.games
        })
      });
  };

  handleScoresClick = () => {
    this.setState({inScores: true})
  };

  handleGamesClick = () => {
    this.setState({inScores: false})
  };

  render() {
    const {games, scores, inScores} = this.state;

    const renderList = () => {
      if(inScores){
        return scores.map( (score, index) => (
          <div className="score" key={index}>
            <span className="score-number">{index+1}.</span>  {score.player} <span className="score-wins"> {score.wins} </span>
          </div>
        ))
      }
      else{
        return games.map( (game, index)  => (
          <div className="game" key={index} >
            <div>
              <span className="game-player">{game.player1}</span>
              <span className="game-score">{game.player1Score}</span>
            </div>
            <br/>
            <div>
              <span className="game-player">{game.player2}</span>
              <span className="game-score">{game.player2Score}</span>
            </div>
          </div>
        ))
      }
    };

    return (
      <div className="container">
        <button className={inScores ? "m0" : "m0 greyed"} onClick={this.handleScoresClick}>
          Top Jugadores
        </button>
        <button className={inScores ? "m0 greyed" : "m0"} onClick={this.handleGamesClick}>
          Juegos
        </button>
        <div className="Historic-list">
          {renderList()}
        </div>
      </div>
    );
  }
}

export default Historic;
