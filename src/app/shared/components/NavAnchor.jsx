import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavAnchor extends Component {
  render() {
    const {
      url,
      copy
    } = this.props;

    return (
      <Link
        to={url}
        >
        {copy}
      </Link>
    );
  }
}

NavAnchor.propTypes = {
  url: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired
};
