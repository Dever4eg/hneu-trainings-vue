<template>
  <v-layout column>
    <div class="d-flex align-center">
      <h5 class="text-h5 font-weight-light mt-3 mb-4">Поставки</h5>
      <InvoiceCreateFormDialog>
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

    <v-layout v-if="loading" class="justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <v-card
      v-for="{ id, supplier, products, created_at: createdAt } in invoices"
      :key="id"
      class="my-3 px-3"
    >
      <v-card-text class="d-flex justify-space-between mt-3">
        <span class="text--primary font-weight-medium">{{
          supplier.name
        }}</span>
        <span>{{ createdAt | moment("DD.MM.YYYY HH:mm") }}</span>
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
                <td>${{ product.price * product.count }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-text class="d-flex justify-end text--primary font-weight-medium">
        <p>
          Всього: ${{ products.reduce((total, item) => total + (item.price * item.count), 0) }}
        </p>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import InvoiceCreateFormDialog from "@/components/Invoices/InvoiceCreateFormDialog";

export default {
  name: "Invoices",
  components: { InvoiceCreateFormDialog },
  data() {
    return {
      loading: false,
      invoices: []
    };
  },
  mounted() {
    this.fetchInvoices();
  },
  methods: {
    fetchInvoices() {
      this.loading = true;
      setTimeout(() => {
        this.invoices = [
          {
            id: 1,
            supplier: {
              name: "Bob"
            },
            products: [
              {
                count: 5,
                name: "Steering Wheel",
                price: 300
              },
              {
                count: 10,
                name: "Seat Belt",
                price: 150
              }
            ],
            created_at: "16.02.2021 15:15"
          }
        ];
        this.loading = false;
      }, 300);
    }
  }
};
</script>
