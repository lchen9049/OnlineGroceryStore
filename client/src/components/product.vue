<template>
  <div class="products">
    <div v-if="isAdmin">
      <table class="table mt-1">
        <thead class="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col" colspan="2">Quantity Left</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in application.products" :key="product.id">
            <td>
              <b-img
                v-bind="mainProps"
                src="https://picsum.photos/250/250/?image=54"
                fluid
                alt="Responsive image"
              ></b-img>
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
              <b-form-input :disabled="!edit" v-model="product.quantityLeft"></b-form-input>
            </td>
            <td>
              <font-awesome-icon @click="deleteProduct(product)" size="lg" icon="trash-alt" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-2">
          <b-button>Add</b-button>
        </div>
        <div class="col-2" v-if="edit">
          <b-button @click="edit=false">Save</b-button>
        </div>
        <div class="col-2" v-else>
          <b-button @click="edit=true">Edit</b-button>
        </div>

        <div class="col-8"></div>
      </div>
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
              <b-img
                v-bind="mainProps"
                :src="product.image"
                fluid
                alt="Responsive image"
              ></b-img>
            </td>
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>${{product.price}}</td>
            <td scope="row">
              <b-form-input class="col-4" v-model="product.amountToBuy"></b-form-input>
              <span>Amount left:</span>
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
    </div>
  </div>
</template>

<script>
import NewApp from "../model/newApplication";
import EditProduct from "./editProduct";
export default {
  name: "product",
  components: { EditProduct },
  props: ["application", "isAdmin"],
  data() {
    return {
      mainProps: { blank: false, width: 75, height: 75, class: "m1" },
      note: "",
      edit: false
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
        quantityLeft: product.quantityLeft - product.amountToBuy,
        added: product.amountToBuy
      });
    },
    addProduct(product) {
      if (product.amountToBuy == 0) {
        this.note = "Please enter amount to add.";
      } else {
        if (this.cartContainsProduct(product.id)) {
          this.addToCurrentProd(product.id, product.amountToBuy);
        } else {
          this.addToCart(product);
        }
        this.note =
          product.amountToBuy + " " + product.name + "has been added to cart!";
      }
      product.quantityLeft = product.quantityLeft - product.amountToBuy;
      product.amountToBuy = 0;
      this.$bvModal.show("confirm" + product.id);
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
        prod.quantityLeft = prod.quantityLeft - parseInt(amount);
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
