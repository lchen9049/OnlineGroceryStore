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
        Address
        <b-form-select
          :options="application.address"
          :disabled="!edit"
          v-model="application.userInfo.primaryAddress"
        />
      </div>

      <div class="col-2 mt-4">
        <font-awesome-icon
          class="mr-5"
          size="2x"
          @click="addAdress=true;$bvModal.show('addInfo');"
          icon="plus-circle"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-8">
        Payment
        <b-form-select
          :options="application.creditCards"
          :disabled="!edit"
          v-model="application.userInfo.primaryPayment"
        />
      </div>
      <div class="col-2 mt-4">
        <font-awesome-icon
          class="mr-5"
          size="2x"
          @click="addAdress=false;$bvModal.show('addInfo');"
          icon="plus-circle"
        />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4" v-if="!edit">
        <b-button @click="edit=true">Edit Information</b-button>
      </div>
      <div class="col-4" v-if="edit">
        <b-button @click="edit=false;updateInformation()">Save Information</b-button>
      </div>
    </div>

    <b-modal id="addInfo" hide-footer :title="addAdress ? 'New Address' : 'New Payment'">
      <div v-if="addAdress">
        <div class="row">
          <div class="col">Address</div>
          <div class="col">
            <b-form-input id="address" v-model="newAddress.address"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">City</div>
          <div class="col">
            <b-form-input id="passWord" v-model="newAddress.city"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">Zip Code</div>
          <div class="col">
            <b-form-input id="address" v-model="newAddress.zipCode"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">State</div>
          <div class="col">
            <b-form-input id="passWord" v-model="newAddress.state"></b-form-input>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <b-button @click="$bvModal.hide('addInfo')">Cancel</b-button>
            <b-button @click="authenticate()">Add</b-button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col">Card Number</div>
          <div class="col">
            <b-form-input id="cardNumber" v-model="newCard.cardNumber"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">Card Pin</div>
          <div class="col">
            <b-form-input id="cardPin" v-model="newCard.cardPin"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">Billing Address</div>
          <div class="col">
            <b-form-input id="billingAddress" v-model="newCard.billingAddress"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">City</div>
          <div class="col">
            <b-form-input id="cardCity" v-model="newCard.city"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">Zip Code</div>
          <div class="col">
            <b-form-input id="cardZipCode" v-model="newCard.zipCode"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">State</div>
          <div class="col">
            <b-form-input id="cardState" v-model="newCard.state"></b-form-input>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <b-button @click="$bvModal.hide('addInfo')">Cancel</b-button>
            <b-button @click="authenticate()">Add</b-button>
          </div>
        </div>
      </div>
    </b-modal>

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
      addAdress: true,
      newAddress: {
        address: null,
        city: null,
        zipCode: null,
        state: null
      },
      newCard: {
        cardNumber: null,
        cardPin: null,
        billingAddress: null,
        city: null,
        zipCode: null,
        state: null
      }
    };
  },
  methods: {
    updateInformation() {}
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