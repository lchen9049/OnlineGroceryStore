<template>
  <div>
    <h1>
      Register
    </h1>
    <input type="email" name="email" v-model="email" placeholder="email here">
    <input type="password" name="password" v-model="password" placeholder="password">
    <button @click ="register">
      Register
    </button>
    <ul>
      <li v-for="item in User" :key=item.id>
        User ID: {{item.id}}, 
        Username: {{item.username}},
        User Description: {{item.desc}},
        User Password: {{item.password}}
      </li>
    </ul>

  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import axios from 'axios'
export default {
  data () {
    return {
      User: [{}],
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      this.$router.go();
    }
  },
  mounted() { // catch data from the route
    axios.get('http://localhost:3000').then((response) =>{
      this.User =response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
