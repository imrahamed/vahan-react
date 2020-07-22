import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

// icons
import SendIcon from '@material-ui/icons/Send';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';


const TextField = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  /**
   * Callback when message is changed
   * @param {Event} event
   */
  const onChangeMessage = useCallback(event => {
    setMessage(event.target.value);
  }, []);

  /**
   * Callback when form is submitted
   * @param {Event} event form submit event
   */
  const onFormSubmit = useCallback((event) => {
    /**
     * Form submit will reload the page by default
     */
    event && event.preventDefault();

    if (!message) {
      return;
    }

    onSubmit(message);

    setMessage('');
  }, [message, onSubmit]);

  const inputRef = useRef(null);

  return (
    <form onSubmit={onFormSubmit} className="add-message-form">
      <Grid
        container
        spacing={1}
        alignItems="center"
        className="add-message-input"
      >
        <Grid item>
          <IconButton disableRipple>
            <InsertEmoticonIcon />
          </IconButton>
        </Grid>
        <Grid item xs sm md lg xl>
          <InputBase
            fullWidth
            value={message}
            onChange={onChangeMessage}
            placeholder="Enter a message"
          />
        </Grid>
        <input id="file_input_file" style={{display: "none"}} type="file" ref={inputRef }/>
        <Grid item>
          <IconButton onClick={e => {
                 inputRef.current.click();
              }} disableRipple>
            <CameraAltIcon />
          </IconButton>
        </Grid>
      </Grid>
      <IconButton disableRipple onClick={onFormSubmit.bind(this, null)}>
        <SendIcon />
      </IconButton>
    </form>
  )
};

TextField.propTypes = {
  /** Callback when message is submitted */
  onSubmit: PropTypes.func,
}

export default TextField;