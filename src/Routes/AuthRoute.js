import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AUTH_TOKEN } from '../Utils/Constans/Communication'

function isAuthenticated() {
    return localStorage.getItem(AUTH_TOKEN) ? true : false;
}

export const AuthRoute = ({ component: Component, container: CustomContainer, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated() === true
                ? <CustomContainer {...props} body={Component} />
                : <Redirect to="/access" />
        )} />
    )
}
