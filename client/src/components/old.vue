<template>
  <div id="app">
    <div class="row mt-5 justify-content-md-center">
      <div class="col-10">
        <h1>
          <center>ONLINE GROCERY STORE</center>
        </h1>
      </div>
      <div class="col-2 mt-2">
        <button class="mr-2">
          <router-link :to="{ name: 'Cart', params: {info: application } }">Cart</router-link>
        </button>
        <button class="mr-2">
          <router-link :to="{ name: 'Profile', params: {info: application } }">User</router-link>
        </button>
      </div>
    </div>
    <div class="row mt-5 justify-content-md-center">
      <div class="col-10">
        <b-navbar toggleable="sm" type="light" variant="light">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item-dropdown text="Category 1">
                <b-dropdown-item>
                  <router-link
                    :to="{ name: 'Products', params: {info:application, productType: 'Sample1' }}"
                  >Sample1</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="{ name: 'Products', params: {info:application, productType: 'Sample2' }}"
                  >Sample2</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="{ name: 'Products', params: {info:application, productType: 'Sample3' }}"
                  >Sample3</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="{ name: 'Products', params: {info:application, productType: 'Sample4' }}"
                  >Sample4</router-link>
                </b-dropdown-item>
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
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <div class="row mt-5 justify-content-md-center">
      <div class="col-9">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "./components/profile";
import Product from "./components/product";
import Cart from "./components/cart";

export default {
  name: "app",
  components: {},
  data() {
    return {
      onProduct: true,
      onCart: false,
      onUser: false,
      isAdmin: false,
      application: {
        userInfo: {
          admin: false,
          userName: null,
          passWord: null,
          authenticated: false,
          firstName: null,
          lastName: null,
          address: null,
          city: null,
          state: null,
          email: null,
          payment: null,
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
          ]
        },
        productType: null,
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
  }
};
</script>

<style>
</style>
