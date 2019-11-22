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
                v-if="authenticated && !isAdmin"
              >{{application.userInfo.firstName}} {{application.userInfo.lastName}}</div>
              <div
                class="mt-1"
                v-else-if="authenticated && isAdmin"
              >{{application.staffInfo.firstName}} {{application.staffInfo.lastName}}</div>
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
        <Cart :application.sync="application" :authenticated="authenticated"></Cart>
      </div>
      <div class="col-9" v-else-if="onProfile">
        <Profile
          :application.sync="application"
          :states="states"
          :authenticated.sync="authenticated"
        ></Profile>
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
              value="true"
              unchecked-value="false"
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

let stateTaxMap = new Map();
stateTaxMap
  .set("AL", 0.1)
  .set("AK", 0.15)
  .set("AS", 0.09)
  .set("AZ", 0.12)
  .set("AR", 0.14)
  .set("CA", 0.15)
  .set("CO", 0.1)
  .set("CT", 0.07)
  .set("DE", 0.12)
  .set("FL", 0.15)
  .set("GA", 0.12)
  .set("HI", 0.11)
  .set("IA", 0.07)
  .set("ID", 0.12)
  .set("IL", 0.11)
  .set("IN", 0.09)
  .set("KS", 0.05)
  .set("KY", 0.06)
  .set("LA", 0.14)
  .set("MA", 0.09)
  .set("MD", 0.1)
  .set("ME", 0.11)
  .set("MI", 0.05)
  .set("MN", 0.08)
  .set("MO", 0.1)
  .set("MS", 0.09)
  .set("MT", 0.11)
  .set("NC", 0.14)
  .set("ND", 0.03)
  .set("NE", 0.04)
  .set("NH", 0.12)
  .set("NJ", 0.09)
  .set("NM", 0.09)
  .set("NV", 0.05)
  .set("NY", 0.07)
  .set("OH", 0.12)
  .set("OK", 0.05)
  .set("OR", 0.1)
  .set("PA", 0.12)
  .set("RI", 0.14)
  .set("SC", 0.1)
  .set("SD", 0.08)
  .set("TN", 0.06)
  .set("TX", 0.1)
  .set("UT", 0.11)
  .set("VA", 0.14)
  .set("VT", 0.13)
  .set("WA", 0.12)
  .set("WI", 0.05)
  .set("WV", 0.12)
  .set("WY", 0.08);

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
          orders: [],
          address: [],
          creditCards: []
        },
        staffInfo: {
          userName: null,
          firstName: null,
          lastName: null,
          passWord: null,
          salary: null,
          address: null,
          jobTitle: null
        },
        productType: "fruit",
        products: {
          fruits: [],
          meats: [],
          drinks: []
        },
        cart: [],
        warehouses: [{ value: null, text: "Please select warehouse" }],
        suppliers: [{ value: null, text: "Please select supplier" }]
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
      ],
      stateTax: stateTaxMap
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
      this.$bvModal.hide("userLogin");
      this.application.userInfo.address.push({
        value: {
          address: this.application.userInfo.primaryAddress.address,
          city: this.application.userInfo.primaryAddress.city,
          zipcode: this.application.userInfo.primaryAddress.zipcode,
          state: this.application.userInfo.primaryAddress.state
        },
        text:
          this.application.userInfo.primaryAddress.address +
          " " +
          this.application.userInfo.primaryAddress.city +
          " " +
          this.application.userInfo.primaryAddress.state +
          " " +
          this.application.userInfo.primaryAddress.zipcode
      });
      this.application.userInfo.creditCards.push({
        value: {
          cardNumber: this.application.userInfo.primaryPayment.cardNumber,
          cardPin: this.application.userInfo.primaryPayment.cardPin,
          billingAddres:
            this.application.userInfo.primaryPayment.billingAddress +
            " " +
            this.application.userInfo.primaryPayment.city +
            " " +
            this.application.userInfo.primaryPayment.state +
            " " +
            this.application.userInfo.primaryPayment.zipCode
        },
        text: this.application.userInfo.primaryPayment.cardNumber
      });
      this.application.userInfo.primaryAddress = this.application.userInfo.address[0].value;
      this.application.userInfo.primaryPayment = this.application.userInfo.creditCards[0].value;
      this.getOrders();
      this.application.userInfo.authenticated = true;
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
          this.UserLoggedIn = response.data;
          if (response.data[0] == null) {
            this.error = true;
          } else if (this.isAdmin) {
            let name = response.data[0][0].staff_name.split(" ");

            this.application.userInfo.admin = true;
            this.application.staffInfo.userName = response.data[0][0].username;
            //this.application.staffInfo.name = response.data[0][0].staff_name;
            this.application.staffInfo.firstName = name[0];
            this.application.staffInfo.lastName = name[1];
            this.application.staffInfo.passWord = this.application.userInfo.passWord;
            this.application.staffInfo.salary = response.data[0][0].salary;
            this.application.staffInfo.address = response.data[0][0].s_address;
            this.application.staffInfo.jobTitle = response.data[0][0].job_title;
            response.data[1].forEach(warehouse => {
              this.application.warehouses.push({
                value: {
                  id: warehouse.warehouse_id,
                  sid: warehouse.supplier_id,
                  address: warehouse.w_address,
                  capacity: warehouse.storage_capacity
                },
                text: warehouse.warehouse_id
              });
            });
            response.data[2].forEach(supplier => {
              this.application.suppliers.push({
                value: {
                  id: supplier.supplier_id,
                  name: supplier.supplier_name,
                  address: supplier.s_address
                },
                text: supplier.supplier_name
              });
            });

            this.authenticated = true;
            this.$bvModal.hide("userLogin");
          } else {
            let name = response.data[0][0].customer_name.split(" ");
            response.data[1].forEach(address => {
              this.application.userInfo.address.push({
                value: {
                  address: address.address,
                  city: address.city,
                  zipcode: address.zipcode,
                  state: address.state
                },
                text:
                  address.address +
                  " " +
                  address.city +
                  " " +
                  address.state +
                  " " +
                  address.zipcode
              });
            });
            response.data[2].forEach(card => {
              this.application.userInfo.creditCards.push({
                value: {
                  cardNumber: card.card_number,
                  cardPin: card.card_pin,
                  billingAddres: card.billing_address
                },
                text: card.card_number
              });
            });

            this.application.userInfo.primaryAddress = this.application.userInfo.address[0].value;
            this.application.userInfo.primaryPayment = this.application.userInfo.creditCards[0].value;
            this.application.userInfo.firstName = name[0];
            this.application.userInfo.lastName = name[1];
            this.getOrders();
            this.authenticated = true;
            this.application.userInfo.authenticated = true;
            this.$bvModal.hide("userLogin");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getOrders() {
      axios
        .get("http://localhost:3000/getAllOrders")
        .then(response => {
          this.application.userInfo.orders = [];
          response.data[0].forEach(o => {
            if (o.username == this.application.userInfo.userName) {
              this.application.userInfo.orders.push({
                order_id: o.order_id,
                order_status: o.order_status,
                order_total: o.order_total,
                delivery_address: o.delivery_address,
                card_number: o.card_number,
                card_pin: o.card_pin,
                billing_address: o.billing_address,
                products: []
              });
            }
          });
          this.application.userInfo.orders.forEach(order => {
            response.data[1].forEach(p => {
              if (p.order_id == order.order_id) {
                order.products.push({
                  product_id: p.product_id,
                  product_quantity: p.product_quantity,
                  price_amount: p.price_amount
                });
              }
            });
          });
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
    },
    logout() {
      this.application.userInfo.admin = false;
      this.application.userInfo.userName = null;
      this.application.userInfo.passWord = null;
      this.application.cart.forEach(product => {
        this.application.products.fruits.forEach(function(prod) {
          if (prod.id === product.id) {
            prod.quantity = prod.quantity + parseInt(product.added);
          }
        });
        this.application.products.meats.forEach(function(prod) {
          if (prod.id === product.id) {
            prod.quantity = prod.quantity + parseInt(product.added);
          }
        });
        this.application.products.drinks.forEach(function(prod) {
          if (prod.id === product.id) {
            prod.quantity = prod.quantity + parseInt(product.added);
          }
        });
      });
      this.application.cart = [];
      this.isAdmin = false;
      this.authenticated = false;
      this.openProduct("fruit");
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/getAllProducts")
      .then(response => {
        let p = response.data;

        p.forEach(prod => {
          if (prod.category == "fruit") {
            this.application.products.fruits.push({
              id: prod.product_id,
              name: prod.product_name,
              price: prod.product_price,
              amountToBuy: 0,
              image: prod.p_image,
              quantity: prod.quantity,
              weight: prod.p_weight,
              category: prod.category,
              warehouse: prod.warehouse_id
            });
          } else if (prod.category == "meat") {
            this.application.products.meats.push({
              id: prod.product_id,
              name: prod.product_name,
              price: prod.product_price,
              amountToBuy: 0,
              image: prod.p_image,
              quantity: prod.quantity,
              weight: prod.p_weight,
              category: prod.category,
              warehouse: prod.warehouse_id
            });
          } else {
            this.application.products.drinks.push({
              id: prod.product_id,
              name: prod.product_name,
              price: prod.product_price,
              amountToBuy: 0,
              image: prod.p_image,
              quantity: prod.quantity,
              weight: prod.p_weight,
              category: prod.category,
              warehouse: prod.warehouse_id
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
