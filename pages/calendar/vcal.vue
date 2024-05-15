<template>
    <!-- https://tomosterlund.github.io/qalendar/
    https://www.npmjs.com/package/vue-calendar-3 -->
    <div class="calendar-page">
      <Header />
      <div class="label-page">
        <img src="~/assets/categorymenu/back.png" alt="Back" @click="goToHomepage">
        <h1>My Events</h1>
      </div>
  
      <div class="calendar-container">
        <v-calendar v-model="selectedDate" :events="events" @click:event="handleEventClick" />
      </div>
      
      <Footer />
      <CustomerService/>
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/homepage/Header.vue';
  import Footer from '@/components/homepage/Footer.vue';
  import CustomerService from '@/components/CustomerService.vue';
  
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  import { createVCalendar } from 'v-calendar';
  
  const router = useRouter();
  
  const goToHomepage = () => {
    router.push('/');
  };
  
  const events = ref([
    {
      id: '635b9c0b-d988-4853-9d44-adef7a5e40ca',
      title: 'Fun Event',
      description: 'Very Fun!',
      start: '2024-03-12T16:00:00.000Z',
      end: '2024-03-14T16:00:00.000Z',
    },
    // More events...
  ]);
  
  const selectedDate = ref(new Date());
  
  const handleEventClick = (event) => {
    console.log('Clicked event:', event);
    // Handle click event...
  };
  
  </script>
  
  <style scoped>
  /* Your styles */
  </style>
  