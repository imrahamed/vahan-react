import { MESSAGE_DISPATCHER_ACTIONS } from './constants';

/** @const {Object<string, ?>} */
export const messagesInitialState = {
  messages: [],
};

/**
 * State reducer for navbar
 * @param {Object<string, ?>} state
 * @param {Object<string, ?>} action
 * @return {Object<string, ?>}
 */
export function messageReducer(state, action) {
  if (action.type === MESSAGE_DISPATCHER_ACTIONS.PUSH_MESSAGE) {
    const messages = state.messages;
    messages.push(action.payload);

    state = {
      ...state,
      messages,
    };
  }

  if (action.type === MESSAGE_DISPATCHER_ACTIONS.SET_MESSAGE_DATA) {
    const messages = action.payload;

    state = {
      ...state,
      messages
    };
  }

  return state;
}
