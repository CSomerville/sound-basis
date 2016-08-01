import React, { Component, PropTypes } from 'react';
import Button from '../../shared/components/Button';

export default class PageToEdit extends Component {
  render() {
    const { 
      page,
      editPageName,
      canEditName 
    } = this.props;

    return (
      (canEditName)
      ?
      <div>
        {page.name} editable
      </div>
      :
      <div>
        {page.name}
        <Button
          flavor=""
          copy="edit name" 
          action={() => editPageName(page.id)}
          />
      </div>
    );
  }
}

PageToEdit.propTypes = {
  page: React.PropTypes.shape({
    active: PropTypes.bool,
    position: PropTypes.number,
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  editPageName: PropTypes.func.isRequired,
  canEditName: PropTypes.bool.isRequired
};
