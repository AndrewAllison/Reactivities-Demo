import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../feature/navbar/NavBar';
import ActivityDashboard from '../activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from './../../feature/home/HomePage';
import ActivityForm from '../activities/form/ActivityForm';
import ActivityDetails from '../activities/details/ActivityDetails';
import NotFound from './NotFound';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route
                  exact
                  path='/activities'
                  component={ActivityDashboard}
                />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
