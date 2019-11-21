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
            <th scope="col" colspan="4">Quantity Left</th>
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
              <font-awesome-icon
                @click="$bvModal.show('addStock'+product.id);"
                size="lg"
                icon="plus-circle"
              />
            </td>
            <td>
              <font-awesome-icon
                @click="$bvModal.show('editStock'+product.id);newProduct=JSON.parse(JSON.stringify(product))"
                size="lg"
                icon="edit"
              />
            </td>
            <b-modal :id="'editStock'+product.id" hide-footer :title="product.name">
              <div class="row">
                <div class="col">
                  Product Name
                  <b-form-input id="prodName" v-model="newProduct.name"></b-form-input>
                </div>
                <div class="col">
                  Product Price
                  <b-form-input id="prodPrice" v-model="newProduct.price"></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  Category
                  <b-form-select id="category" :options="category" v-model="newProduct.category"></b-form-select>
                </div>
                <div class="col">
                  Weight
                  <b-form-input id="p_weight" v-model="newProduct.weight"></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  Warehouse
                  <b-form-input id="warehouse" :disabled="true" v-model="newProduct.warehouse"></b-form-input>
                </div>
                <div class="col">
                  Quantity
                  <b-form-input id="quantity" v-model="newProduct.quantity"></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  Image Url
                  <b-form-input id="p_image" v-model="newProduct.image"></b-form-input>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <div class="float-right">
                    <b-button @click="updateProduct()">Update</b-button>
                    <b-button @click="$bvModal.hide('editStock'+product.id)">Cancel</b-button>
                  </div>
                </div>
              </div>
            </b-modal>
            <b-modal
              @hidden="amountToAdd=0;warehouse=null"
              :id="'addStock'+product.id"
              hide-footer
              title="Add Stock"
            >
              <div class="row">
                <div class="col">
                  {{product.name}}
                  <b-form-input id="quantity" v-model="amountToAdd"></b-form-input>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-8">
                  <b-button class="mr-2" @click="addStock(product)">Add</b-button>
                  <b-button @click="$bvModal.hide('addStock'+product.id)">Cancel</b-button>
                </div>
              </div>
            </b-modal>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col">
          <div class="float-right">
            <b-button @click="$bvModal.show('addNewProduct');newProduct=new newProd()">Add New Stock</b-button>
          </div>
        </div>
      </div>
      <div class="row mt-5"></div>
      <b-modal id="addNewProduct" hide-footer title="Add New Product">
        <div class="row">
          <div class="col">
            Product Name
            <b-form-input id="prodName" v-model="newProduct.product_name"></b-form-input>
          </div>
          <div class="col">
            Product Price
            <b-form-input id="prodPrice" v-model="newProduct.product_price"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            Category
            <b-form-select id="category" :options="category" v-model="newProduct.category"></b-form-select>
          </div>
          <div class="col">
            Weight
            <b-form-input id="p_weight" v-model="newProduct.p_weight"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            Warehouse
            <b-form-select
              id="warehouse"
              :options="application.warehouses"
              v-model="newProduct.warehouse"
            ></b-form-select>
          </div>
          <div class="col">
            Quantity
            <b-form-input id="quantity" v-model="newProduct.product_quantity"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            Image Url
            <b-form-input id="p_image" v-model="newProduct.p_image"></b-form-input>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="float-right">
              <b-button @click="addProduct()">Add</b-button>
              <b-button @click="$bvModal.hide('addNewProduct')">Cancel</b-button>
            </div>
          </div>
        </div>
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
              <b-button @click="addProductToCart(product)">Add Product</b-button>

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
import AuthenticationService from "@/services/AuthenticationService";
import axios from "axios";
import NewApp from "../model/newApplication";
import EditProduct from "./editProduct";
import newProd from "../model/product";
export default {
  name: "product",
  components: { EditProduct },
  props: ["application"],
  data() {
    return {
      mainProps: { blank: false, width: 75, height: 75, class: "m1" },
      note: "",
      edit: false,
      warning: null,
      amountToAdd: 0,
      warehouse: null,
      warning: false,
      warningNote: null,
      newProduct: {
        product_name: null,
        product_price: null,
        category: null,
        p_weight: null,
        p_image: null,
        warehouse: null,
        product_quantity: null
      },
      category: [
        { value: null, text: "Please Select Category" },
        { value: "fruit", text: "Fruit" },
        { value: "meat", text: "Meat" },
        { value: "drink", text: "Drink" }
      ]
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
      axios
        .delete(`http://localhost:3000/deleteProduct/${product.id}`)
        .then(response => {
          this.application.products.fruits = [];
          this.application.products.meats = [];
          this.application.products.drinks = [];
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
        })
        .catch(error => {
          console.log(error);
        });
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
    addProductToCart(product) {
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
    },
    async addStock(product) {
      const response = await AuthenticationService.addStock({
        product_quantity:
          parseInt(this.amountToAdd) + parseInt(product.quantity),
        product_id: product.id
      });
      if (response.data) {
        product.quantity =
          parseInt(product.quantity) + parseInt(this.amountToAdd);
        this.$bvModal.hide("addStock" + product.id);
        this.warning = false;
      } else {
        this.warning = true;
        this.warningNote = "Fail to update";
      }
    },
    async addProduct(product) {
      const response = await AuthenticationService.addProduct({
        product_name: this.newProduct.product_name,
        product_price: parseFloat(this.newProduct.product_price),
        category: this.newProduct.category,
        p_weight: parseFloat(this.newProduct.p_weight),
        p_image: this.newProduct.p_image,
        warehouse_id: this.newProduct.warehouse.id,
        product_quantity: this.newProduct.product_quantity
      });
      if (response.data) {
        this.application.products.fruits = [];
        this.application.products.meats = [];
        this.application.products.drinks = [];
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

        this.newProduct = null;
        this.$bvModal.hide("addNewProduct");
      } else {
      }
    },
    async updateProduct() {
      const response = await AuthenticationService.updateProduct({
        product_name: this.newProduct.name,
        product_price: this.newProduct.price,
        category: this.newProduct.category,
        p_weight: this.newProduct.weight,
        p_image: this.newProduct.image,
        product_id: this.newProduct.id
      });
      if (response.data) {
        this.newProduct = null;
        this.$bvModal.hide("editStock" + product.id);
      }
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
