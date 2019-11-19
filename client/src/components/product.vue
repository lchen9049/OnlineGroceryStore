<template>
  <div class="products">
    <div v-if="application.userInfo.admin">
      <table class="table mt-1">
        <thead class="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col" colspan="3">Quantity Left</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in currentProds" :key="product.id">
            <td>
              <b-img v-bind="mainProps" :src="product.image" fluid alt="Responsive image"></b-img>
            </td>
            <td>
              <b-form-input :disabled="true" v-model="product.id"></b-form-input>
            </td>
            <td>
              <b-form-input :disabled="!edit" v-model="product.name"></b-form-input>
            </td>
            <td>
              <b-form-input :disabled="!edit" v-model="product.price"></b-form-input>
            </td>
            <td>
              <b-form-input :disabled="!edit" v-model="product.quantity"></b-form-input>
            </td>
            <td>
              <font-awesome-icon @click="deleteProduct(product)" size="lg" icon="trash-alt" />
            </td>
            <td>
              <font-awesome-icon @click="deleteProduct(product)" size="lg" icon="plus-circle" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-2">
          <b-button @click="$bvModal.show('addNewProduct')">Add</b-button>
        </div>
        <div class="col-2" v-if="edit">
          <b-button @click="edit=false">Save</b-button>
        </div>
        <div class="col-2" v-else>
          <b-button @click="edit=true">Edit</b-button>
        </div>

        <div class="col-8"></div>
      </div>
      <b-modal id="addNewProduct" hide-footer title="Add New Product">

      </b-modal>
    </div>
    <div v-else>
      <table class="table mt-1">
        <thead class="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col" colspan="2">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in currentProds" :key="product.id">
            <td>
              <b-img v-bind="mainProps" :src="product.image" fluid alt="Responsive image"></b-img>
            </td>
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>${{product.price}}</td>
            <td scope="row">
              <b-form-input class="col-4" v-model="product.amountToBuy"></b-form-input>
              <span>Amount left: {{product.quantity}}</span>
            </td>
            <td>
              <b-button @click="addProduct(product)">Add Product</b-button>

              <b-modal :id="'confirm' + product.id" title="Confirmation">
                <p class="my-4">{{note}}</p>
              </b-modal>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="notEnoughStockWarning" hide-footer title="Not enough stock">{{warning}}</b-modal>
    </div>
  </div>
</template>

<script>
import NewApp from "../model/newApplication";
import EditProduct from "./editProduct";
export default {
  name: "product",
  components: { EditProduct },
  props: ["application"],
  data() {
    return {
      mainProps: { blank: false, width: 75, height: 75, class: "m1" },
      note: "",
      edit: false,
      warning: null
    };
  },
  beforeMount() {},
  watch: {
    application: {
      handler() {
        this.$emit("application", this.application);
      },
      deep: true
    }
  },
  methods: {
    deleteProduct(product) {
      console.log(product);
    },
    addToCart(product) {
      this.application.cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: parseInt(product.quantity) - parseInt(product.amountToBuy),
        added: product.amountToBuy,
        image: product.image
      });
    },
    addProduct(product) {
      if (product.amountToBuy == 0) {
        this.note = "Please enter amount to add.";
        this.$bvModal.show("confirm" + product.id);
      } else if (parseInt(product.amountToBuy) > parseInt(product.quantity)) {
        this.warning =
          "There are only " + product.quantity + " " + product.name + " left.";
        this.$bvModal.show("notEnoughStockWarning");
      } else {
        if (this.cartContainsProduct(product.id)) {
          this.addToCurrentProd(product.id, product.amountToBuy);
        } else {
          this.addToCart(product);
        }
        this.note =
          product.amountToBuy + " " + product.name + " has been added to cart!";
        product.quantity = product.quantity - product.amountToBuy;
        this.$bvModal.show("confirm" + product.id);
      }
      product.amountToBuy = 0;
    },
    cartContainsProduct(productID) {
      let found = false;
      this.application.cart.forEach(function(prod) {
        if (prod.id === productID) found = true;
      });
      return found;
    },
    addToCurrentProd(id, amount) {
      this.application.cart.forEach(function(prod) {
        if (prod.id === id)
          prod.added = parseInt(prod.added) + parseInt(amount);
        prod.quantity = prod.quantity - parseInt(amount);
      });
    }
  },
  computed: {
    currentProds: function() {
      if (this.application.productType == "fruit") {
        return this.application.products.fruits;
      } else if (this.application.productType == "meat") {
        return this.application.products.meats;
      } else {
        return this.application.products.drinks;
      }
    }
  }
};
</script>
