<template>
  <div>
    <h3>Поставки</h3>

    <v-row>
<v-card
      v-for="invoice in invoices"
      :key="invoice.id"
      class="mx-auto my-12"
      xs12
      style="width: 600px;"
    >
          <v-card-text class="d-flex justify-space-between">
            <span>{{ invoice.supplier.name }}</span>
            <span>{{ invoice.createdAt.toDateString() }}</span>
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
                    <th class="text-left">Кількість</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in desserts"
                    :key="item.name"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>

          <v-card-text class="d-flex justify-space-between">
            <p></p>
            <p>Всього: 4353</p>
          </v-card-text>
      </v-card>
    </v-row>

  </div>
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
    this.fetchSuppliers();
  },
  methods: {
    fetchSuppliers() {
      setTimeout(() => {
        this.invoices = [
          {
            id: 1,
            supplier: {
              name: "Harkawsk Trah Zavod"
            },
            incoiceProducts: [
              {
                count: 2,
                product: {
                  name: "яблоко"
                }
              }
            ],
            createdAt: new Date()
          },
        ];
        this.loading = false;
      }, 300);
    }
  }
};
</script>
