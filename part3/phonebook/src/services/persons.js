import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

axios.defaults.baseURL = baseUrl

const getAll = () => {
  return axios.get('').then(({ data }) => {
    return data
  })
}

const create = (obj) => {
  return axios.post('', obj).then(({ data }) => {
    return data
  })
}

const remove = (id) => {
  return axios.delete(`/${id}`).then(({ data }) => {
    return data
  })
}

const update = (id, obj) => {
  return axios.put(`/${id}`, obj).then(({ data }) => {
    return data
  })
}

export default {
  getAll,
  create,
  remove,
  update
}