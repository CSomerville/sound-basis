import React, { Component, PropTypes } from 'react';

export default class SubPage extends Component {
  render() {

    const {
      id,
      imageSrc,
      name
    } = this.props;

    return (
      <div
        className="sub-page card"
        >
        <div className="holds-image">
          <img src={imageSrc} />
        </div>
        <hr />
        <h1>
          {name}
        </h1>
      </div>        
    );
  }
}

SubPage.propTypes = {
  id: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
