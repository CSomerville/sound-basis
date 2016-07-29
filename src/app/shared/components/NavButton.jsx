import React, { Component, PropTypes } from 'react';

export default class NavButton extends Component {
  render() {
    const {
      copy,
      action
    } = this.props;

    return (
      <button
        onClick={action}
        >
        {copy}
      </button>
    );
  }
}

NavButton.propTypes = {
  copy: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};
