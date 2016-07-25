import React, { Component, PropTypes } from 'react';
import NavAnchor from './NavAnchor';

export default class NavBar extends Component {
  render() {
    const { navChildren } = this.props;
    return (
      <nav>
        <ul>
          {navChildren.map((child, i) => 
            <li key={i}>
             <NavAnchor
                url={child.url}
                copy={child.copy}
                />
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
