import { nanoid } from '@reduxjs/toolkit';
import { ConfigProvider } from 'antd';
import { isEmpty } from 'lodash';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.scss';
import { PUBNUB_PUBLISH_KEY, PUBNUB_SECRET_KEY, PUBNUB_SUBSCRIBE_KEY } from './constants';
import { useLazyGetUserQuery } from './redux/auth/auth.service';
import { selectAuthToken, selectAuthUser, setAuthToken } from './redux/auth/auth.slice';
import AppRoutes from './routes/AppRoutes';
import { localStorageUtil } from './utils/commonUtils';

function App() {
  const authTokenLocal = localStorageUtil.getItem('auth')?.authToken;
  const authTokenRedux = useSelector(selectAuthToken);
  const authUser = useSelector(selectAuthUser);
  const [triggerUserFetch] = useLazyGetUserQuery();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // After browser refresh, If auth token is present in local storage, set it on redux store
    if (authTokenLocal && authTokenLocal !== authTokenRedux) {
      dispatch(setAuthToken(authTokenLocal));
    }
  }, [authTokenLocal]);

  useLayoutEffect(() => {
    //After browser refresh, if authToken is present in redux store and user is empty,
    // fetch user and set it in redux store
    if (authTokenRedux && isEmpty(authUser)) {
      triggerUserFetch({});
    }
  }, [authTokenRedux, authUser]);

  const pubnub = new PubNub({
    publishKey: PUBNUB_PUBLISH_KEY,
    subscribeKey: PUBNUB_SUBSCRIBE_KEY ?? '',
    secretKey: PUBNUB_SECRET_KEY,
    uuid: nanoid(),
  });

  const antDesignTheme = {
    token: {
      colorPrimary: '#078080',
    },
  };

  return (
    <ConfigProvider theme={antDesignTheme}>
      <PubNubProvider client={pubnub}>
        <Router>
          <AppRoutes />
        </Router>
      </PubNubProvider>
    </ConfigProvider>
  );
}

export default App;
