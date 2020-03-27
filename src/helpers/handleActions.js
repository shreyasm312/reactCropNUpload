import produce from 'immer';
export function handleActions(actionsMap, defaultState) {
  return (state = defaultState, { type, ...rest } = {}) =>
    produce(state, draft => {
      const action = actionsMap[type];
      let newState;
      if (action) {
        newState = action(draft, rest);
      }
      if (newState) {
        return newState;
      }
      return draft;
    });
}
