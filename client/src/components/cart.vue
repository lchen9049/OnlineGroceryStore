<template>
  <div class="cart">
    <table class="table mt-1">
      <thead class="thead-light">
        <tr>
          <th scope="col"></th>
          <th scope="col">Product ID</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col" colspan="2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in application.cart" :key="product.id">
          <td>
            <b-img v-bind="mainProps" :src="product.image" fluid alt="Responsive image"></b-img>
          </td>
          <td>{{product.id}}</td>
          <td>{{product.name}}</td>
          <td>${{product.price}}</td>
          <td>{{product.added}}</td>
          <td>
            <b-button @click="deleteProduct(index, product)">Delete Product</b-button>

            <b-modal :id="'confirm' + product.id" title="Confirmation">
              <p class="my-4">{{product.added}} {{product.name}} has been deleted!</p>
            </b-modal>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col">
        <div class="float-right" v-if="!application.userInfo.admin">
          <hr />
          <div class="row">
            <div class="col-5">
              <div class="float-right">
                <h4>Subtotal:</h4>
              </div>
            </div>
            <div class="col-3">
              <div class="float-left">
                <h4>${{subTotal}}</h4>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-5">
              <div class="float-right">
                <h4>Tax:</h4>
              </div>
            </div>
            <div class="col-3">
              <div class="float-left">
                <h4>${{tax}}</h4>
                <h6>(Tax vary depending on state)</h6>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-5">
              <div class="float-right">
                <h2>Total:</h2>
              </div>
            </div>
            <div class="col-3">
              <div class="float-left">
                <h2>${{subTotal+tax}}</h2>
              </div>
            </div>
          </div>
          <div class="row float-right mt-5 mb-5 mr-5">
            <div class="col">
              <b-button @click="checkout()">CHECKOUT</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewApp from "../model/newApplication";
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
  name: "cart",
  components: {},
  props: ["application", "authenticated"],
  data() {
    return {
      mainProps: { blank: false, width: 75, height: 75, class: "m1" }
    };
  },
  beforeMount() {
    //this.application = this.$route.params.info;
  },
  watch: {
    // "$route.params.info": function(info) {
    //   this.application = info;
    // }
    application: {
      handler() {
        this.$emit("application", this.application);
      },
      deep: true
    }
  },
  methods: {
    deleteProduct(index, product) {
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
      this.application.cart.splice(index, 1);
      this.$bvModal.show("confirm" + product.id);
    },
    async checkout() {
      if (this.application.cart.length == 0) {
      } else {
        console.log(this.application.userInfo.primaryAddress);
        console.log(this.application.userInfo.primaryPayment);

        let prods = []
        this.application.cart.forEach(p => {
          console.log(p);
          prods.push({product_id: p.id, price_amount: parseInt(p.added)*parseFloat(p.price), product_quantity: parseInt(p.added), product_leftover: parseInt(p.quantity)})
          console.log(prods[prods.length-1])
        })

        const response = await AuthenticationService.addOrder({
          username: this.application.userInfo.username,
          delivery_address: this.application.userInfo.primaryAddress.address + ' ' + this.application.userInfo.primaryAddress.city + ' ' + this.application.userInfo.primaryAddress.state + ' ' + this.application.userInfo.primaryAddress.zipcode,
          card_number: this.application.userInfo.primaryPayment.cardNumber,
          card_pin: this.application.userInfo.primaryPayment.cardPin,
          billing_address: this.application.userInfo.primaryPayment.billingAddres,
          order_total: this.subTotal + this.tax,
          products: prods,
        });
        console.log(response.data)
        if (response.data) {
         
        } else {
          
        }
      }
    }
  },
  computed: {
    subTotal: function() {
      let total = 0;
      this.application.cart.forEach(prod => {
        console.log(prod.price);
        console.log(prod.amountToBuy);
        total = total + prod.added * parseFloat(prod.price);
      });
      return total;
    },
    tax: function() {
      let rate = stateTaxMap.get(
        this.application.userInfo.primaryAddress.state
      );

      if (this.authenticated) return this.subTotal * rate;
      else return 0;
    }
  }
};
</script>