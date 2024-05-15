<script setup lang="ts">

import Header from "~/components/homepage/Header.vue";
</script>

<template>
  <Header/>
  <div class="success-page">
    <h1>Payment Unuccessful :(</h1>
    <NuxtLink to="/">Back to Home</NuxtLink>
  </div>
</template>

<style scoped>
.success-page {
  text-align: center;
  margin-top: 50px;
}
.success-page h1 {
  color: green;
}
.success-page p {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>