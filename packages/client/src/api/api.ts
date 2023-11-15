// TODO удалить.
import axios from 'axios'
const baseApiUrl = 'https://ya-praktikum.tech/api/v2/'
export default axios.create({
  baseURL: baseApiUrl,
})
export { baseApiUrl }

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.timeout = 60000
axios.defaults.transformRequest = [data => JSON.stringify(data)]

export const baseFetch = axios.create()
baseFetch.defaults.baseURL = 'http://localhost:3001/api/v2'
