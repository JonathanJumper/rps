import React, { Component } from 'react';

import rck_left from '../../assets/rck_left.png';
import pap_left from '../../assets/pap_left.png';
import sci_left from '../../assets/sci_left.png';
import rck_right from '../../assets/rck_right.png';
import pap_right from '../../assets/pap_right.png';
import sci_right from '../../assets/sci_right.png';

import {TYPES} from "../../utils/constants";
import { withToast } from '../../utils/ToastConsumer';

class Play extends Component {

  state = {
    turn: 1, // 2
    player1Choice: '',
    player2Choice: ''
  };

  handlePlayer1Choice = value => event => {
    this.setState({player1Choice: value, turn: 2});
  };

  handlePlayer2Choice = value => event => {
    this.setState({player2Choice: value}, this.handleFinish);
  };

  handleDraw = () => {
    this.props.context.showToast("Empate");
    this.setState({ turn: 1 });
  };

  handleFinish  = () => {
    const {player1, player2, handlePlayerWin} = this.props;
    const {player1Choice, player2Choice} = this.state;
    if(
         (player1Choice === TYPES.ROCK && player2Choice === TYPES.ROCK)
      || (player1Choice === TYPES.PAPER && player2Choice === TYPES.PAPER)
      || (player1Choice === TYPES.SCISSOR && player2Choice === TYPES.SCISSOR)
    ){
      this.handleDraw();
    }
    else if(
      (player1Choice === TYPES.ROCK && player2Choice === TYPES.SCISSOR)
      || (player1Choice === TYPES.PAPER && player2Choice === TYPES.ROCK)
      || (player1Choice === TYPES.SCISSOR && player2Choice === TYPES.PAPER)
    ){
      handlePlayerWin(1);
      this.props.context.showToast("Gana "+player1);
      this.setState({ turn: 1 });
    }
    else{
      handlePlayerWin(2);
      this.props.context.showToast("Gana "+player2);
      this.setState({ turn: 1 });
    }
  };


  render() {
    const {player1, player2, player1Wins, player2Wins} = this.props;
    const {turn} = this.state;

    const playImages = () => {
      if(turn === 1)
        return(
          <div className="Play-images">
            <img src={rck_left} alt="rck_left" onClick={this.handlePlayer1Choice(TYPES.ROCK)}/>
            <img src={pap_left} alt="pap_left" onClick={this.handlePlayer1Choice(TYPES.PAPER)}/>
            <img src={sci_left} alt="sci_left" onClick={this.handlePlayer1Choice(TYPES.SCISSOR)}/>
          </div>
        );
      else{
        return(
          <div className="Play-images">
            <img src={rck_right} alt="rck_right" onClick={this.handlePlayer2Choice(TYPES.ROCK)}/>
            <img src={pap_right} alt="pap_right" onClick={this.handlePlayer2Choice(TYPES.PAPER)}/>
            <img src={sci_right} alt="sci_right" onClick={this.handlePlayer2Choice(TYPES.SCISSOR)}/>
          </div>
        );
      }
    };

    return (
      <div className="Play-container">

        <header className="Play-header">
          {player1} <span style={{color: '#00DF5F'}}> {player1Wins} -  {player2Wins} </span> {player2}
        </header>
        <header className="Play-header">
          Turno de {turn === 1 ? player1 : player2}
        </header>

        {playImages()}

      </div>
    );
  }
}

export default withToast(Play);
