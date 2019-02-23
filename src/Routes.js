import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';

import Login from './page/system/login';
import Error404 from './page/system/Error404';
import Home from './page/home/Home';
import Header from './page/system/header/Header';
import Footer from './page/system/footer/Footer';
import Admin from './page/admin/Admin';
import { Loading, SessionTimeOut } from './components';

import * as System from './actions/system';
import { Constants, Roles } from './utils/constants'
import { store } from './index';

const Logout = () => {
  store.dispatch(System.actionLogout());
  return <Redirect to='/login'/>
}
class Routes extends Component {


  render(){
    // Cookie.set(Constants.JWT, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDkwMjg3MzksInVzZXJfbmFtZSI6IlZvY3MvYWRtaW4iLCJhdXRob3JpdGllcyI6WyJTQ09OTkVDVC9ST0xFX0FETUlOIiwiVk9DUy9ST0xFX0FETUlOIl0sImp0aSI6IjY1ZmQzMDkxLWRkZjAtNDk0Yi1iMDIxLTk0YTBmYTkxMjM2NyIsImNsaWVudF9pZCI6IndlYl9hcHAiLCJzY29wZSI6WyJvcGVuaWQiXX0.K2Oun4qneb4mfmUb1uIcLmRVH2tt7fs3MSZShGsQP1YaILbWQT2KoZUUtrAPreFVDSYzkK2pzhzn1ZIAXwKLd32k5oIp1GflSxLtGENAC7CIEZm3UmGZt2Tkpo4W8BnPgY-awEV8zyOUQdmSwdDVIg8eggJEiMKTY_CtNlfet2JiI8YNt0nD0JYJgDEKIOjSqFVoMb_NMtJeAnc4MH37sG6Jir1aTtyVD0mFsjsNzTSbmakC4EqGnLV_re_EoIKAc8IHVEnk8bpjGgkPnzYfgOfaBO-0UQELY4K19qW-lfvNK0H5AK5fUaw1CTRHPMXAq6ivnzHctOmgVe2Uzx1I7g',
    //  { expires: new Date(Date.now() + Constants.EXPIRED_TIME)})
    return(
      <Switch>
        <Route exact path="/login" render={() => (<Login mode={Constants.LOGIN_CONST.LOGIN} />)} />
        <Route exact path="/logout" component={Logout} />      
        <Redirect exact from='/' to='/home' />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/admin" component={Admin}/>
        <Route component={Error404} />
      </Switch>
    )
  }
}

export default Routes

const PrivateRoute = ({ component: Component, passProps, ...rest }) => {
  const loggedIn = isAuthenticate();
  return (
    <Route
      {...rest}
      render={props => {
        const { role } = store.getState().system;
        if (!loggedIn) {
          return (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />);
        }
        if (isRestrict(props.location.pathname, role))
          return (<Redirect to={{ pathname: "/", state: { from: props.location } }} />);
        return (
          <React.Fragment>
            <Loading />
            <SessionTimeOut />
            <Header />
            <Component {...props} {...passProps} />
            <Footer />
          </React.Fragment>
        )
      }}
    />
  );
}

export function isAuthenticate() {
  return !!Cookie.get(Constants.JWT);
}

export function isRestrict(pathname, role) {
  return (ROLE_TABLE[pathname] && ROLE_TABLE[pathname].indexOf(role) === -1);
}

const ROLE_TABLE = {
  "/home": [Roles.ROLE_USER],
  "/admin": [Roles.ROLE_ADMIN, Roles.ROLE_HR_LEADER],
};