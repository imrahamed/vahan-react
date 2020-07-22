import React from 'react';

/** @const {React.Context} */
export const MessageContext = React.createContext();

/** @const @enum {Object<string,Symbol} */
export const MESSAGE_TYPES = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
};

/** @const @enum {Object<string,Symbol> */
export const MESSAGE_DISPATCHER_ACTIONS = {
  SEND_MESSAGE: Symbol(),
  SET_MESSAGE_DATA: Symbol(),
};
