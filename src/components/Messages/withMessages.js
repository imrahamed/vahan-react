import React, { useContext } from 'react';
import { MessageContext } from './constants';

/**
 * HOC for message helpers
 * @param {React.Component} Component
 * @return {React.Component}
 */
const withMessages = (Component) => {
  return (props) => {
    /** @const {React.Context} */
    const messageContext = useContext(MessageContext);
    return <Component {...props} {...messageContext} />;
  };
}

export default withMessages;
