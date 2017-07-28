<template>
	<div class="list">

		<div class="jumbotron" v-for="item in item">
			<p>Bonjour,</p>
      <h1>{{item.name}}</h1>
			<ul class="list-unstyled">
        <li>PV max : {{ item.pv_max }}</li>
        <li>Force : {{ item.force }}</li>
        <li>Défense : {{ item.defense }}</li>
        <li>Chance : {{ item.chance }}</li>
      </ul>
			<p>Vous vous sentez d'humeur combative ? Cliquez sur le bouton ci-dessous.</p>
			<p class="btn btn-primary btn-lg" @click="btnAttack()">Attaquer</p>
		</div>

    <div class="alert alert-success" role="alert" v-show="result">
      <p>Vous avez infligé {{ result }} point(s) à votre adversaire.</p>
    </div>

		<div v-show="isActive">
			<div v-if="items.length > 1">
				<h2>Vos adversaires ({{ items.length }})</h2>
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>ID</th>
              <th>Name</th>
              <th>PV max</th>
              <th>Force</th>
              <th>Défense</th>
							<th>Chance</th>
							<th>Combattre</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in othersItem()">
							<td>{{ item.id }}</td>
							<td>{{ item.name }}</td>
              <td>{{ item.pv_max }}</td>
              <td>{{ item.force }}</td>
              <td>{{ item.defense }}</td>
              <td>{{ item.chance }}</td>
							<td @click="actionAttack(item.id)">
								<span class="btn btn-primary">Combattre</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-else>
			  Aucun adversaire
			</div>
		</div>

	</div>
</template>

<script>
import UserService from '../services/UserService';
import Helper from '../helper.js';

export default {
  name: 'list',

  data () {
    return {
      items: [],
      isActive: false,
      currentItem: [],
      defenderItem: [],
      result: ''
    }
  },

  created () {
    this.fetchItem()
  },

  computed: {
    // Récupération de l'item concerné
   	item () {
      let userId = this.$route.params.userId;
      this.currentItem = this.items.filter( (obj) => obj.id == userId );
			return this.items.filter( (obj) => obj.id == userId );
    }
  },

  methods: {
  	// Récupération de tous les items
    fetchItem () {
      return UserService.getAll()
        .then(response => {
          this.items = response.data.data;
        })
    },

    // Récupération des autres items
    othersItem () {
    	let userId = this.$route.params.userId;
      return this.items.filter( (obj) => obj.id != userId );
    },

    // Action sur le bouton "attaquer"
    btnAttack () {
    	this.isActive = !this.isActive;
    },

    // Attaque d'un personnage via son id
    actionAttack (id) {
    	// Récupération du defender
      this.defenderItem = this.items.filter( (obj) => obj.id == id );

      let attacker = this.currentItem[0];
      let defender = this.defenderItem[0];

      // Formule
      function fight (force, defense, chance) {
        let lucky = Helper.randomInt(0, 99);

        if (lucky < chance) {
          console.log("chanceux !");
          return (force - (defense / 2))*2;
        } else {
          return force - (defense / 2);
        }
      }

      let result = fight(attacker['force'], defender['defense'], attacker['chance']);

      // Application de la formule
      this.defenderItem[0]['pv_max'] = this.defenderItem[0]['pv_max'] - result;

      let data = {
        name    : defender['name'],
        pv_max  : defender['pv_max'],
        force   : defender['force'],
        defense : defender['defense'],
        chance  : defender['chance']
      };

      // Envoi des modifications à la BDD du defender attaqué
      return UserService.put(defender['id'], data)
        .then(response => {
          this.result = result;
        }, response => {
          console.error(response);
        });

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
