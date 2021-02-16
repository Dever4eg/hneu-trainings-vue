<template>
  <div>
    <h3>Постачальники</h3>

    <v-card
      v-for="item in items"
      :key="item.id"
      class="mx-auto my-5"
      outlined
    >
      <v-list-item>
        <v-list-item-content>
          <div class="overline">
            {{ item.name }}
          </div>
          <v-list-item-subtitle>
            <p>{{ item.email }}</p>
            <p>{{ item.phone }}</p>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
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
            name: 'Fucking partner',
            phone: '432423523',
            email: 'fuck@mail.ua',
          },
          {
            id: 2,
            name: 'Partner without dick',
            phone: '432423523',
            email: 'dick@mail.ua',
          },
          {
            id: 3,
            name: 'Partner right from ass',
            phone: '432423523',
            email: 'ass@mail.ua',
          },
        ];
        this.loading = false;
      }, 300);
    }
  }
};

</script>
