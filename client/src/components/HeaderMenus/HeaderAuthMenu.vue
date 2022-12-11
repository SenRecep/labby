<script setup lang="ts">
import HeaderAuthDesktopMenu from "./HeaderAuthDesktopMenu.vue";
import HeaderAuthMobileMenu from "./HeaderAuthMobileMenu.vue";
</script>
<template>
  <KeepAlive>
    <component
      :is="$vuetify.display.xs ? HeaderAuthMobileMenu : HeaderAuthDesktopMenu"
    ></component>
  </KeepAlive>
</template>
