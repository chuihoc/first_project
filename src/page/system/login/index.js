import React from 'react';
import Cookie from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.css';

import Login from './Login';
import { JWT, LOGIN_CONST } from '../../../utils/constants/constants';
import { injectIntl } from 'react-intl';
import './Login.scss';

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props);
    if (Cookie.get(JWT) && true) {
      window.history.back();
    }
  }

  render = () =>
    (<div className="jwt-login">
      <div className="content-login">
        <div className="container">
          <div className="row content-login-center">
            <div className="content-login-left col-md-6 col-lg-5 col-xl-5">
              <div className="login-tit">
                {/*<span className="wow fadeInDown" data-wow-delay=".2s"><FormattedMessage id="WELCOME" /></span>
                <span className="wow fadeInUp" data-wow-delay=".6s">SVMC Connect</span>*/}
              </div>
               {/*================================START=====================================  */}
               {this.props.mode === LOGIN_CONST.LOGIN &&
                <div className="jwt-wrapper wow fadeInUp" data-wow-delay="1s">
                  <Login />
                </div>}
              {/*{this.props.mode === LOGIN_CONST.RESET_INIT &&
                <div className="jwt-wrapper reset-pass wow fadeInUp" data-wow-delay="1s">
                  <Forgot init t={this.t} />
                </div>}
              {this.props.mode === LOGIN_CONST.MAIL_SENT &&
                <div className="jwt-wrapper reset-pass wow fadeInUp" data-wow-delay="1s">
                  <Forgot t={this.t} />
                </div>}
              {this.props.mode === LOGIN_CONST.RESET_FINISH &&
                <div className="jwt-wrapper reset-pass wow fadeInUp" data-wow-delay="1s">
                  <Reset init t={this.t} />
                </div>}
              {this.props.mode === LOGIN_CONST.RESET_DONE &&
                <div className="jwt-wrapper reset-pass wow fadeInUp" data-wow-delay="1s">
                  <Reset t={this.t} />
                </div>}*/}
              {/* =====================END=========================================================== */}
            </div>
            <div className="col-md-6 col-lg-7 col-xl-7">
                <div className="content-login-right">
                  <div className="logo-img-login">
                    <img src="images/logo-svmc-color.png" alt="logo SVMC" />
                  </div>
                  <div className="bg-logo-img-login wow fadeInDown" data-wow-delay=".6s">
                    <img src="images/login-astronaut.png" alt="logo Login" />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-login">
        <span>© 2018 SVMC. All rights reserved - Design by UX Team</span>
      </div>
    </div>)
}

export default injectIntl(LoginWrapper);