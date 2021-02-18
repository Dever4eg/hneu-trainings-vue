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

        <v-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2 white--text"
            color="secondary"
            @click="dialog = false"
          >
            Створити
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "InvoiceCreateFormDialog.vue",
  data() {
    return {
      dialog: false
    };
  }
};
</script>
