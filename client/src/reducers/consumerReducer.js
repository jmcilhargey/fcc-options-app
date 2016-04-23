
var commons = require('../commons/commonReducerFunctions');
var actionTypes = require('../constants/actionTypes/modelActionTypes');
const CONSUMERS = require('../constants/models').CONSUMERS;

// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || {ids:[], data:{}, needToBeFetched: true};
  
  if (action.model !== CONSUMERS) {
    return state;
  }

  switch (action.type){
    case actionTypes.FETCH:
      if (action.status === actionTypes.LOADING) {
        return commons.setRequested(state);
      }
      if (action.status === actionTypes.SUCCESS) {
        return commons.load(state, action.response);
      }
      if (action.status === actionTypes.ERROR) {
        return commons.fetchError(state);
      }
    case actionTypes.UPDATE:
      if (action.status === actionTypes.SUCCESS) {
        return commons.update(state, action.response);
      }
    case actionTypes.CREATE:
      if (action.status === actionTypes.SUCCESS) {
        return commons.add(state, action.response);
      }
    case actionTypes.DELETE:
      if (action.status === actionTypes.SUCCESS) {
        return commons.destroy(state, action.id);
      }
    default:
      return state;
  }
};

module.exports = reducer;
