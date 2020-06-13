import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import routes from './constants/routes';

// Components
import Header from './components/Header';
import Auth from './components/Auth';
import Groups from './components/Groups';
import Group from './components/Groups/Group';
import Profile from './components/Profile';
import NewDocument from './components/Document/New';
import PrivateRoute from './container/PrivateRoute';

import config from './config';

// Initialize Firebase
firebase.initializeApp(config.firebaseConfig);

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={routes.AUTH}>
          <Auth />
        </Route>
        <Route exact path={routes.PROFILE}>
          <PrivateRoute
            component={<Profile />}
          />
        </Route>
        <Route exact path={routes.GROUPS}>
          <PrivateRoute
            component={<Groups />}
          />
        </Route>
        <Route
          exact
          path={routes.GROUP}
          render={(props) =>(
            <PrivateRoute
              component={<Group {...props} />}
            />
          )}
        />
        <Route
          exact
          path={routes.DOCUMENT_NEW}
          render={(props) =>(
            <PrivateRoute
              component={<NewDocument {...props} />}
            />
          )}
        />

        <Route exact path="/">
          <PrivateRoute
            component={<Profile />}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
