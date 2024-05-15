<template>
    <div class="found-event-page">
        <Header />
        <div class="label-page">
          <img src="~/assets/header/backarrow.png" alt="Back" @click="goToHomepage">
          <h2 v-if="route.query.query && foundEvents.length">
            Found "{{ route.query.query }}"
          </h2>
          <h2 v-else-if="route.query.query && !foundEvents.length">
            "{{ route.query.query }}" Not Found
          </h2>
          <h2 v-else>
            Search
          </h2>
        </div>
        <div class="container">
            <EventList :events="foundEvents" />
        </div>
        <Footer />
        <CustomerService/>
      </div>
      
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Header from '@/components/homepage/Header.vue';
import Footer from '@/components/homepage/Footer.vue';
import EventList from '@/components/homepage/EventList.vue';
import CustomerService from '@/components/CustomerService.vue';

// Reactive reference for found events
const foundEvents = ref([]);

// Router and route instances for navigation and accessing query params
const router = useRouter();
const route = useRoute();

// Function to fetch events based on the search query
const fetchEvents = async () => {
  const searchQuery = route.query.query;
  console.log('searchQuery: ' + searchQuery)
  if (searchQuery) {
    const response = await fetch(`https://secourse2024-675d60a0d98b.herokuapp.com/api/searchEvents/${encodeURIComponent(searchQuery)}`);
    if (response.ok) {
      foundEvents.value = await response.json();
      console.log(foundEvents.value);
    } else {
      console.error('Failed to fetch events:', response.statusText);
    }
  }
};

// Fetch events when the component is mounted
onMounted(fetchEvents);

// Reactively fetch events when the search query changes
watch(() => route.query.query, fetchEvents);

const goToHomepage = () => {
  router.push('/');
};
</script>


<style scoped>
  *{
    font-family: sans-serif;
  }

  .label-page{
    display: flex;
    align-items: center;
  }
  .label-page h2{
    font-family: sans-serif;
    font-size: 40px;
    margin-left: 20px;
  }
  .label-page img{
    margin-left: 10px;
    width: 50px;
    height: 50px;
  }
  .label-page img:hover{
    background-color: rgb(189,189,189);
    border-radius: 50%;
  }
</style>