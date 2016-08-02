import React, { Component, PropTypes } from 'react';
import Button from '../../shared/components/Button';

export default class PromptDeletePage extends Component {
  render() {
    const {
      confirmDeletePage,
      cancelDeletePage
    } = this.props;

    return (
      <div>
        <h4>Are you sure? You'll be permanently deleting all the items contained by this page?</h4>
        <form>
          <Button
            flavor=""
            copy="confirm"
            action={confirmDeletePage}
            />
          <Button
            flavor=""
            copy="cancel"
            action={cancelDeletePage}
            />
        </form>
      </div>
    );
  }
}

PromptDeletePage.propTypes = {
  confirmDeletePage: PropTypes.func.isRequired,
  cancelDeletePage: PropTypes.func.isRequired,
};
