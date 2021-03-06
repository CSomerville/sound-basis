import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import NavBar from '../../shared/components/NavBar';
import PageToEdit from '../components/PageToEdit';
import Button from '../../shared/components/Button';
import PromptAddPage from '../components/PromptAddPage';
import PromptDeletePage from '../components/PromptDeletePage';
import { 
  fetchUnlockPages,
  fetchDeletePage,
  updatePageName,
  cancelEditPage,
  newHasSubPages,
  newHasNoSubPages,
  cancelAddPage,
  addPage,
  canEditPage,
  pageToggleActive,
  promptDeletePage,
  cancelDeletePage,
  fetchSavePage
} from '../actions/edit-pages';

class EditPages extends Component {

  render() {

    const {
      fetchUnlockPages,
      fetchDeletePage,
      cancelEditPage,
      editPagesGUI,
      pages,
      updatePageName,
      addPage,
      newHasSubPages,
      newHasNoSubPages,
      cancelAddPage,
      canEditPage,
      pageToggleActive,
      promptDeletePage,
      cancelDeletePage,
      fetchSavePage
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
              updatePageName={updatePageName}
              pageEditable={editPagesGUI.editablePages.includes(page.id)}
              canEditPage={() => canEditPage(page.id)}
              pageToggleActive={() => pageToggleActive(page.id)}
              promptDeletePage={e => { e.preventDefault(); promptDeletePage(page.id); }}
              cancelEditPage={e => { e.preventDefault(); cancelEditPage(page.id); }}
              fetchSavePage={e => { e.preventDefault(); fetchSavePage(page); }}
              />
          )}
        </div>
        {(pages.length < 7) && <Button
          flavor=""
          copy="+"
          action={addPage}
          />
        }
        {editPagesGUI.promptAddPage &&
          <PromptAddPage
            newHasSubPages={newHasSubPages}
            newHasNoSubPages={newHasNoSubPages}
            cancelAddPage={cancelAddPage}
            />
        }
        {editPagesGUI.pageToDelete &&
          <PromptDeletePage
            confirmDeletePage={e => { 
              e.preventDefault(); 
              fetchDeletePage(editPagesGUI.pageToDelete);
            }}
            cancelDeletePage={e => { e.preventDefault(); cancelDeletePage(); }}
            />
        }
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
  updatePageName: (id, name) => dispatch(updatePageName(id, name)),
  cancelEditPages: () => dispatch(cancelEditPages()),
  newHasSubPages: () => dispatch(newHasSubPages()),
  newHasNoSubPages: () => dispatch(newHasNoSubPages()),
  cancelAddPage: () => dispatch(cancelAddPage()),
  addPage: () => dispatch(addPage()),
  canEditPage: (id => dispatch(canEditPage(id))),
  pageToggleActive: (id => dispatch(pageToggleActive(id))),
  promptDeletePage: (id => dispatch(promptDeletePage(id))),
  cancelDeletePage: () => dispatch(cancelDeletePage()),
  fetchDeletePage: (id => dispatch(fetchDeletePage(id))),
  cancelEditPage: (id => dispatch(cancelEditPage(id))),
  fetchSavePage: (id => dispatch(fetchSavePage(id)))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPages));
