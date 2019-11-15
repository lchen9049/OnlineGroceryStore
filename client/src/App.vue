<template>
  <div id="app">
    <div class="row mt-5 justify-content-md-center">
      <div class="col-10">
        <h1>
          <center>ONLINE GROCERY STORE</center>
        </h1>
      </div>

      <div class="col-2 mt-2">
        <font-awesome-icon class="mr-5" size="2x" @click="openCart()" icon="shopping-cart" />
        <!--<b-button class="mr-2" @click="openCart()">Cart</b-button>-->
        <font-awesome-icon class="mr-5" size="2x" @click="login()" icon="user-circle" />
        <!--<b-button class="mr-2" @click="login()">User</b-button>-->
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

    <b-modal id="userLogin" hide-footer title="Login">
      <div v-if="!needRegistration">
        <div class="row">
          <div class="col">UserName</div>
          <div class="col">
            <b-form-input id="userName" v-model="application.userInfo.userName"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">PassWord</div>
          <div class="col">
            <b-form-input id="passWord" v-model="application.userInfo.passWord"></b-form-input>
          </div>
        </div>
        <div class="row">
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
          primaryAddress: null,
          email: null,
          primaryPayment: null,
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
      }
    };
  },
  methods: {
    register() {},
    login() {
      if (this.authenticated) {
        this.openProfile();
      } else {
        this.$bvModal.show("userLogin");
      }
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
