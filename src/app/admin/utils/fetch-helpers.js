import fetch from 'isomorphic-fetch';

const base = '/api'

export function getApi(urlFrag) {
  const url = base + urlFrag;

  return fetch(url)
    .then(checkStatus)
    .then(res => res.json());
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const err = new Error(res.statusText);
    err.res = res;
    throw err;
  }
}
