import fetch from 'isomorphic-fetch';
import camelize from 'camelize';

const base = '/api'

export function getApi(urlFrag) {
  const url = base + urlFrag;

  return fetch(url, {
    credentials: 'same-origin'
  })
    .then(checkStatus)
    .then(res => res.json())
    .then(parsed => camelize(parsed));
}

export function postApi(urlFrag, body = {}) {
  const url = base + urlFrag;
  
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then(res => res.json())
    .then(parsed => camelize(parsed));
}

export function putApi(urlFrag, body = {}) {
  const url = base + urlFrag;
  
  return fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then(res => res.json())
    .then(parsed => camelize(parsed));
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
