
<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to generate event card template
-->

<template>
  <div class="event-card">
    <img :src="event.image" alt="Event image">
    <div class="event-info">
      <h3>{{ event.title }}</h3>
      <p>{{ event.date }}</p>
      <p>{{ event.location }}</p>
      <p>{{ event.price }}</p>
      <span>{{ event.status }}</span>
    </div>
    <!-- Add icons and additional info here -->
  </div>
</template>

<script setup>
// Props passed to the event card component
const props = defineProps({
  event: Object
});
</script>

<style scoped>
.event-card {
  /* Your styles here */
}
</style>
  