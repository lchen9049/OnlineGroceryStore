<template>
  <div class="profile">
    <div v-if="!application.userInfo.admin">
      <div class="row">
        <div class="col-4">
          First Name
          <b-form-input :disabled="true" v-model="application.userInfo.firstName" />
        </div>
        <div class="col-4">
          Last Name
          <b-form-input :disabled="true" v-model="application.userInfo.lastName" />
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
            :options="application.userInfo.address"
            :disabled="!edit"
            v-model="application.userInfo.primaryAddress"
          />
        </div>

        <div class="col mt-4">
          <font-awesome-icon
            size="2x"
            @click="addAdress=true;$bvModal.show('addInfo');"
            icon="plus-circle"
          />
        </div>
        <div class="col mt-4">
          <font-awesome-icon
            class="mr-5"
            size="2x"
            @click="addAdress=true;deleteAddress();"
            icon="trash-alt"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-8">
          Payment
          <b-form-select
            :options="application.userInfo.creditCards"
            :disabled="!edit"
            v-model="application.userInfo.primaryPayment"
          />
        </div>
        <div class="col-2 mt-4">
          <font-awesome-icon
            size="2x"
            @click="addAdress=false;$bvModal.show('addInfo');"
            icon="plus-circle"
          />
        </div>
        <div class="col mt-4">
          <font-awesome-icon
            class="mr-5"
            size="2x"
            @click="addAdress=false;deletePayment();"
            icon="trash-alt"
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
        <div class="col">
          <div class="float-right">
            <b-button @click="logout()">Log Out</b-button>
          </div>
        </div>
      </div>

      <b-modal id="delete" hide-footer :title="addAdress ? 'Delete Address' : 'Delete Payment'">
        <div v-if="addAdress">Please add an address before deleting this.</div>
        <div v-else>Please add a payment before deleting this.</div>
      </b-modal>

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
              <b-form-input id="city" v-model="newAddress.city"></b-form-input>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">Zip Code</div>
            <div class="col">
              <b-form-input id="zipCode" v-model="newAddress.zipCode"></b-form-input>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">State</div>
            <div class="col">
              <b-form-select :options="states" id="state" v-model="newAddress.state"></b-form-select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <b-button @click="$bvModal.hide('addInfo')">Cancel</b-button>
              <b-button @click="addAddress()">Add</b-button>
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
              <b-form-select id="cardState" :options="states" v-model="newCard.state"></b-form-select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <b-button @click="$bvModal.hide('addInfo')">Cancel</b-button>
              <b-button @click="addPayment()">Add</b-button>
            </div>
          </div>
        </div>
      </b-modal>

      <table class="table mt-5">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Delivery Address</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in application.userInfo.orders" :key="order.id">
            <th scope="row">{{order.order_id}}</th>
            <td>{{order.delivery_address}}</td>
            <td>${{order.order_total}}</td>
            <td>{{order.order_status}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-4">
          First Name
          <b-form-input :disabled="true" v-model="application.staffInfo.firstName" />
        </div>
        <div class="col-4">
          Last Name
          <b-form-input :disabled="true" v-model="application.staffInfo.lastName" />
        </div>
        <div class="col-4">
          Username
          <b-form-input :disabled="true" v-model="application.staffInfo.userName" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-4">
          Job Title
          <b-form-input :disabled="true" v-model="application.staffInfo.jobTitle" />
        </div>
        <div class="col-4">
          Salary
          <b-form-input :disabled="true" v-model="application.staffInfo.salary" />
        </div>
        <div class="col-4">
          Password
          <b-form-input :disabled="true" v-model="application.staffInfo.passWord" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-8">
          Address
          <b-form-input :disabled="true" v-model="application.staffInfo.address" />
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-4"></div>
        <div class="col">
          <div class="float-right">
            <b-button @click="logout()">Log Out</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import axios from "axios";
export default {
  name: "profile",
  components: {},
  props: ["application", "states", "authenticated"],
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
    logout() {
      this.$parent.logout();
    },
    updateInformation() {},
    async addPayment() {
      const response = await AuthenticationService.addPayment({
        username: this.application.userInfo.userName,
        billing_address:
          this.newCard.billingAddress +
          " " +
          this.newCard.city +
          " " +
          this.newCard.state +
          " " +
          this.newCard.zipCode,
        card_number: this.newCard.cardNumber,
        card_pin: this.newCard.cardPin
      });
      if (response.data) {
        this.application.userInfo.creditCards.push({
          value: {
            cardNumber: this.newCard.cardNumber,
            cardPin: this.newCard.cardPin,
            billingAddres:
              this.newCard.billingAddress +
              " " +
              this.newCard.city +
              " " +
              this.newCard.state +
              " " +
              this.newCard.zipCode
          },
          text: this.newCard.cardNumber
        });
        this.application.userInfo.primaryPayment = this.application.userInfo.creditCards[
          this.application.userInfo.creditCards.length - 1
        ].value;
        this.newCard = {
          cardNumber: null,
          cardPin: null,
          billingAddress: null,
          city: null,
          zipCode: null,
          state: null
        };
        this.$bvModal.hide("addInfo");
      }
    },
    async addAddress() {
      const response = await AuthenticationService.addAddress({
        username: this.application.userInfo.userName,
        address: this.newAddress.address,
        city: this.newAddress.city,
        zipcode: this.newAddress.zipCode,
        state: this.newAddress.state
      });
      if (response.data) {
        this.application.userInfo.address.push({
          value: {
            address: this.newAddress.address,
            city: this.newAddress.city,
            zipcode: this.newAddress.zipCode,
            state: this.newAddress.state
          },
          text:
            this.newAddress.address +
            " " +
            this.newAddress.city +
            " " +
            this.newAddress.state +
            " " +
            this.newAddress.zipCode
        });
        this.application.userInfo.primaryAddress = this.application.userInfo.address[
          this.application.userInfo.address.length - 1
        ].value;
        this.newAddress = {
          address: null,
          city: null,
          zipCode: null,
          state: null
        };
        this.$bvModal.hide("addInfo");
      }
    },
    async deleteAddress() {
      ///deleteAddress/:username/:address
      let address = this.application.userInfo.primaryAddress;
      if (this.application.userInfo.address.length == 1) {
        this.$bvModal.show("delete");
      } else {
        axios
          .delete(
            `http://localhost:3000/deleteAddress/${this.application.userInfo.userName}/${address.address}`
          )
          .then(response => {
            let index = 0;
            for (let i = 0;i < this.application.userInfo.address.length;i++) {
              if (this.application.userInfo.address[i].value.address == address.address) {
                index = i;
              }
            }
            this.application.userInfo.address.splice(index,1);
            this.application.userInfo.primaryAddress = this.application.userInfo.address[0].value
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    async deletePayment() {
      let payment = this.application.userInfo.primaryPayment;
      if (this.application.userInfo.creditCards.length == 1) {
        this.$bvModal.show("delete");
      } else {
        axios
          .delete(
            `http://localhost:3000/deletePayment/${this.application.userInfo.userName}/${payment.cardNumber}`
          )
          .then(response => {
            let index = 0;
            for (let i = 0;i < this.application.userInfo.creditCards.length;i++) {
              if (this.application.userInfo.creditCards[i].value.cardNumber == payment.cardNumber) {
                index = i;
              }
            }
            this.application.userInfo.creditCards.splice(index,1);
            this.application.userInfo.primaryPayment = this.application.userInfo.creditCards[0].value
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
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