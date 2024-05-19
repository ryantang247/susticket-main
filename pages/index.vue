<!--local host-->
<template>
  <div>
    <Header />
    <div class="welcome-banner">
      <WelcomeBanner :name="userName" />
    </div>
    <CategoryMenu @category-selected="selectCategory" />
    <div class="event-list-section">
      <!-- <EventFilter/> -->
      <div class="filter-tabs">
        <a
          href="#"
          @click.prevent="selectFilter('All')"
          :class="{ active: currentFilter === 'All' }"
        >All</a>
        <a
          href="#"
          @click.prevent="selectFilter('This Week')"
          :class="{ active: currentFilter === 'This Week' }"
        >This week</a>
        <a
          href="#"
          @click.prevent="selectFilter('This Month')"
          :class="{ active: currentFilter === 'This Month' }"
        >This Month</a>
        <a
          href="#"
          @click.prevent="selectFilter('Next Month')"
          :class="{ active: currentFilter === 'Next Month' }"
        >Next Month</a>
      </div>
      <div v-if="events.length >0"  class="event-list-content">
        <EventList :events="events" />
      </div>
    </div>
    <el-backtop :right="60" :bottom="150" />
    <CustomerService/>
    <Footer />
  </div> 
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, addMonths } from 'date-fns';

// Import components
import Header from '@/components/homepage/Header.vue';
import WelcomeBanner from '@/components/homepage/WelcomeBanner.vue';
import CategoryMenu from '@/components/homepage/CategoryMenu.vue';
import EventList from '@/components/homepage/EventList.vue';
import CustomerService from '@/components/CustomerService.vue';
import Footer from '@/components/homepage/Footer.vue';

let userName = ref("");

const allEvents = ref([]);
const events = ref([]);
const currentFilter = ref('All');
const currentCategory = ref('All');

const categoryMapping = {
  'All': 0,
  'Competition': 1,
  'Fair': 2,
  'Performance': 3,
  'Activity': 4,
  'Seminar': 5
};


import recombee from 'recombee-js-api-client'

const client = new recombee.ApiClient('secourse-secourse-us', useRuntimeConfig().public.reccPublicKey, {region: 'us-west'});

let currentUserSID = null;
if (process.client) {
  currentUserSID = localStorage.getItem("SID")
}

const recommendations = ref([]);

const fetchEvents = async () => {

  var rq = new recombee.RecommendItemsToUser(currentUserSID, 3,
      {
        returnProperties: false,
        scenario: 'homepage'
      }
  )
  rq.timeout = 30000
  await client.send(rq,
      (err, resp) => {
        if(err) {
          console.log("Could not load recomms: ", err);
          return;
        }
        recommendations.value = resp.recomms
        console.log("Recommendations: ", recommendations.value);

      }
  );

  const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents');
  if (response.ok) {
    const data = await response.json();
    allEvents.value = data;
    // Apply filters to the initial data
    events.value = data;
    console.log(data);
    filterEvents();
  } else {
    console.error('Failed to fetch events:', response.statusText);
  }
};
onMounted(() => {
  fetchEvents();
  if (process.client) {
    userName.value = localStorage.getItem("Username") || '';
  }
});

const selectCategory = async (categoryName) => {
  currentCategory.value = categoryName;
  currentFilter.value = 'All';  // Reset time filter to 'All'

  const catNumber = categoryMapping[categoryName];
  let url = 'https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents';
  if (catNumber !== 0) {
    url = `https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEventsByCategory/${catNumber}`;
  }

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    allEvents.value = data;
    events.value = data;  // Populate events with the new category data without filtering by time
  } else {
    console.error('Failed to fetch events:', response.statusText);
  }
};


// const fetchEventsByCategory = async (categoryName) => {
//   let url = 'https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents';
//   if (categoryName !== 'All') {
//     const categoryMapping = {
//       'Competition': 1,
//       'Fair': 2,
//       'Performance': 3,
//       'Activity': 4,
//       'Seminar': 5
//     };
//     const catNumber = categoryMapping[categoryName];
//     url = `https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEventsByCategory/${catNumber}`;
//   }

//   const response = await fetch(url);
//   if (response.ok) {
//     const data = await response.json();
//     events.value = data;
//   } else {
//     console.error('Failed to fetch events:', response.statusText);
//   }
// };

const filterEvents = () => {
  const now = new Date();
  let filteredEvents;

  switch(currentFilter.value) {
    case 'This Week':
      const startWeek = startOfWeek(now);
      const endWeek = endOfWeek(now);
      filteredEvents = allEvents.value.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startWeek && eventDate <= endWeek;
      });
      break;
    case 'This Month':
      const startMonth = startOfMonth(now);
      const endMonth = endOfMonth(now);
      filteredEvents = allEvents.value.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startMonth && eventDate <= endMonth;
      });
      break;
    case 'Next Month':
      const startNextMonth = startOfMonth(addMonths(now, 1));
      const endNextMonth = endOfMonth(addMonths(now, 1));
      filteredEvents = allEvents.value.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startNextMonth && eventDate <= endNextMonth;
      });
      break;
    default:  // 'All' and any other cases
      if (recommendations.value.length > 0) {
        filteredEvents = [];

        for (let i = 0; i < allEvents.value.length; i++) {
          const event = allEvents.value[i];
          console.log("Event ",event)
          // Check if the event's ID is included in recommendations.value
          if (recommendations.value.some(recommendation => recommendation.id === event.id)) {

            filteredEvents.push(event);
          }
        }
        console.log("Filtered events", filteredEvents)

      } else {
        filteredEvents = allEvents.value;
      }
      break;
  }

  events.value = filteredEvents;
};


// Function to handle selecting a filter
const selectFilter = (filter) => {
  currentFilter.value = filter;
  filterEvents();
};

// Function to handle selecting a category
// const selectCategory = (categoryName) => {
//   currentCategory.value = categoryName;
//   filterEvents(); // Refilter events with the selected category
// };

// onMounted(() => fetchEventsByCategory('All'));


</script>

<style scoped>
  *{
    font-family: sans-serif;
  }
  .recommend-label{
    font-size: 50px;
    margin-left: 5%;
  }
  .filter-tabs {
    margin-left: 5%;
  }
  .filter-tabs a {
    /* Styles for the category names */
    text-decoration: none;
    text-align: center;
    color: #000;
    width: 20px;
    margin: 30px;
    font-size: 30px;
    opacity: 50%;
  }
  .event-list-content {
    display: flex;
    justify-content: center; /* Center items horizontally */
  }

  .filter-tabs a {
    opacity: 0.5; /* Default low opacity for all */
    /* Add more styles for your tabs */
  }
  
  .filter-tabs a:hover,
  .filter-tabs a.active { /* When hovering or the tab is active */
    opacity: 1.0; /* Full opacity */
    cursor: pointer;
    /* Add any other hover and active styles here */
  }
  

</style>