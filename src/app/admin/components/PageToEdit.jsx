import React, { Component, PropTypes } from 'react';
import Button from '../../shared/components/Button';

export default class PageToEdit extends Component {
  render() {
    const { 
      page,
      updatePageName,
      pageEditable,
      canEditPage,
      pageToggleActive
    } = this.props;

    return (
      (pageEditable)
      ?
      <form>
        <input
          onChange={(e) => updatePageName(page.id, e.target.value)}
          type="text"
          value={page.name}
          />
        <label>
          active?  
          <input
            type="checkbox"
            onChange={pageToggleActive}
            checked={page.active}
            />
        </label>
      </form>
      :
      <div>
        <p>{page.name}</p>
        <Button
          flavor=""
          copy="edit"
          action={canEditPage} 
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
  updatePageName: PropTypes.func.isRequired,
  pageEditable: PropTypes.bool.isRequired,
  canEditPage: PropTypes.func.isRequired,
  pageToggleActive: PropTypes.func.isRequired
};
