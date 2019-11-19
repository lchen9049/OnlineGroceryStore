<template>
  <div id="app">
    <div class="row mt-5 justify-content-md-center">
      <div class="col-10">
        <h1>
          <center>ONLINE GROCERY STORE</center>
        </h1>
      </div>
    </div>
    <div class="row mt-5 justify-content-md-center">
      <div class="col-10">
        <b-navbar toggleable="sm" type="light" variant="light">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item class="ml-5" @click="openProduct('fruit')">Fruits</b-nav-item>
              <b-nav-item class="ml-5" @click="openProduct('meat')">Meat</b-nav-item>
              <b-nav-item class="ml-5" @click="openProduct('drink')">Drink</b-nav-item>
              <b-nav-item></b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <font-awesome-icon size="2x" class="mr-2" @click="openCart()" icon="shopping-cart" />
              <div class="mr-5 mt-1">{{application.cart.length}}</div>
              <font-awesome-icon class="mr-1" size="2x" @click="login()" icon="user-circle" />
              <div
                class="mt-1"
                v-if="authenticated"
              >{{application.userInfo.firstName}} {{application.userInfo.lastName}}</div>
              <div class="mt-1" v-else>Not Logged In</div>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <div class="row mt-5 justify-content-md-center">
      <div class="col-9" v-if="onProduct">
        <Product :application.sync="application"></Product>
      </div>
      <div class="col-9" v-else-if="onCart">
        <Cart :application.sync="application"></Cart>
      </div>
      <div class="col-9" v-else-if="onProfile">
        <Profile :application.sync="application" :states="states"></Profile>
      </div>
    </div>

    <b-modal id="userLogin" hide-footer :title="!needRegistration ? 'Login' : 'Register'">
      <div v-if="!needRegistration">
        <div class="row">
          <div class="col">UserName</div>
          <div class="col">
            <b-form-input id="userName" v-model="application.userInfo.userName"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">PassWord</div>
          <div class="col">
            <b-form-input id="passWord" v-model="application.userInfo.passWord"></b-form-input>
          </div>
        </div>
        <div class="row mt-2" v-if="error">
          <div class="col"></div>
          <div class="col">
            <div class="text-danger">Invalid Input</div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-6">
            <b-button @click="$bvModal.hide('userLogin')">Cancel</b-button>
            <b-button @click="authenticate()">Login</b-button>
          </div>
          <div class="col">
            <span @click="needRegistration=true">Register</span>
          </div>
          <div class="col">
            <b-form-checkbox
              v-model="isAdmin"
              name="staff"
              value=true
              unchecked-value=false
            >Staff</b-form-checkbox>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col">
            <span>UserName</span>
            <b-form-input id="userName" v-model="application.userInfo.userName"></b-form-input>
          </div>
          <div class="col">
            <span>Password</span>
            <b-form-input id="passWord" v-model="application.userInfo.passWord"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>First Name</span>
            <b-form-input id="firstName" v-model="application.userInfo.firstName"></b-form-input>
          </div>
          <div class="col">
            <span>Last Name</span>
            <b-form-input id="lastName" v-model="application.userInfo.lastName"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Phone Number</span>
            <b-form-input id="phone" v-model="application.userInfo.phoneNumber"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Address</span>
            <b-form-input id="address" v-model="application.userInfo.primaryAddress.address"></b-form-input>
          </div>
          <div class="col">
            <span>City</span>
            <b-form-input id="city" v-model="application.userInfo.primaryAddress.city"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Zip Code</span>
            <b-form-input id="zipCode" v-model="application.userInfo.primaryAddress.zipCode"></b-form-input>
          </div>
          <div class="col">
            <span>State</span>
            <b-form-select
              :options="states"
              id="state"
              v-model="application.userInfo.primaryAddress.state"
            ></b-form-select>
          </div>
        </div>
        <div class="row mt-4 ml-1">
          <h3>Payment</h3>
        </div>
        <hr />
        <div class="row">
          <div class="col">
            <span>Card Number</span>
            <b-form-input
              id="paymentCardNumber"
              v-model="application.userInfo.primaryPayment.cardNumber"
            ></b-form-input>
          </div>
          <div class="col">
            <span>Card Pin</span>
            <b-form-input id="cardPin" v-model="application.userInfo.primaryPayment.cardPin"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Billing Address</span>
            <b-form-input
              id="billingAddress"
              v-model="application.userInfo.primaryPayment.billingAddress"
            ></b-form-input>
          </div>
          <div class="col">
            <span>City</span>
            <b-form-input id="billingCity" v-model="application.userInfo.primaryPayment.city"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Zip Code</span>
            <b-form-input id="billingZipCode" v-model="application.userInfo.primaryPayment.zipCode"></b-form-input>
          </div>
          <div class="col">
            <span>State</span>
            <b-form-input id="billingState" v-model="application.userInfo.primaryPayment.state"></b-form-input>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col">
            <b-button @click="$bvModal.hide('userLogin')">Cancel</b-button>
            <b-button @click="register()">Register</b-button>
          </div>
          <div class="col">
            <span @click="needRegistration=false">Login</span>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Profile from "./components/profile";
import Product from "./components/product";
import Cart from "./components/cart";
//import { userInfo } from "./model/newApplication";
import AuthenticationService from "@/services/AuthenticationService";
import axios from "axios";

export default {
  name: "app",
  components: { Product, Cart, Profile },
  data() {
    return {
      needRegistration: false,
      authenticated: false,
      onProduct: true,
      onCart: false,
      onProfile: false,
      isAdmin: false,
      error: false,
      application: {
        userInfo: {
          admin: false,
          userName: null,
          passWord: null,
          authenticated: false,
          firstName: null,
          lastName: null,
          phoneNumber: null,
          primaryAddress: [],
          primaryPayment: [],
          orders: [
            {
              id: 1,
              date: "1/1/2019",
              amount: 200.5,
              details: "dhasd dhasldh dhsalkdj"
            },
            {
              id: 2,
              date: "1/1/2019",
              amount: 200.5,
              details: "dhasd dhasldh dhsalkdj"
            },
            {
              id: 3,
              date: "1/1/2019",
              amount: 200.5,
              details: "dhasd dhasldh dhsalkdj"
            },
            {
              id: 4,
              date: "1/1/2019",
              amount: 200.5,
              details: "dhasd dhasldh dhsalkdj"
            }
          ],
          address: [],
          creditCards: []
        },
        staffInfo: {
          userName: null,
          passWord: null,
          salary: null,
          address: null
        },
        productType: "fruit",
        products: {
          fruits: [],
          meats: [],
          drinks: []
        },
        cart: [],
        warehouses: [],
        suppliers: [],
      },
      states: [
        { value: null, text: "Please select state" },
        {
          text: "Alabama",
          value: "AL"
        },
        {
          text: "Alaska",
          value: "AK"
        },
        {
          text: "American Samoa",
          value: "AS"
        },
        {
          text: "Arizona",
          value: "AZ"
        },
        {
          text: "Arkansas",
          value: "AR"
        },
        {
          text: "California",
          value: "CA"
        },
        {
          text: "Colorado",
          value: "CO"
        },
        {
          text: "Connecticut",
          value: "CT"
        },
        {
          text: "Delaware",
          value: "DE"
        },
        {
          text: "District Of Columbia",
          value: "DC"
        },
        {
          text: "Federated States Of Micronesia",
          value: "FM"
        },
        {
          text: "Florida",
          value: "FL"
        },
        {
          text: "Georgia",
          value: "GA"
        },
        {
          text: "Guam",
          value: "GU"
        },
        {
          text: "Hawaii",
          value: "HI"
        },
        {
          text: "Idaho",
          value: "ID"
        },
        {
          text: "Illinois",
          value: "IL"
        },
        {
          text: "Indiana",
          value: "IN"
        },
        {
          text: "Iowa",
          value: "IA"
        },
        {
          text: "Kansas",
          value: "KS"
        },
        {
          text: "Kentucky",
          value: "KY"
        },
        {
          text: "Louisiana",
          value: "LA"
        },
        {
          text: "Maine",
          value: "ME"
        },
        {
          text: "Marshall Islands",
          value: "MH"
        },
        {
          text: "Maryland",
          value: "MD"
        },
        {
          text: "Massachusetts",
          value: "MA"
        },
        {
          text: "Michigan",
          value: "MI"
        },
        {
          text: "Minnesota",
          value: "MN"
        },
        {
          text: "Mississippi",
          value: "MS"
        },
        {
          text: "Missouri",
          value: "MO"
        },
        {
          text: "Montana",
          value: "MT"
        },
        {
          text: "Nebraska",
          value: "NE"
        },
        {
          text: "Nevada",
          value: "NV"
        },
        {
          text: "New Hampshire",
          value: "NH"
        },
        {
          text: "New Jersey",
          value: "NJ"
        },
        {
          text: "New Mexico",
          value: "NM"
        },
        {
          text: "New York",
          value: "NY"
        },
        {
          text: "North Carolina",
          value: "NC"
        },
        {
          text: "North Dakota",
          value: "ND"
        },
        {
          text: "Northern Mariana Islands",
          value: "MP"
        },
        {
          text: "Ohio",
          value: "OH"
        },
        {
          text: "Oklahoma",
          value: "OK"
        },
        {
          text: "Oregon",
          value: "OR"
        },
        {
          text: "Palau",
          value: "PW"
        },
        {
          text: "Pennsylvania",
          value: "PA"
        },
        {
          text: "Puerto Rico",
          value: "PR"
        },
        {
          text: "Rhode Island",
          value: "RI"
        },
        {
          text: "South Carolina",
          value: "SC"
        },
        {
          text: "South Dakota",
          value: "SD"
        },
        {
          text: "Tennessee",
          value: "TN"
        },
        {
          text: "Texas",
          value: "TX"
        },
        {
          text: "Utah",
          value: "UT"
        },
        {
          text: "Vermont",
          value: "VT"
        },
        {
          text: "Virgin Islands",
          value: "VI"
        },
        {
          text: "Virginia",
          value: "VA"
        },
        {
          text: "Washington",
          value: "WA"
        },
        {
          text: "West Virginia",
          value: "WV"
        },
        {
          text: "Wisconsin",
          value: "WI"
        },
        {
          text: "Wyoming",
          value: "WY"
        }
      ]
    };
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        username: this.application.userInfo.userName,
        pword: this.application.userInfo.passWord,
        customer_name:
          this.application.userInfo.firstName +
          " " +
          this.application.userInfo.lastName,
        phone_number: this.application.userInfo.phoneNumber,
        address: this.application.userInfo.primaryAddress.address,
        city: this.application.userInfo.primaryAddress.city,
        zipcode: this.application.userInfo.primaryAddress.zipCode,
        state: this.application.userInfo.primaryAddress.state,
        card_number: this.application.userInfo.primaryPayment.cardNumber,
        card_pin: this.application.userInfo.primaryPayment.cardPin,
        billing_address:
          this.application.userInfo.primaryPayment.billingAddress +
          " " +
          this.application.userInfo.primaryPayment.city +
          " " +
          this.application.userInfo.primaryPayment.state +
          " " +
          this.application.userInfo.primaryPayment.zipCode
      });

      console.log(response.data);
      this.$bvModal.hide("userLogin");
      this.authenticated = true;
      this.onProduct = false;
      this.onCart = false;
      this.onProfile = true;
    },
    login() {
      if (this.authenticated) {
        this.openProfile();
      } else {
        this.$bvModal.show("userLogin");
      }
      // this.$router.push("/");
    },
    authenticate() {
      axios
        .get(
          `http://localhost:3000/login/${this.application.userInfo.userName}/${this.application.userInfo.passWord}/${this.isAdmin}`
        )
        .then(response => {
          console.log(response.data);
          this.UserLoggedIn = response.data;
          if (response.data[0] == null) {
            this.error = true;
          } else {
            let name = response.data[0].customer_name.split(" ");

            this.application.userInfo.address.push({
              value: {
                address: response.data[1].address,
                city: response.data[1].city,
                zipcode: response.data[1].zipcode,
                state: response.data[1].state
              },
              text:
                response.data[1].address +
                " " +
                response.data[1].city +
                " " +
                response.data[1].state +
                " " +
                response.data[1].zipcode
            });
            this.application.userInfo.creditCards.push({
              value: {
                cardNumber: response.data[2].card_number,
                cardPin: response.data[2].card_pin,
                billingAddres: response.data[2].billing_address
              },
              text: response.data[2].card_number
            });
            this.application.userInfo.primaryAddress = this.application.userInfo.address[0].value;
            this.application.userInfo.primaryPayment = this.application.userInfo.creditCards[0].value;
            this.application.userInfo.firstName = name[0];
            this.application.userInfo.lastName = name[1];
            if(this.isAdmin) this.application.userInfo.admin = true;
            console.log(this.application.userInfo);
            this.authenticated = true;
            this.$bvModal.hide("userLogin");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    openCart() {
      this.onProduct = false;
      this.onCart = true;
      this.onProfile = false;
    },
    openProfile() {
      this.onProduct = false;
      this.onCart = false;
      this.onProfile = true;
      this.$bvModal.hide("userLogin");
    },
    openProduct(type) {
      this.application.productType = type;
      this.onProduct = true;
      this.onCart = false;
      this.onProfile = false;
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/getAllProducts")
      .then(response => {
        console.log(response.data);

        let p = response.data;

        p.forEach(prod => {
          if (prod.category == "fruit") {
            this.application.products.fruits.push({
              id: prod.product_id,
              name: prod.product_name,
              price: prod.product_price,
              amountToBuy: 0,
              image: prod.p_image,
              quantity: prod.quantity
            });
          } else if (prod.category == "meat") {
            this.application.products.meats.push({
              id: prod.product_id,
              name: prod.product_name,
              price: prod.product_price,
              amountToBuy: 0,
              image: prod.p_image,
              quantity: prod.quantity
            });
          } else {
            this.application.products.drinks.push({
              id: prod.product_id,
              name: prod.product_name,
              price: prod.product_price,
              amountToBuy: 0,
              image: prod.p_image,
              quantity: prod.quantity
            });
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>
