<template>
  <div class="profile">
    <div class="row">
      <div class="col-4">
        First Name
        <b-form-input :disabled="!edit" v-model="application.userInfo.firstName" />
      </div>
      <div class="col-4">
        Last Name
        <b-form-input :disabled="!edit" v-model="application.userInfo.lastName" />
      </div>
      <div class="col-4">
        Username
        <b-form-input :disabled="true" v-model="application.userInfo.userName" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-8">
        Email
        <b-form-input :disabled="!edit" v-model="application.userInfo.email" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-8">
        Address
        <b-form-select :options="application.address" :disabled="!edit" v-model="application.userInfo.primaryAddress" />
      </div>
      <div class="col-4" v-if="!edit">
        <b-button @click="edit=true">Edit Information</b-button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-8">
        Payment
        <b-form-select :options="application.creditCards" :disabled="!edit" v-model="application.userInfo.primaryPayment" />
      </div>
      <div class="col-4" v-if="edit">
        <b-button @click="edit=false;updateInformation()">Save Information</b-button>
      </div>
    </div>

    <table class="table mt-5">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in application.userInfo.orders" :key="order.id">
          <th scope="row">{{order.id}}</th>
          <td>{{order.date}}</td>
          <td>${{order.amount}}</td>
          <td>{{order.details}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "profile",
  components: {},
  props: ["application", "isAdmin"],
  beforeMount() {
    //this.userInfo = this.$route.params.info.userInfo;
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    updateInformation(){

    },
  },
  watch: {
    application: {
      handler() {
        this.$emit("application", this.application);
      },
      deep: true
    }
  }
};
</script>