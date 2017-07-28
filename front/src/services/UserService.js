import Vue from 'vue'

const apiUrl = 'http://localhost:3000/api/users';

export default {
  getAll() {
    return Vue.http.get(apiUrl);
  },
  getOne(id) {
    return Vue.http.get(apiUrl + '/' + id);
  },
  post(body) {
    return Vue.http.post(apiUrl, body , { headers: {'Accept': 'application/json'} } );
  },
  put(id, body) {
    return Vue.http.put(apiUrl + '/' + id, body , { headers: {'Accept': 'application/json'} } );
  }
}