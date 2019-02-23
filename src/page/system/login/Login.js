import React, { Component } from 'react';
import { Form, Button, Icon, Checkbox, Input, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';

import injectIntl from '../../../utils/hoc/intl';
import { LAST_LOGIN, JWT, EXPIRED_TIME } from '../../../utils/constants/constants';
import * as Services from './LoginService';
import { actionUpdateRoles, actionUpdateUserInfo } from '../../../actions/system'
import './Login.scss'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, data) => {
      if (!error) {
        this.setState({ loading: true });
        Services.requestLogin(data)
          .then(res => {
            Cookie.set(JWT, res.data.id_token, { expires: new Date(EXPIRED_TIME + Date.now() + 3000) }) 
            window.location = '#/'
            this.setState({ loading: false })
            Services.getAccountInfo()
            .then(res => {
              this.props.actionUpdateRoles(res.data.authorities[0]);
              this.props.actionUpdateUserInfo(res.data)
            }) 
          })
          .catch(this.onError)
      }
    })
  }

   onError = (err) => {
    this.setState({ loading: false });
    const { setFields, getFieldValue } = this.props.form;
    try {
      message.config({
        maxCount: 1,
      });
      switch (err.response.data.code) {
        case 2001:
          setFields({
            username: {
              value: getFieldValue('username'),
              errors: [new Error(this.props.t('USENAME_IS_INCORRECT'))]
            }
          })
          break;
        case 2004:
          setFields({
            password: {
              value: getFieldValue('password'),
              errors: [new Error(this.props.t('PASSWORD_IS_INCORRECT'))]
            }
          })
          break;
        case 2007:
          message.warn(this.props.t('PERMISSION_TO_ACCESS'))
          break;
        case 2008:
          message.warn(this.props.t('INACTIVETED'))
          break;
        case 2009:
          setFields({
            password: {
              value: getFieldValue('password'),
              errors: [new Error(this.props.t('WRONG_PASSWORD'))]
            }
          })
          break;
        case 3006:
          message.warn(this.props.t('CANNOT_CONNECT'))
          break;
        default:
          break;
      }
    } catch (error) {
      message.error(this.props.t('UNKNOW_ERROR'));
    }
  }

  usrFieldOptions = {
    rules: [
      { required: true, message: this.props.t('ADD_FAQ') },
      { min: 4, message: this.props.t('ADD_FAQ') },
      { pattern: "^[_'.@A-Za-z0-9-]*$", message: this.props.t('ADD_FAQ')}
    ],
    getValueFromEvent: (e) => (e.target.value.trim())
  }
  
  pwdFieldOptions = {
    rules: [
      { required: true, message: this.props.t('ADD_FAQ') },
      { min: 4, message: this.props.t('ADD_FAQ') }
    ],
    getValueFromEvent: (e) => (e.target.value.trim())
  }

   componentDidMount() {
    const lastLogin = Cookie.get(LAST_LOGIN);
    if (!!lastLogin) {
      this.props.form.setFieldsValue({ username: lastLogin, rememberMe: true });
    } else {
      this.props.form.setFieldsValue({ username: "", password: "", rememberMe: false });
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label={<FormattedMessage id="USERNAME" />}>
          {getFieldDecorator('username', this.usrFieldOptions)(
            <Input
              maxLength={32}
              prefix={<Icon type="user" className="icon-gray" />}
              placeholder={this.props.t('ADD_FAQ')} />
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage id="PASSWORD" />}>
          {getFieldDecorator('password', this.pwdFieldOptions)(
            <Input
              type="password"
              maxLength={32}
              prefix={<Icon type="lock" className="icon-gray" />}
              placeholder={this.props.t('ADD_FAQ')} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rememberMe', {
            valuePropName: 'checked',
          })(<Checkbox><FormattedMessage id="REMEMBER_ME" /></Checkbox>)}
        </Form.Item>
        <div className="form-group">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-login"
            loading={this.state.loading}>
            <FormattedMessage id="LOGIN" />
          </Button>
        </div>
        <div className="form-group">
          <a className="pointer" href='http://localhost' target="_blank">
            <FormattedMessage id="FORGOT_PASSWORD" />
            <FormattedMessage id="RESET_PASSWORD" />
          </a>
        </div>
      </Form>
    )
  }
}

export default connect(
  null,
  {
    actionUpdateRoles,
    actionUpdateUserInfo
  }
)(injectIntl(Form.create()(Login)));