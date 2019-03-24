import React, { Component } from 'react';
import Form from './Game/Form';
import Play from './Game/Play';
import End from './Game/End';
import { withToast } from '../utils/ToastConsumer';

class Game extends Component {

  state = {

    status: 'starting', //  [ 'starting', 'playing', 'finishing' ]

    // player names
    player1: '',
    player2: '',

    // first to get 3
    player1Wins: 0,
    player2Wins: 0,

    winner: -1,

    // aux to ensure players names in form
    player1NameError: false,
    player2NameError: false,

  };

  handleRestart = () => {
    this.setState({
      status: 'playing',
      player1Wins: 0,
      player2Wins: 0,
    })
  };

  checkForWinner = () => {
    const {player1Wins, player2Wins, player1, player2} = this.state;
    if( player1Wins === 3 ){
      this.props.context.showToast(player1+" gana el juego");
      this.setState({status: 'finishing', winner: 1});
    }
    else if ( player2Wins === 3 ){
      this.props.context.showToast(player2+" gana el juego");
      this.setState({status: 'finishing', winner: 2});
    }
  };

  handlePlayerWin = winner => {
    if(winner === 1){
      this.setState({player1Wins: this.state.player1Wins + 1}, this.checkForWinner);
    }
    else{
      this.setState({player2Wins: this.state.player2Wins + 1}, this.checkForWinner);
    }
  };

  handlePlayersNameChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handlePlayersNameSubmit = (event) => {

    // prevent html default, cause refreshing page
    event.preventDefault();

    //clear errors
    this.setState({player1NameError: false, player2NameError: false});

    const {player1, player2} = this.state;
    // names should be setted
    if(!player1){
      this.props.context.showToast("Debe ingresar los nombres");
      this.setState({player1NameError: true});
    }
    if(!player2){
      this.props.context.showToast("Debe ingresar los nombres");
      this.setState({player2NameError: true});
    }
    if(player1 && player2){
      this.setState({status: 'playing'})
    }

  };

  render() {
    const {status, player1, player2, player1NameError, player2NameError, player1Wins, player2Wins, winner} = this.state;
    return (
      <div className="container">
        {{
          starting:
            <Form player1={player1} player2={player2} player1Error={player1NameError} player2Error={player2NameError} handleChange={this.handlePlayersNameChange} handleSubmit={this.handlePlayersNameSubmit} />,
          playing:
            <Play player1={player1} player2={player2} player1Wins={player1Wins} player2Wins={player2Wins} handlePlayerWin={this.handlePlayerWin}/>,
          finishing:
            <End player1={player1} player2={player2} player1Wins={player1Wins} player2Wins={player2Wins} winner={winner} onRestart={this.handleRestart}/>
        }[status]}
      </div>
    );
  }
}

export default withToast(Game);
