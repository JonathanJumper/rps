import React, { Component } from 'react';
import Form from './Form';
import Play from './Play';
import End from './End';
import { withToast } from '../../utils/ToastConsumer';
import api from "../../api/index";

class Game extends Component {

  state = {

    status: 'starting', //  [ 'starting', 'playing', 'finishing' ]

    // player names
    player1: '',
    player2: '',

    // first to get 3
    player1Score: 0,
    player2Score: 0,

    winner: -1,

    // aux to ensure players names in form
    player1NameError: false,
    player2NameError: false,

  };

  handleRestart = () => {
    this.setState({
      status: 'playing',
      player1Score: 0,
      player2Score: 0,
    })
  };

  saveWin = () => {
    const {player1, player2, player1Score, player2Score} = this.state;
    api.game.saveGame(player1, player2, player1Score, player2Score)
      .catch( () => {
        this.props.context.showToast("Hubo un error al guardar");
      })
  };
  checkForWinner = () => {
    const {player1, player2, player1Score, player2Score} = this.state;
    if( player1Score === 3 ){
      this.props.context.showToast(player1+" gana el juego");
      this.setState({status: 'finishing', winner: 1});
      this.saveWin();
    }
    else if ( player2Score === 3 ){
      this.props.context.showToast(player2+" gana el juego");
      this.setState({status: 'finishing', winner: 2});
      this.saveWin();
    }
  };

  handlePlayerWin = winner => {
    if(winner === 1){
      this.setState({player1Score: this.state.player1Score + 1}, this.checkForWinner);
    }
    else{
      this.setState({player2Score: this.state.player2Score + 1}, this.checkForWinner);
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
    const {status, player1, player2, player1NameError, player2NameError, player1Score, player2Score, winner} = this.state;
    return (
      <div className="container">
        {{
          starting:
            <Form player1={player1} player2={player2} player1Error={player1NameError} player2Error={player2NameError} handleChange={this.handlePlayersNameChange} handleSubmit={this.handlePlayersNameSubmit} />,
          playing:
            <Play player1={player1} player2={player2} player1Score={player1Score} player2Score={player2Score} handlePlayerWin={this.handlePlayerWin}/>,
          finishing:
            <End player1={player1} player2={player2} player1Score={player1Score} player2Score={player2Score} winner={winner} onRestart={this.handleRestart}/>
        }[status]}
      </div>
    );
  }
}

export default withToast(Game);
