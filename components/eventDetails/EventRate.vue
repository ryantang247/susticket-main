<template>
    <el-rate
      v-model="value"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value} points"
    />
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
//   const props = defineProps({
//     rate: Float32Array
// });
  const value = ref(3.7)
  </script>
  