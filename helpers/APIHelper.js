import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL
})

function setToken (token) {
  API.defaults.headers.common.Authorization = token
}

async function createPaste (encrypted, token) {
  const resp = await API.post('/api/v1/paste', {
    ...JSON.parse(encrypted.toString()),
    token
  })

  return resp.data
}

async function getPaste (uuid) {
  const resp = await API.get(`/api/v1/paste/${uuid}`, {
    headers: {
      'User-Agent': 'PersonalSite/v1'
    }
  })

  return resp.data
}

async function getTotalEntries () {
  const resp = await API.get('/api/v1/paste/count')

  return resp.data.entries
}

async function login (username, password, code, token) {
  const resp = await API.post('/api/v1/users', { username, password, code, token })

  return resp.data
}

async function getUser () {
  const resp = await API.get('/api/v1/users')

  return resp.data
}

async function listPastes (limit = 20, offset = 0) {
  const resp = await API.get('/api/v1/paste', {
    params: { limit, offset }
  })

  return resp.data
}

async function deletePaste (uuid) {
  const resp = await API.delete(`/api/v1/paste/${uuid}`)

  return resp.data
}

export default {
  API,
  setToken,
  createPaste,
  getPaste,
  getTotalEntries,
  login,
  getUser,
  listPastes,
  deletePaste
}
