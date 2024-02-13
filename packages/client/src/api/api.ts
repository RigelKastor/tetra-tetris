// TODO удалить.
import axios from 'axios'
const baseApiUrl = 'https://ya-praktikum.tech/api/v2/'
export default axios.create({
  baseURL: baseApiUrl,
})
export { baseApiUrl }

export const baseUrl = `http://localhost:3001`
