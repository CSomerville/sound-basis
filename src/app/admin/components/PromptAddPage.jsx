import React, { Component, PropTypes } from 'react';
import Button from '../../shared/components/Button';

export default class PromptAddPage extends Component {
  render() {
    const {
      newHasSubPages,
      newHasNoSubPages,
      cancelAddPage
    } = this.props;

    return (
      <div>
        <h4>should the new page have sub pages?</h4>
        <Button
          flavor=""
          copy="Yes to sub pages"
          action={newHasSubPages}
          />
        <Button
          flavor=""
          copy="No to sub pages"
          action={newHasNoSubPages}
          />
        <Button
          flavor=""
          copy="nevermind"
          action={cancelAddPage}
          />
      </div>
    );
  }
}

PromptAddPage.propTypes = {
  newHasSubPages: PropTypes.func.isRequired,
  newHasNoSubPages: PropTypes.func.isRequired,
  cancelAddPage: PropTypes.func.isRequired
};
