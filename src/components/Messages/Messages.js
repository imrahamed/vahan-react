import React, { useMemo, useEffect, useReducer } from 'react'

import withMessages from './withMessages';
import messageLocalStore from './messageLocalStore';
import { messageReducer, messagesInitialState } from './store';
import { MessageContext, MESSAGE_DISPATCHER_ACTIONS } from './constants';

/**
 * @returns {React.Element}
 */
const MessageList = ({ children }) => {
  const [messageContextState, messageContextDispatch] = useReducer(
    messageReducer,
    messagesInitialState
  );

  /** @const {Object<string, Function>} */
  const messageContextDispatchers = useMemo(() => {
    return {
      sendMessage: (payload) => {
        messageLocalStore.push(payload);

        messageContextDispatch({
          type: MESSAGE_DISPATCHER_ACTIONS.SEND_MESSAGE,
          payload,
        });
      }
    };
  }, [messageContextDispatch]);

  useEffect(() => {
    /** @const {!Array<!Object<string,?>} */
    const cachedMessages = messageLocalStore.get();

    if (cachedMessages.length) {
      messageContextDispatch({
        type: MESSAGE_DISPATCHER_ACTIONS.SET_MESSAGE_DATA,
        payload: cachedMessages,
      });
    }
  }, []);

  return (
    <MessageContext.Provider
      value={{
        ...messageContextState,
        ...messageContextDispatchers,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default withMessages(MessageList);