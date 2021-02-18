<template>
  <v-container>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm10 md8 lg6 xl4>
        <v-card class="elevation-3 px-5 py-15">
          <v-card-title class="justify-center py-15 text-h5 font-weight-light">
            Авторизація
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                id="email"
                label="Email"
                color="grey darken-4"
                outlined
                clearable
                name="email"
                v-model="email"
                :loading="loading"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                required
                type="email"
              >
              </v-text-field>
              <v-text-field
                id="password"
                label="Пароль"
                color="grey darken-4"
                class="mt-5"
                outlined
                name="password"
                ref="password"
                v-model="password"
                :loading="loading"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-validate="'required'"
                :error-messages="errors.collect('password')"
                required
              >
              </v-text-field>

              <v-alert
                v-if="error"
                dense
                border="left"
                type="error"
                dismissible
              >
                {{ error }}
              </v-alert>

              <v-layout class="d-flex justify-center my-5">
                <v-btn type="submit" dark color="grey darken-4 px-10">
                  Війти
                </v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    loading: false,
    error: "",
    showPassword: false
  }),
  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = "";
          this.loading = true;
          const payload = {
            sign_in: {
              email: this.email,
              password: this.password
            }
          };
          // eslint-disable-next-line no-undef
          axios
            .post("/sign_in", payload)
            .then(response => {
              this.$store.commit("login", response.data.data.user);
              this.$router.push("/");
            })
            .catch(() => {
              this.error = "Неправильні email або пароль!";
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
