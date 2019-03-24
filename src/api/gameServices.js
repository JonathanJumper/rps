import requestWrapper from './requestWrapper'

function getGames () {
  return requestWrapper({
    url:    '/games',
    method: 'GET'
  });
}

function getScores () {
  return requestWrapper({
    url:    '/scores',
    method: 'GET'
  });
}

function saveGame (player1, player2, player1Score, player2Score) {
  return requestWrapper({
    url:    '/games',
    method: 'POST',
    data: {
      player1,
      player2,
      player1Score,
      player2Score
    }
  });

};

export default {getGames, getScores, saveGame};