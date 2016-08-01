import { browserHistory } from 'react-router';

export default function callAPI({ dispatch, getState }) {

  return next => action => {
    const {
      types,
      call,
      shouldCall = () => true,
      payload = {}
    } = action;

    if (!types) {
      return next(action); // yield to next middleware or reducer
    }
    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every((type) => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof call !== 'function') {
      throw new Error('Expected call to be a function');
    }

    if (!shouldCall(getState())) return;

    const [ requestType, successType, failureType ] = types;

    dispatch(Object.assign({}, payload, {
      type: requestType
    }));
    return call(getState())
      .then(res => {
        dispatch(Object.assign({}, payload, {
          res,
          type: successType
        }))
      })
      .catch(err => {
        if (err.res && err.res.status === 401) {
          browserHistory.push('/admin/login');
        } else {
          dispatch(Object.assign({}, payload, {
            err,
            type: failureType
          }));
        }
      });
  }
}
