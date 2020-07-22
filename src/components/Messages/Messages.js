import React, { useMemo, useEffect, useReducer, useCallback } from 'react'

import Api from '../../utils/Api';
import withMessages from './withMessages';
import { MESSAGE_TYPES } from './constants';
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

  const updateStores = useCallback(payload => {
    messageLocalStore.push(payload);

    messageContextDispatch({
      type: MESSAGE_DISPATCHER_ACTIONS.PUSH_MESSAGE,
      payload,
    });
  }, [])

  /** @const {Object<string, Function>} */
  const messageContextDispatchers = useMemo(() => {
    return {
      sendMessage: (payload) => {
        updateStores(payload);

        Api.sendNewMessage(payload.message)
          .then(result => {
            const receivedMessagePayload = {
              type: MESSAGE_TYPES.RECEIVED,
              message: result.title,
            };

            updateStores(receivedMessagePayload);
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