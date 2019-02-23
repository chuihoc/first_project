import { PureComponent } from 'react';
import Cookie from 'js-cookie';

import { Constants } from '../../utils/constants';

const Events = [
  'load',
  'mousemove',
  'mousedown',
  'click',
  'scroll',
  'keypress'
];

export default class SessionTimeOut extends PureComponent {

  constructor(props) {
    super(props);
    Cookie.set(Constants.EXPIRED, new Date().toISOString())
    // this.setTimeOut();
  }

  setTimeout = () => {
    const last = new Date(Cookie.get(Constants.EXPIRED) || new Date()).getTime();
    const now = Date.now();
    if (now - last >= Constants.EXPIRED_TIME) {
      window.location = '#/logout';
    }

    Cookie.set(Constants.JWT, Cookie.get(Constants.JWT), {expires: new Date(now + Constants.EXPIRED_TIME + 3000)});
    Cookie.set(Constants.EXPIRED, new Date().toISOString())

    if(this.timeOut) {
      clearTimeout(this.timeOut)
    }

    this.timeOut = setTimeout(() => {
      const last = new Date(Cookie.get(Constants.EXPIRED)).getTime();
      const now = Date.now();
      if (now - last >= Constants.EXPIRED_TIME) {
        window.location = '#/logout';
      }
    }, Constants.EXPIRED_TIME)
  }

  componentDidMount() {
    Events.forEach(event => {
      window.addEventListener(event, this.setTimeout)
    })
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    Events.forEach(event => {
      window.removeEventListener(event, this.setTimeout)
    })
  }
  render() {
    return null
  }
}
