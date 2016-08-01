import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import NavBar from '../../shared/components/NavBar';
import { fetchUnlockPages } from '../actions/edit-pages';

class EditPages extends Component {
  render() {

    const {
      fetchUnlockPages,
      editPagesGUI,
      pages
    } = this.props;

    const toolBarConfig = [{
      copy: 'done',
      action: fetchUnlockPages
    }];

    return (
      (editPagesGUI.canEdit)
      ?
      <div>
        loading...
      </div>
      :
      <div>
        <NavBar
          navChildren={toolBarConfig}
          />
        <div>
          {pages.map(page =>
            <div key={page.id}>
              {page.name}
            </div>
            )}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editPagesGUI: state.editPagesGUI,
  pages: state.pageData.pages
});

const mapDispatchToProps = dispatch => ({
  fetchUnlockPages: () => {
    dispatch(fetchUnlockPages());
    browserHistory.push('/admin');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPages);
