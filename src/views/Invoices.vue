<template>
  <v-layout column>
    <h5 class="text-h5 font-weight-light mt-3 mb-4">Поставки</h5>

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
        <span class="text--primary font-weight-medium">{{ supplier.name }}</span>
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
                <td>{{ product.price }}</td>
                <td>{{ product.count }}</td>
                <td>{{ product.price * product.count }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-text class="d-flex justify-end text--primary font-weight-medium">
        <p>
          Всього: {{ products.reduce((total, item) => total + (item.price * item.count), 0) }}
        </p>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "Invoices",
  data() {
    return {
      loading: true,
      invoices: []
    };
  },
  mounted() {
    this.fetchInvoices();
  },
  methods: {
    fetchInvoices() {
      setTimeout(() => {
        this.invoices = [
          {
            id: 1,
            supplier: {
              name: "Harkawsk Trah Zavod"
            },
            products: [
              {
                count: 2,
                name: "яблоко",
                price: 300
              }
            ],
            created_at: new Date()
          }
        ];
        this.loading = false;
      }, 300);
    }
  }
};
</script>
