import React from 'react';
import PropTypes from 'prop-types';

import { MESSAGE_TYPES } from '../Messages/index';

import '../../assets/scss/components/messages.scss';

/**
 * @returns {React.Element}
 */
const Message = ({ type, message }) => {
  if (type === MESSAGE_TYPES.SENT) {
    return (
      <div className="message message-sent">
        <div className="message-content message-sent-content">
          {message}
        </div>
      </div>
    )
  }

  if (type === MESSAGE_TYPES.RECEIVED) {
    return (
      <div className="message message-received">
        <div className="message-content message-received-content">
          {message}
        </div>
      </div>
    )
  }

  return null;
};

Message.propTypes = {
  data: PropTypes.oneOf([
    Object.values(MESSAGE_TYPES),
  ]),
  message: PropTypes.string,
};

export default Message;

