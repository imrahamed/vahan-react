import React from 'react';
import PropTypes from 'prop-types';

/**
 * @returns {React.Element}
 */
const TabPanel = ({
  children,
  value,
  index,
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && (
      <React.Fragment>
        {children}
      </React.Fragment>
    )}
  </div>
);

TabPanel.propTypes = {
  /** Current selected index of tab */
  value: PropTypes.number,
  /** Tab index */
  index: PropTypes.number,
  /** Tab contents */
  children: PropTypes.node,
};

export default TabPanel;