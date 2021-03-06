import { putApi, deleteApi } from '../utils/fetch-helpers';

export const fetchUnlockPages = () => ({
  types: ['FETCH_UNLOCK_PAGES', 'FETCH_UNLOCK_PAGES_SUCCESS', 'FETCH_UNLOCK_PAGES_FAILURE'],
  call: () => deleteApi('/pages-locked', {})
});

export const fetchDeletePage = id => ({
  types: ['FETCH_DELETE_PAGE', 'FETCH_DELETE_PAGE_SUCCESS', 'FETCH_DELETE_PAGE_FAILURE'],
  call: () => deleteApi(`/pages/${id}`, {}),
  payload: {
    id: id
  }
});

export const fetchSavePage = page => ({
  types: ['FETCH_SAVE_PAGE', 'FETCH_SAVE_PAGE_SUCCESS', 'FETCH_SAVE_PAGE_FAILURE'],
  call: () => putApi(`/pages/${page.id}`, {
    toUpdate: {
      name: page.name,
      position: page.position,
      active: page.active
    }  
  }),
  payload: {
    id: page.id
  }
});

export const cancelEditPage = id => ({
  type: 'CANCEL_EDIT_PAGE',
  id: id
});

export const updatePageName = (id, name) => ({
  type: 'UPDATE_PAGE_NAME',
  id: id,
  name: name
});

export const canEditPage = id => ({
  type: 'CAN_EDIT_PAGE',
  id: id
});

export const pageToggleActive = id => ({
  type: 'PAGE_TOGGLE_ACTIVE',
  id: id
});

export const addPage = () => ({
  type: 'ADD_PAGE'
});

export const newHasSubPages = () => ({
  type: 'NEW_HAS_SUB_PAGES'
});

export const newHasNoSubPages = () => ({
  type: 'NEW_HAS_NO_SUB_PAGES'
});

export const cancelAddPage = () => ({
  type: 'CANCEL_ADD_PAGE'
});

export const promptDeletePage = id => ({
  type: 'PROMPT_DELETE_PAGE',
  id: id
});

export const confirmDeletePage = id => ({
  type: 'CONFIRM_DELETE_PAGE',
  id: id
});

export const cancelDeletePage = () => ({
  type: 'CANCEL_DELETE_PAGE'
});
