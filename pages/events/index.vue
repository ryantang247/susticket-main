<template>
  <div>
  <Header />

    <div class="events-list">
      <h1>Events</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="event in events" :key="event.id">
          <h2>{{ event.title }}</h2>
          <p>{{ event.description }}</p>
          <p>Date: {{ event.date }}</p>
          <p>Location: {{ event.location }}</p>
          <nuxt-link :to="`/events/${event.id}`">View Details</nuxt-link>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import axios from "axios";
  import Header from "~/components/homepage/Header.vue";
  export default {
    components: {Header},
    data() {
      return {
        loading: true,
        events: null
      };
    },
    mounted(){
      this.getAllEvents();
    },
    methods: {
        getAllEvents(){
          axios.get(`https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents/`, {
          data: ''//thumbnail, title, description, venueId, registrationDate, contactName, contact, seatsioChartKey, seatsioEventsKey,
          })    .then(response => {
            console.log(response.data);

            this.events = response.data;
            this.loading = false;
          })}
      }
    //, async created() {
    //   // Fetch events data from an API
    //   try {
    //     const response = await fetch('`https://secourse2024-675d60a0d98b.herokuapp.com/getAllEvents/`');
    //     const data = await response.json();
    //     this.events = data;
    //     this.loading = false;
    //   } catch (error) {
    //     console.error('Error fetching events:', error);
    //     this.loading = false;
    //   }
    // }
  };
  </script>
  <style scoped>
  .events-list {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .loading-message {
    text-align: center;
    font-style: italic;
    color: #888;
  }
  
  .event-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .event-item h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  
  .event-item p {
    margin-bottom: 5px;
  }
  
  .view-details-link {
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
  }
  
  .view-details-link:hover {
    background-color: #0056b3;
  }
  </style>