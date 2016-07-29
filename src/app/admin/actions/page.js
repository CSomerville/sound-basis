import { putApi } from '../utils/fetch-helpers';

export const fetchEditPages = () => ({
  types: ['FETCH_EDIT_PAGES', 'FETCH_EDIT_PAGES_SUCCESS', 'FETCH_EDIT_PAGES_FAILURE'],
  call: () => putApi('/pages-locked', {})
});
