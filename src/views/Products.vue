<template>
  <v-layout column>
    <h5 class="text-h5 font-weight-light mt-3 mb-4">Запчастини</h5>

    <v-layout v-if="loading" class="justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <v-row dense>
      <v-col
        v-for="{
          id,
          image,
          name,
          price,
          price_history: priceHistory,
          vendor_code: vendorCode,
          supplier_name: supplierName
        } in products"
        :key="id"
        class="my-3"
        cols="auto"
      >
        <v-card class="mr-5" max-width="375">
          <v-img height="250" :src="image"></v-img>
          <v-card-title>
            {{ name }}
          </v-card-title>
          <v-card-text>
            <v-flex class="d-flex justify-space-between align-center">
              <v-chip>
                {{ vendorCode }}
              </v-chip>
              <span>${{ price }}</span>
            </v-flex>
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <span class="d-flex justify-space-between">
              {{ supplierName }}
            </span>
          </v-card-text>

          <v-dialog width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-card-actions class="flex justify-end pb-5">
                <v-btn color="grey darken-4" text v-bind="attrs" v-on="on">
                  Історія зміни ціни
                </v-btn>
              </v-card-actions>
            </template>
            <v-card>
              <v-card-title class="text-h6 font-weight-regular">
                {{ name }}
              </v-card-title>
              <v-divider></v-divider>
              <v-list>
                <v-list-item
                  v-for="{ price, date } in priceHistory"
                  :key="date"
                  class="d-flex justify-space-between py-3 mx-3"
                >
                  <v-list-item-content> ${{ price }} </v-list-item-content>
                  <v-list-item-action>
                    {{ date | moment("DD.MM.YYYY HH:mm") }}
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { getAuthHeader } from "../helpers/auth";

export default {
  name: "Products",
  data() {
    return {
      loading: false,
      products: []
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.loading = true;
      // eslint-disable-next-line no-undef
      axios
        .get("/tools", { headers: { ...getAuthHeader() } })
        .then(response => {
          this.products = response.data.data.tools;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
