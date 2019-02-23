import React, { Component } from 'react';
import { connect } from "react-redux";
import { HashRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { LocaleProvider } from 'antd';
import moment from 'moment';

import vi_VN from 'antd/lib/locale-provider/vi_VN';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';

import viMessages from './utils/locales/vi.json';
import enMessages from './utils/locales/en.json';

import Routes from './Routes';
import 'antd/dist/antd.css';
import './App.scss'

moment.locale('vi');
addLocaleData(en, enMessages);
addLocaleData(vi, viMessages);

const getLocale = (locale) => ({
  locale,
  messages: locale === 'en' ? enMessages : viMessages
})

class App extends Component {
  
  render() {
    const { locale } = this.props;
    return (
      <IntlProvider {...getLocale(locale)}>
        <LocaleProvider locale={vi_VN}>
          <HashRouter>
            <Routes />
          </HashRouter>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.system.locale
});

export default connect(mapStateToProps)(App);
