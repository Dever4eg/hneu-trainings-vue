<template>
  <v-layout column>
    <div class="d-flex mt-3 mb-4">
      <h5 class="text-h5 font-weight-light">Поставки</h5>
      <InvoiceCreateFormDialog @created="fetchInvoices">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mb-2 ml-4 mx-2"
            fab
            dark
            x-small
            color="gray"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
      </InvoiceCreateFormDialog>
    </div>

    <div class="d-flex justify-space-between">
      <div>
        <v-select
          :items="suppliers"
          :loading="fetchingSuppliers"
          label="Назва постачальника"
          solo
          clearable
          @change="filterInvoices"
        ></v-select>
      </div>

      <div class="d-flex">
        <v-dialog
          ref="firstDate"
          v-model="firstDateModal"
          :return-value.sync="firstDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="firstDate"
              class="mx-5"
              label="Від"
              solo
              readonly
              clearable
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="firstDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="grey darken-4" @click="firstDateModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="grey darken-4"
              @click="
                $refs.firstDate.save(firstDate);
                fetchInvoices();
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-dialog
          ref="lastDate"
          v-model="lastDateModal"
          :return-value.sync="lastDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="lastDate"
              label="До"
              solo
              readonly
              clearable
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="lastDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="grey darken-4" @click="lastDateModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="grey darken-4"
              @click="
                $refs.lastDate.save(lastDate);
                fetchInvoices();
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>
    </div>

    <v-layout v-if="loading" class="justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <v-layout v-if="filteredInvoices && !filteredInvoices.length">
      <p class="text--secondary font-weight-regular">Поставок не знайдено</p>
    </v-layout>

    <v-card
      v-for="{
        id,
        date,
        products,
        supplier_name: supplierName
      } in filteredInvoices"
      :key="id"
      class="my-3 px-3"
    >
      <v-card-text class="d-flex justify-space-between mt-3">
        <span class="text--primary font-weight-medium">
          {{ supplierName }}
        </span>
        <span>{{ date | moment("DD.MM.YYYY HH:mm") }}</span>
      </v-card-text>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">№</th>
                <th class="text-left">Назва запчастини</th>
                <th class="text-left">Ціна</th>
                <th class="text-left">Кількість</th>
                <th class="text-left">Сума</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>${{ product.price }}</td>
                <td>{{ product.count }}</td>
                <td>${{ (product.price * product.count).toFixed(2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-text class="d-flex justify-end text--primary font-weight-medium">
        <p>Всього: ${{ computeInvoiceSum(products) }}</p>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import InvoiceCreateFormDialog from "@/components/Invoices/InvoiceCreateFormDialog";
import { getAuthHeader } from "../helpers/auth";

export default {
  name: "Invoices",
  components: { InvoiceCreateFormDialog },
  data() {
    return {
      loading: false,
      fetchingSuppliers: false,
      suppliers: [],
      invoices: [],
      filteredInvoices: [],
      firstDateModal: null,
      lastDateModal: null,
      firstDate: "",
      lastDate: ""
    };
  },
  mounted() {
    this.fetchSuppliers();
    this.fetchInvoices();
  },
  methods: {
    fetchSuppliers() {
      this.fetchingSuppliers = true;
      // eslint-disable-next-line no-undef
      axios
        .get("/suppliers", { headers: { ...getAuthHeader() } })
        .then(response => {
          const { suppliers } = response.data.data;

          this.suppliers = suppliers.map(({ name }) => name);
        })
        .finally(() => {
          this.fetchingSuppliers = false;
        });
    },
    fetchInvoices() {
      this.loading = true;
      this.filteredInvoices = [];
      // eslint-disable-next-line no-undef
      axios
        .get(`/invoices?first_date=${this.firstDate}&last_date=${this.lastDate}`, { headers: { ...getAuthHeader() } })
        .then(response => {
          this.invoices = response.data.data;
          this.filteredInvoices = this.invoices;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    filterInvoices(supplierName) {
      if (!supplierName) {
        this.filteredInvoices = this.invoices;
      } else {
        this.filteredInvoices = this.invoices.filter(
          ({ supplier_name }) => supplier_name === supplierName
        );
      }
    },
    computeInvoiceSum(products) {
      return products
        .reduce((total, item) => total + item.price * item.count, 0)
        .toFixed(2);
    }
  }
};
</script>
