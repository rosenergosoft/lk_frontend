import axios from 'axios'

export default {
  companySuggestion (query) {
    return new Promise((resolve, reject) => {
      const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
      const token = 'e769b3f8378f5c57472ec4f8e98684423e5f9033'
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + token
      }

      axios.post(url, { query }, {
        headers
      }).then((res) => {
        resolve(res.data)
      })
    })
  },
  bankSuggestion (query) {
    return new Promise((resolve) => {
      const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank'
      const token = 'e769b3f8378f5c57472ec4f8e98684423e5f9033'
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + token
      }
      axios.post(url, { query }, {
        headers
      }).then((res) => {
        resolve(res.data)
      })
    })
  }
}
