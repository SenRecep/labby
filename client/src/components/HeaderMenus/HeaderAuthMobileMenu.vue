<template>
  <v-menu left bottom>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item to="/auth/login" title="Login" prepend-icon="mdi-login" />
      <v-list-item
        to="/auth/register"
        title="Register"
        prepend-icon="mdi-account-plus"
      />
      <v-list-item to="/auth/logout" title="Logout" prepend-icon="mdi-logout" />
    </v-list>
  </v-menu>
</template>
