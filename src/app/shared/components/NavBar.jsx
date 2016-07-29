import React, { Component, PropTypes } from 'react';
import NavAnchor from './NavAnchor';
import NavButton from './NavButton';

export default class NavBar extends Component {
  render() {
    const { navChildren } = this.props;
    return (
      <nav>
        <ul>
          {navChildren.map((child, i) => 
            <li key={i}>
              {(child.url)
              ?
              <NavAnchor
                url={child.url}
                copy={child.copy}
                />
              :
              <NavButton
                copy={child.copy}
                action={child.action}
                />
              }
            </li> 
          )}
        </ul>
      </nav>
    );
  }
}

NavBar.propTypes = {
  navChildren: PropTypes.array.isRequired
}
