<template>
  <div>
    <h3>Запчастини</h3>

  <v-row :loading="loading">
    <v-col
    v-for="({ id, photo, name, vendorCode, supplier, priceHistory }) in items"
    :key="id">
      <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <v-img height="250" :src="photo"></v-img>

    <v-card-title>{{ name }}</v-card-title>

    <v-card-text>
      <v-flex class="d-flex justify-space-between">
        <v-chip>{{ vendorCode }}</v-chip>
        <span>
          $4343
        </span>
      </v-flex>
    </v-card-text>

    <v-card-text class="d-flex justify-space-between">

    <span class="d-flex justify-space-between">{{ supplier.name }}</span>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
      <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
          v-bind="attrs"
          v-on="on"
        >
          Історія зміни ціни
        </v-btn>
      </v-card-actions>
      </template>

      <v-card>
        <v-card-title class="headline">
          {{ name }}
        </v-card-title>

        <v-divider></v-divider>

        <v-flex
          v-for="({ price, date }) in priceHistory"
          :key="date"
          class="d-flex justify-space-between py-3 mx-3"
        >
          <span>${{ price }}</span>
          <span>{{ date.toDateString() }}</span>
        </v-flex> 

      </v-card>
    </v-dialog>
    </v-card-text>


    <v-divider class="mx-4"></v-divider>
  </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>

export default {
  name: "Suppliers",
  data () {
    return {
      loading: true,
      items: [],
    };
  },
  mounted () {
    this.fetchSuppliers();
  },
  methods: {
    fetchSuppliers () {
      setTimeout(() => {
        this.items = [
          {
            id: 1,
            name: 'Ключ для гайок',
            photo: 'https://patch.com/img/cdn20/users/22942788/20181231/011747/styles/raw/public/processed_images/spanner-combination-1546236893-8482.jpg',
            vendorCode: 'SANJ432',
            supplier: {
              name: "Harkawsk Trah Zavod",
            },
            priceHistory: [
              { price: 4343, date: new Date()},
              { price: 4343, date: new Date()},
              { price: 4343, date: new Date()},
            ]
          },
          {
            id: 1,
            name: 'Персик для гайок',
            photo: 'https://patch.com/img/cdn20/users/22942788/20181231/011747/styles/raw/public/processed_images/spanner-combination-1546236893-8482.jpg',
            vendorCode: 'SANJ432',
            supplier: {
              name: "Собрали на балконе",
            },
            priceHistory: [
              { price: 654, date: new Date()},
              { price: 424, date: new Date()},
              { price: 565, date: new Date()},
            ]
          },
        ];
        this.loading = false;
      }, 300);
    }
  }
};

</script>
