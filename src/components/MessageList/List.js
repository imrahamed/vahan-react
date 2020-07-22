import React, { useCallback } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Message from './Message';
import TextField from './TextField';
import MessageProvider, { MESSAGE_TYPES, withMessages } from '../Messages/index';

import '../../assets/scss/components/messages.scss';

/**
 * @returns {React.Element}
 */
const MessageList = withMessages(({
  messages,
  sendMessage,
}) => {
  const onAddMessage = useCallback((message) => {
    sendMessage({ type: MESSAGE_TYPES.SENT, message })
  }, [sendMessage]);

  return (
    <Box className="message-list-container">
      <Grid container direction="column">
        {messages.map((message, index) => (
          <Grid item key={index}>
            <Message {...message} />
          </Grid>
        ))}
      </Grid>
      <TextField onSubmit={onAddMessage} />
    </Box>
  );
});

/**
 * Wrapper function for providing messages to list
 * @returns {React.Element}
 */
export default function() {
  return (
    <MessageProvider>
      <MessageList />
    </MessageProvider>
  );
};