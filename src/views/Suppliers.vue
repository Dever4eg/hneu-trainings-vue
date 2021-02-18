<template>
  <v-layout column>
    <h5 class="text-h5 font-weight-light mt-3 mb-4">Постачальники</h5>

    <v-layout v-if="loading" class="justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <v-card
      v-for="{ id, name, address, phone } in suppliers"
      :key="id"
      class="my-3"
    >
      <v-card-title>
        {{ name }}
      </v-card-title>
      <v-card-text class="text--primary font-weight-light">
        <p v-if="address">{{ address }}</p>
        <p v-if="phone">{{ phone }}</p>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { getAuthHeader } from "../helpers/auth";

export default {
  name: "Suppliers",
  data() {
    return {
      loading: false,
      suppliers: []
    };
  },
  mounted() {
    this.fetchSuppliers();
  },
  methods: {
    fetchSuppliers() {
      this.loading = true;
      // eslint-disable-next-line no-undef
      axios
        .get("/suppliers", { headers: { ...getAuthHeader() } })
        .then(response => {
          this.suppliers = response.data.data.suppliers;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
