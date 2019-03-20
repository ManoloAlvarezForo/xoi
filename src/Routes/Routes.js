import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AuthRoute} from '../Routes/AuthRoute';

// Components.
import Error404 from '../components/Error404/Error404';
import AuthenticationPage from '../containers/AuthenticationPage/AuthenticationPage';

// Containers.
import DashboardPage from '../containers/DashboardPage/DashboardPage';
import ApplicantsPage from '../containers/ApplicantsPage/ApplicantsPage';
// import TemplatePage from '../containers/TemplatePage/TemplatePage';
import SettingsPage from '../containers/SettingsPage/SettingsPage';
import TopicsPage from '../containers/TopicsPage/TopicsPage';
import ProfilePage from '../containers/ProfilePage/ProfilePage';
import UsersPage from '../containers/UsersPage/UsersPage';
import SchedulerPage from '../containers/ScheluderPage/ScheluderPage';
import NotificationsPage from '../containers/NotificationPage/NotificationPage';

//Wrapper
import CustomDrawer from '../containers/Drawer/CustomDrawer';

const Routes = () => {
    return (
        <Switch>
            <Route  path="/access" component={AuthenticationPage} />
            <AuthRoute exact  path="/profile" component={ProfilePage} container={CustomDrawer}  />
            <AuthRoute exact path="/" component={DashboardPage} container={CustomDrawer}  />
            <AuthRoute exact  path="/applicants" component={ApplicantsPage} container={CustomDrawer}  />
            <AuthRoute exact  path="/settings" component={SettingsPage} container={CustomDrawer}  />
            <AuthRoute exact  path="/users" component={UsersPage} container={CustomDrawer}  />
            <AuthRoute exact  path="/scheduler" component={SchedulerPage} container={CustomDrawer}  />
            <AuthRoute exact  path="/notifications" component={NotificationsPage} container={CustomDrawer}  />
            <AuthRoute component={Error404} />
        </Switch>
    )
}

export default Routes;