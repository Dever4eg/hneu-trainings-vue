<template>
  <v-app>
    <v-app-bar color="grey darken-4" dark app>
      <v-toolbar-title>Веселка</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/login" text>Log in</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-navigation-drawer clipped>
      <v-list dense nav class="py-0">
        <v-list dense>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Постачальники</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/challenge/create">
            <v-list-item-icon>
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Запчастини</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/my-challenges">
            <v-list-item-icon>
              <v-icon>mdi-shape-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Поставки</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-list>
    </v-navigation-drawer>

      <v-layout fill-height>
        <router-view></router-view>
      </v-layout>
    </v-content>

    <v-footer padless app>
      <v-card flat tile width="100%" class="grey darken-4 text-center">
        <v-card-text class="white--text">
          <strong> &copy; Веселка </strong>
          , made with
          <v-icon color="red"> mdi-heart </v-icon>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
