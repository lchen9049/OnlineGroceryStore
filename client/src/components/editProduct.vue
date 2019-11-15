<template>
  <div class="editProduct">
    <div class="row">
      <div class="col-4">
        Product ID
        <b-form-input :disabled="true" v-model="infoToEdit.id" />
      </div>
      <div class="col-4">
        Product Name
        <b-form-input v-model="infoToEdit.name" />
      </div>
      <div class="col-4">
        Product Price
        <b-form-input v-model="infoToEdit.price" />
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        Product Category
        <b-form-input :disabled="true" v-model="infoToEdit.category" />
      </div>
      <div class="col-4">
        Quantity Available
        <b-form-input v-model="infoToEdit.quantityLeft" />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4">
        <b-button @click="cancelEdit()">Cancel</b-button>
      </div>
      <div class="col-4">
        <b-button>Delete Product</b-button>
      </div>
      <div class="col-4">
        <b-button>Update</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editProduct",
  components: {},
  props: ["prod"],
  data() {
    return {
        infoToEdit: {
            id: null,
            name: null,
            price: null, 
            category: null,
            quantityLeft: null, 
        }
    };
  },
  mounted() {
      this.infoToEdit = this.prod;
  },
  methods: {
      cancelEdit(){

      }
  }
};
</script>