import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
  render() {
    const {
      flavor,
      action,
      copy
    } = this.props;

    return (
      <button
        className={flavor}
        onClick={action}
        >
        {copy}
      </button>
    );
  }
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
  flavor: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired
};
