import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Roles } from '../../../utils/constants'
import './Header.scss';

const SubMenu = Menu.SubMenu;
class Header extends Component {
  menus = [
    { path: '/home', title: <FormattedMessage id="PAGE_HOME" /> },
    { path: '/page1', title: <FormattedMessage id="PAGE_1" /> },
    { path: '/page2', title: <FormattedMessage id="PAGE_2" /> },
    { path: '/page3', title: <FormattedMessage id="PAGE_3" />, ext: <i className="fas fa-compact-disc" /> },
    {
      title: <FormattedMessage id="PAGE_4" />,
      isHide: () => (!this.props.showAdminMenu),
      path: '/page4',
      subMenu: [
        { path: '/page4/4-1', title: <FormattedMessage id="PAGE_4_1" /> },
        { path: '/page4/4-2', title: <FormattedMessage id="PAGE_4_2" /> },
        { path: '/page4/4-3', title: <FormattedMessage id="PAGE_4_3" /> },
        { path: '/page4/4-4', title: <FormattedMessage id="PAGE_4_4" /> },
      ]
    }
  ];

  onMenuSelect = ({ key }) => {
    if (key !== this.props.location.pathname) {
      if (key !== '/wufm')
        this.props.history.push(key)
      else
        window.open('http://107.113.53.103/WUFM/');
    } else {
      window.location.reload()
    }
  }

  render(){
    const { userName } = this.props;
    const menu = menuMaker(this.menus);
    return(
      <header className="header-container header-fixed-top">
        <div className="row">
          <div className="col-md-6">
            <div className="logo-header">
              <img className="logo-white" src="../images/logo-svmc-white.png" alt="description" />
              <img className="logo-color" src="../images/logo-svmc-color.png" alt="description" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="menu-bar">
              <Menu
                mode="horizontal"
                className="custom-menu"
                onClick={this.onMenuSelect}
                selectedKeys={[]}>
                {menu}
              </Menu>
              <div className="logout-header">
                <div className="user-menu">
                  <span className="user-name">{userName}<i className="fas fa-sort-down"></i></span>
                  <ul className="user-list">
                    <li>
                      <a className="menu-list" href="#/logout">
                        <FormattedMessage id="SIGNOUT" />
                        <i className="fas fa-sign-out-alt" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const menuMaker = (menuTable) => (
  menuTable.map(({ path, title, subMenu, ext, isHide }) => {
    if (isHide && isHide())
      return null;
    if (subMenu) {
      return (
        <SubMenu className="menuAdmin" key={path} title={<span>{title}{ext}</span>}>
          {menuMaker(subMenu)}
        </SubMenu>)
    }
    return (<Menu.Item key={path}><span>{title}{ext}</span></Menu.Item>)
  })
)

export default withRouter(
  connect(
    state => ({
      userName: state.system.userInfor.login,
      showAdminMenu: state.system.role === Roles.ROLE_ADMIN || state.system.role === Roles.ROLE_HR_LEADER
    })
  )(Header));