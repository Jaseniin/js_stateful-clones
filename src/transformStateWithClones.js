'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const stateCopy = { ...currentState };

      Object.assign(stateCopy, action.extraData);
      result.push(stateCopy);
      currentState = stateCopy;
    } else if (action.type === 'removeProperties') {
      const stateCopy = { ...currentState };

      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
      result.push(stateCopy);
      currentState = stateCopy;
    } else if (action.type === 'clear') {
      const stateCopy = {};

      result.push(stateCopy);
      currentState = stateCopy;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
