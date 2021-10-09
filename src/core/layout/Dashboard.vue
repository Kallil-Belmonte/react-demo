<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter />
</template>

<script lang="ts" setup>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>
