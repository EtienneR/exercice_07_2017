<template>
  <div id="app">
    <router-link :to="{ name: 'Hello' }">
      <img src="./assets/logo.png" class="center-block">
    </router-link>
    <router-view></router-view>

  <footer class="row" style="margin-top: 5%">
    <p class="text-center">
      Credits : <mark><a href="http://expressjs.com" target="_blank">ExpressJS 4</a></mark>, <mark><a href="https://www.postgresql.org" target="_blank">PostgreSQL 9.6</a></mark> - <mark><a href="https://vuejs.org" target="_blank">VueJS 2</a> (<a href="https://vuex.vuejs.org" target="_blank">Vuex</a>, <a href="https://router.vuejs.org" target="_blank">vue-Router 2</a>, <a href="https://github.com/pagekit/vue-resource" target="_blank">vue-resource</a>)</mark>, <mark><a href="http://getbootstrap.com" target="_blank">Bootstrap</a></mark>
    </p>
  </footer>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
img {
  margin: 0 auto;
}
</style>
