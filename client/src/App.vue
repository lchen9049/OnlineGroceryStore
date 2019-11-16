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
              <b-nav-item-dropdown text="Category 1">
                <b-dropdown-item @click="openProduct('Sample1')">Sample1</b-dropdown-item>
                <b-dropdown-item @click="openProduct('Sample2')">Sample2</b-dropdown-item>
                <b-dropdown-item @click="openProduct('Sample3')">Sample3</b-dropdown-item>
                <b-dropdown-item @click="openProduct('Sample4')">Sample4</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="Category 2">
                <b-dropdown-item href="#">Sample 1</b-dropdown-item>
                <b-dropdown-item href="#">Sample 2</b-dropdown-item>
                <b-dropdown-item href="#">Sample 3</b-dropdown-item>
                <b-dropdown-item href="#">Sample 4</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="Category 3">
                <b-dropdown-item href="#">Sample 1</b-dropdown-item>
                <b-dropdown-item href="#">Sample 2</b-dropdown-item>
                <b-dropdown-item href="#">Sample 3</b-dropdown-item>
                <b-dropdown-item href="#">Sample 4</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="Category 4">
                <b-dropdown-item href="#">Sample 1</b-dropdown-item>
                <b-dropdown-item href="#">Sample 2</b-dropdown-item>
                <b-dropdown-item href="#">Sample 3</b-dropdown-item>
                <b-dropdown-item href="#">Sample 4</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <font-awesome-icon class="mr-5" size="2x" @click="openCart()" icon="shopping-cart" />
              <!--<b-button class="mr-2" @click="openCart()">Cart</b-button>-->
              <font-awesome-icon class="mr-5" size="2x" @click="login()" icon="user-circle" />
              <!--<b-button class="mr-2" @click="login()">User</b-button>-->
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

    <div class="row mt-5 justify-content-md-center">
      <div class="col-9" v-if="onProduct">
        <Product :application.sync="application" :isAdmin="isAdmin"></Product>
      </div>
      <div class="col-9" v-else-if="onCart">
        <Cart :application.sync="application" :isAdmin="isAdmin"></Cart>
      </div>
      <div class="col-9" v-else-if="onProfile">
        <Profile :application.sync="application" :isAdmin="isAdmin"></Profile>
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
        <div class="row mt-3">
          <div class="col">
            <b-button @click="$bvModal.hide('userLogin')">Cancel</b-button>
            <b-button @click="authenticate()">Login</b-button>
          </div>
          <div class="col">
            <span @click="needRegistration=true">Register</span>
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
              :options="state"
              id="state"
              v-model="application.userInfo.primaryAddress.state"
            ></b-form-select>
          </div>
        </div>
        <div class="row mt-4 ml-1"><h3>Payment</h3></div>
        <hr>
        <div class="row">
          <div class="col">
            <span>Card Number</span>
            <b-form-input id="paymentCardNumber" v-model="application.userInfo.primaryPayment.cardNumber"></b-form-input>
          </div>
          <div class="col">
            <span>Card Pin</span>
            <b-form-input id="cardPin" v-model="application.userInfo.primaryPayment.cardPin"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Billing Address</span>
            <b-form-input id="billingAddress" v-model="application.userInfo.primaryPayment.address"></b-form-input>
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
import { userInfo } from "./model/newApplication";
import AuthenticationService from "@/services/AuthenticationService";

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
      application: {
        userInfo: {
          admin: false,
          userName: null,
          passWord: null,
          authenticated: false,
          firstName: null,
          lastName: null,
          phoneNumber: null,
          primaryAddress: {
            address: null,
            city: null,
            zipCode: null,
            state: null
          },
          primaryPayment: {
            cardNumber: null,
            cardPin: null,
            billingAddress: null,
            city: null,
            zipCode: null,
            state: null
          },
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
        productType: "recommended",
        products: [
          {
            id: 1,
            name: "banana",
            category: "Sample1",
            price: 12,
            quantityLeft: 100,
            amountToBuy: 0
          },
          {
            id: 2,
            name: "apple",
            category: "Sample1",
            price: 52,
            quantityLeft: 100,
            amountToBuy: 0
          },
          {
            id: 3,
            name: "orange",
            category: "Sample1",
            price: 22,
            quantityLeft: 100,
            amountToBuy: 0
          },
          {
            id: 4,
            name: "grape",
            category: "Sample1",
            price: 32,
            quantityLeft: 100,
            amountToBuy: 0
          }
        ],
        cart: []
      },
      state: [
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
          this.application.userInfo.primaryPayment.zipCode +
          " " +
          this.application.userInfo.primaryPayment.state
      });
      this.$router.go();
      console.log(response.data);
      this.$bvModal.hide("userLogin");
      this.authenticated = true;
      this.onProduct = false;
      this.onCart = false;
      this.onProfile = true;
    },
    login () {
      axios.get(`http://localhost:3000/login/${this.userName}/${this.passWord}/${this.admin}`).then((response) =>{
        console.log("hi");
        this.UserLoggedIn = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      // this.$router.push("/");
      console.log(response.data);
    },
    authenticate() {
      //send userName & pass to backend to authenticate.
      //if false, show error message.
      //else open profile
      this.openProfile();
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
  }
};
</script>

<style>
</style>
