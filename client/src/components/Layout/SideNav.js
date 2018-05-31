import React, { Component } from 'react';
import SideNavLink from './SideNavLink';

import './style.css';

const URL_MAP = [
  { url: '/', text: 'Child & Family Teams' },
  { url: '/reports', text: 'Reports' },
];

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { activeLink: '' };
    this.toggleActiveLink = this.toggleActiveLink.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  toggleActiveLink(href) {
    this.setState({ activeLink: href });
  }

  isActive(href) {
    return this.state.activeLink === href;
  }

  render() {
    return (
      <nav className={'sidebar'}>
        {URL_MAP.map((item, index) => {
          return (
            <SideNavLink
              key={index}
              id={item.url.substr(1)}
              href={item.url}
              text={item.text}
              onClick={() => {
                this.toggleActiveLink(item.url);
              }}
              active={this.isActive(item.url)}
            />
          );
        })}
      </nav>
    );
  }
}

export default SideNav;
