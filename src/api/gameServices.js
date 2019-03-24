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

export default {getGames, getScores};