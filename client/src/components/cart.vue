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
      <div class="col-8">
        <h2>Total Amount: ${{totalAmount}}</h2>
      </div>
      <div class="col">
        <div class="float-right">
          <b-button @click="checkout()">CHECKOUT</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewApp from "../model/newApplication";

export default {
  name: "cart",
  components: {},
  props: ["application"],
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
    checkout(){

    }
  },
  computed: {
    totalAmount: function() {
      let total = 0;
      this.application.cart.forEach(prod => {
        console.log(prod.price);
        console.log(prod.amountToBuy);
        total = total + prod.added * parseFloat(prod.price);
      });
      return total;
    }
  }
};
</script>