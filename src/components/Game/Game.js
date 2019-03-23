import React, { Component } from 'react';
import GameForm from './Form';
import Play from './Play';

class Game extends Component {

  state = {

    status: 'playing', // 'playing', 'finishing'

    // player names
    player1: 'Jonathan',
    player2: 'Lucas',

    // first to win 3
    player1Wins: 0,
    player2Wins: 0,

    // aux to ensure players names in form
    player1NameError: false,
    player2NameError: false,

  };


  handlePlayerWin = winner => {
    const {player1, player2} = this.state;
    if(winner === 1){
      this.setState({player1Wins: this.state.player1Wins + 1});
    }
    else{
      this.setState({player2Wins: this.state.player2Wins + 1});
    }
  };

  handlePlayersNameChange = event => {
    this.setState({name: event.target.value});
  };

  handlePlayersNameSubmit = (event) => {

    // prevent html default, cause refreshing page
    event.preventDefault();

    //clear errors
    this.setState({player1NameError: false, player2NameError: false});

    const {player1, player2} = this.state;
    // names should be setted
    if(!player1){
      this.setState({player1NameError: true});
    }
    if(!player2){
      this.setState({player2NameError: true});
    }
    if(player1 && player2){
      this.setState({status: 'playing'})
    }

  };

  render() {
    const {status, player1, player2, player1NameError, player2NameError, player1Wins, player2Wins, toastMessage} = this.state;
    return (
      <div className="container">
        {{
          starting:
            <GameForm player1={player1} player2={player2} player1Error={player1NameError} player2Error={player2NameError} handleChange={this.handlePlayersNameChange} handleSubmit={this.handlePlayersNameSubmit} />,
          playing:
            <Play player1={player1} player2={player2} player1Wins={player1Wins} player2Wins={player2Wins} handlePlayerWin={this.handlePlayerWin}/>,
        }[status]}
      </div>
    );
  }
}

export default Game;
