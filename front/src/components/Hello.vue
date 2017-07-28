<template>
  <div class="hello">
    <div class="alert alert-warning" role="alert" v-show="status">
      {{ message }}
    </div>
    <input 
      type="text" 
      class="form-control"
      name="personnage"
      id="personnage"
      required=""
      @keyup.enter="addTodo"
      placeholder="Votre personnage">
  </div>
</template>

<script>
import UserService from '../services/UserService';
import Helper from '../helper.js';

export default {
  name: 'hello',

  data () {
    return {
      message: '',
      status: ''
    }
  },

  methods: {
    addTodo (e) {
      // Récupération du nom
      let data = {
        name    : e.target.value,
        pv_max  : Helper.randomInt(30, 40),
        force   : Helper.randomInt(5, 10),
        defense : Helper.randomInt(5, 10),
        chance  : Helper.randomInt(5, 10)
      };

      console.log("Personnage créé " + data);

      return UserService.post(data)
        .then( response => {
          // Redirection vers l'utilisateur créé
          this.$router.push({
            name: 'List',
            params: { userId: response.body.lastId }
          });
        }, response => {
          console.error(response);
          this.message = response.body.message;
          this.status = response.body.status;
        });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
