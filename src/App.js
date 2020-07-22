import React, { useState, useCallback, useMemo, useRef } from 'react';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import Snackbar from '@material-ui/core/Snackbar';
import ComputerIcon from '@material-ui/icons/Computer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Alert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';

import TabPanel from './components/TabPanel/index';
import MessageList from './components/MessageList/index';
import { useOnlineStatus, useUpdateEffect } from './hooks';

import './assets/scss/App.scss';

/**
 * Function to get accessibility props
 * @param {Number} index
 */
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

/**
 * @returns {React.Element}
 */
const App = () => {
  /** @const {Boolean} */
  const onlineStatus = useOnlineStatus();

  const [activeTab, setActiveTab] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState();
  const lastStatus = useRef(onlineStatus);

  /**
   * Callback when tab is changed
   * @param {Event} event tab change event
   * @param {Number} value selected tab index
   */
  const onChangeTab = useCallback((event, value) => {
    setActiveTab(value);
  }, []);

  /**
   * @const {Object<string,?>}
   */
  const tabData = useMemo(() => {
    return [{
      key: 'chat',
      name: 'Chat',
      icon: <ChatIcon />,
      contents: <MessageList />
    }, {
      key: 'jobs',
      name: 'My jobs',
      icon: <BusinessCenterIcon />
    }, {
      key: 'profile',
      name: 'My profile',
      icon: <AccountCircleIcon />
    }, {
      key: 'learn',
      name: 'Learn',
      icon: <ComputerIcon />
    }];
  }, []);

  /**
   * Set old online status in lastStatus
   * and reset showSnackbar state
   */
  useUpdateEffect(() => {
    setShowSnackbar(true);
    lastStatus.current = onlineStatus;
  }, [onlineStatus]);

  /**
   * Boolean to check if app is offline
   * @type {Boolean}
   */
  const isOffline = useMemo(() => {
    return lastStatus.current && !onlineStatus;
  }, [onlineStatus]);

  /**
   * Boolean to check if app is online from ofline status
   * @type {Boolean}
   */
  const isBackOnline = useMemo(() => {
    return !lastStatus.current && onlineStatus;
  }, [onlineStatus]);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Tabs
          value={activeTab}
          variant="fullWidth"
          onChange={onChangeTab}
          aria-label="simple tabs"
        >
          {tabData.map((tab, index) => (
            <Tab
              key={tab.key}
              icon={tab.icon}
              label={tab.name}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabData.map((data, index) => (
        <TabPanel key={data.key} value={activeTab} index={index}>
          {data.contents}
        </TabPanel>
      ))}

      {/* Offline snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={6000}
        open={showSnackbar && isOffline}
        onClose={setShowSnackbar.bind(this, false)}
      >
        <Alert variant="filled" severity="error">
          You are offline!
        </Alert>
      </Snackbar>

      {/* Online snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={6000}
        open={showSnackbar && isBackOnline}
        onClose={setShowSnackbar.bind(this, false)}
      >
        <Alert variant="filled" severity="success">
          You are back online!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default App;
