<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <slot name="activator" v-bind:on="on" v-bind:attrs="attrs" />
      </template>

      <v-card>
        <v-card-title class="headline font-weight-light">
          Нова поставка
        </v-card-title>

        <v-form @submit.prevent="submit">
          <v-card-text>
            <v-select
              v-model="form.supplier"
              :items="suppliers"
              item-text="name"
              item-value="id"
              label="Постачальник"
              return-object
              @change="updateInvoiceProducts"
              name="supplier"
              v-validate="'required'"
              :error-messages="errors.collect('supplier')"
              required
            />
            <div v-for="(_, index) in form.products" :key="index">
              <v-row>
                <v-col cols="8">
                  <v-select
                    v-model="form.products[index].supplierProduct"
                    :items="supplierProducts"
                    :disabled="
                      0 === supplierProducts.length || supplierProductsLoading
                    "
                    item-text="name"
                    item-value="id"
                    label="Запчастина"
                    return-object
                    :name="`products[${index}].supplierProduct`"
                    v-validate="'required'"
                    :error-messages="
                      errors.collect(`products[${index}].supplierProduct`)
                    "
                    required
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.products[index].count"
                    hide-details
                    single-line
                    label="Кількість"
                    type="number"
                    :name="`products[${index}].count`"
                    v-validate="'required|max_value:9999|min_value:1'"
                    :error-messages="errors.collect(`products[${index}].count`)"
                    required
                  />
                </v-col>
                <v-col
                  cols="1"
                  class="d-flex align-center d-flex align-end justify-end"
                >
                  <v-btn
                    icon
                    color="grey"
                    :disabled="form.products.length < 2"
                    @click="removeInvoiceProduct(index)"
                  >
                    <v-icon dark>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <v-btn
              outlined
              text
              class="font-weight-regular grey--text="
              style="width: 100%"
              @click="addInvoiceProduct"
            >
              + Додати запчастину
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <p class="text-right pr-10 mt-4">Сума: ${{ cost.toFixed(2) }}</p>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2 white--text"
              color="secondary"
              type="submit"
              :loading="creating"
            >
              Створити
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAuthHeader } from "@/helpers/auth";
import axios from "axios";

const makeEmptyInvoiceProduct = () => ({
  supplierProduct: null,
  count: 1
});

const makeEmptyForm = () => ({
  supplier: null,
  products: [makeEmptyInvoiceProduct()]
});

export default {
  name: "InvoiceCreateFormDialog.vue",
  data() {
    return {
      creating: false,
      dialog: false,
      suppliers: [],
      supplierProducts: [],
      supplierProductsLoading: false,
      form: makeEmptyForm()
    };
  },
  computed: {
    cost() {
      return this.form.products.reduce(
        (sum, product) =>
          sum + product.count * (product.supplierProduct?.price || 0),
        0
      );
    }
  },
  mounted() {
    this.fetchSuppliers();
  },
  methods: {
    fetchSuppliers() {
      return axios
        .get("/suppliers", { headers: { ...getAuthHeader() } })
        .then(response => {
          this.suppliers = response.data.data.suppliers;
        });
    },
    updateInvoiceProducts() {
      this.form.products = [makeEmptyInvoiceProduct()];
      this.supplierProductsLoading = true;
      return axios
        .get(`/tools?supplier_ids=${this.form.supplier.id}`, {
          headers: { ...getAuthHeader() }
        })
        .then(response => {
          this.supplierProducts = response.data.data.tools;
        })
        .finally(() => {
          this.supplierProductsLoading = false;
        });
    },
    addInvoiceProduct() {
      this.form.products.push(makeEmptyInvoiceProduct());
    },
    removeInvoiceProduct(index) {
      this.form.products = this.form.products.filter((_, i) => index !== i);
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            data: this.form.products.map(product => ({
              supplier_product_id: product.supplierProduct.id,
              count: +product.count
            }))
          };

          this.creating = true;
          axios
            .post("/invoice", payload)
            .then(() => {
              this.$emit("created");
              this.form = makeEmptyForm();
              this.dialog = false;
            })
            .finally(() => {
              this.creating = false;
            });
        }
      });
    }
  }
};
</script>
