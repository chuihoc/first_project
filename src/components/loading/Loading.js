import React from 'react';
import { connect } from 'react-redux';
import './Loading.scss';

export const Loading = (props) =>
  (<div className={`loading-wrapper ${props.isLoading ? 'ld-show' : 'ld-hide'} ${props.dark ? 'ld-dim-dark' : 'ld-dim-light'}`}>
    <div className="middle-sreen">
      <div className="loader" />
    </div>
  </div>)
Loading.defaultProp = {
  dark: false
}
const mapStateToProps = (state) => ({ isLoading: state.system.isLoading });
export default connect(mapStateToProps)(Loading)