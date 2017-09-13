import fetch from 'isomorphic-fetch';

export const fetchAllAthletes = () => {
  return fetch('http://localhost:8080/data/athletes.json')
    .then(resp => resp.json())
};

export const getAllAthletes = () => {
  return dispatch => {
    dispatch({type: 'GET_ALL_ATHLETES_LOADING'});
    fetchAllAthletes()
      .then(athletes => {
        dispatch({
          type: 'GET_ALL_ATHLETES_SUCCESS',
          payload: athletes
        })
      }, err => {
        dispatch({
          type: 'GET_ALL_ATHLETES_ERROR',
          payload: err
        })
      })
  }
};

const fetchAthlete = (athleteId) => {
  return fetch('http://localhost:8080/data/athletes.json')
    .then(resp => resp.json())
    .then(athletes => athletes.find((athlete) => athlete.id === athleteId))
};

export const getAthlete = athleteId => {
  return function (dispatch) {
    dispatch({
      type: 'GET_ATHLETE_LOADING'
    });

    fetchAthlete(athleteId)
      .then(athletes => {
        dispatch({
          type: 'GET_ATHLETE_SUCCESS',
          payload: athletes
        })
      }, err => {
        dispatch({
          type: 'GET_ATHLETE_ERROR',
          payload: err
        })
      })
  }
};