import { retrieveAllAthletes, retrieveSelectedAthlete } from "./commons";

export const getAllAthletes = () => {
  return dispatch => {
    dispatch({type: 'GET_ALL_ATHLETES_LOADING'});
    retrieveAllAthletes()
      .then(athletes => {
        dispatch({
          type: 'GET_ALL_ATHLETES_SUCCESS',
          payload: athletes
        });
      }, error => {
        dispatch({
          type: 'GET_ALL_ATHLETES_ERROR',
          payload: error
        });
      });
  };
};

export const getAthlete = athleteId => {
  return dispatch => {
    dispatch({type: 'GET_ATHLETE_LOADING'});
    retrieveSelectedAthlete(athleteId)
      .then(selectedAthlete => {
        dispatch({
          type: 'GET_ATHLETE_SUCCESS',
          payload: selectedAthlete
        })
      }, error => {
        dispatch({
          type: 'GET_ATHLETE_ERROR',
          payload: error
        })
      })
  };
};