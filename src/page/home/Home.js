import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './Home.scss';
// import * as service from './HomeSevice';

class Home extends Component {
  componentWillMount() {
    // service.getNewsCategory()
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
  render(){
    return(
      <div className="page-content">
        <FormattedMessage id="PAGE_HOME"/>
      </div>
    )
  }
}

export default Home;