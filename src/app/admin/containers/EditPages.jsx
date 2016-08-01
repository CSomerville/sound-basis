import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import NavBar from '../../shared/components/NavBar';
import PageToEdit from '../components/PageToEdit';
import { 
  fetchUnlockPages,
  editPageName
} from '../actions/edit-pages';

class EditPages extends Component {
  render() {

    const {
      fetchUnlockPages,
      editPagesGUI,
      pages,
      editPageName
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
            <PageToEdit key={page.id}
              page={page}
              editPageName={editPageName}
              canEditName={editPagesGUI.nameEditable.includes(page.id)}
              />
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
  },
  editPageName: (id => dispatch(editPageName(id)))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPages);
