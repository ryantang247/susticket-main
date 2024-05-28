<template>
  <div>
    <Header />
    <div class="welcome-banner">
      <WelcomeBanner :name="userName" />
    </div>
    <CategoryMenu @category-selected="selectCategory" />

    <div v-if="isLoading" class="loading-screen">
      <!-- <p>Loading...</p> -->
    </div>
    <div v-else class="event-list-section">
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
      <div v-if="events.length > 0" class="event-list-content">
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

let userName = ref(null);
const allEvents = ref([]);
const events = ref([]);
const currentFilter = ref('All');
const currentCategory = ref('All');
const isLoading = ref(true); 

const categoryMapping = {
  'All': 0,
  'Competition': 1,
  'Fair': 2,
  'Performance': 3,
  'Activity': 4,
  'Seminar': 5
};

import recombee from 'recombee-js-api-client';

const client = new recombee.ApiClient('secourse-secourse-us', useRuntimeConfig().public.reccPublicKey, { region: 'us-west' });

let currentUserSID = null;
if (process.client) {
  currentUserSID = localStorage.getItem("SID");
}

const recommendations = ref([]);

const fetchEvents = async () => {
  try {
    var rq = new recombee.RecommendItemsToUser(currentUserSID, 3, {
      returnProperties: false,
      scenario: 'homepage'
    });
    rq.timeout = 30000;
    await client.send(rq, (err, resp) => {
      if (err) {
        console.log("Could not load recomms: ", err);
        return;
      }
      recommendations.value = resp.recomms;
      console.log("Recommendations: ", recommendations.value);
    });

    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents');
    if (response.ok) {
      const data = await response.json();
      allEvents.value = data;
      events.value = data;
      console.log(data);
      filterEvents();
    } else {
      console.error('Failed to fetch events:', response.statusText);
      ElNotification.error({
        title: 'Error',
        message: `Error fetching events. ${response}`,
        offset: 100,
      });    
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    ElNotification.error({
      title: 'Error',
      message: `Error fetching events. ${error.message}`,
      offset: 100,
    });
  } finally {
    isLoading.value = false; 
  }
};

onMounted(() => {
  fetchEvents();
  if (process.client) {
    const name = localStorage.getItem("Username") || '';
    console.log("Banner name :", name);
    userName.value = name;
  }
});

const selectCategory = async (categoryName) => {
  isLoading.value = true;
  currentCategory.value = categoryName;
  currentFilter.value = 'All';

  const catNumber = categoryMapping[categoryName];
  let url = 'https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents';
  if (catNumber !== 0) {
    url = `https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEventsByCategory/${catNumber}`;
  }

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      allEvents.value = data;
      events.value = data;
    } else {
      console.error('Failed to fetch events:', response.statusText);
      ElNotification.error({
        title: 'Error',
        message: `Error fetching events. ${response}`,
        offset: 100,
      });
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    ElNotification.error({
      title: 'Error',
      message: `Error fetching events. ${error.message}`,
      offset: 100,
    });
  } finally {
    isLoading.value = false; // Hide loading screen
  }
};

const filterEvents = () => {
  const now = new Date();
  let filteredEvents;

  switch (currentFilter.value) {
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
    default: // 'All' and any other cases
      if (recommendations.value.length > 0) {
        filteredEvents = allEvents.value.filter(event =>
          recommendations.value.some(recommendation => recommendation.id === event.id)
        );
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
</script>
<style scoped>

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);  
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: #333;
}

.loading-screen::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;  
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-overlay-text {
  z-index: 1;
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: bold;
  text-shadow: 0px 0px 10px rgba(0,0,0,0.5); 
}
  *{
    font-family: sans-serif;
  }
  .recommend-label{
    font-size: 50px;
    margin-left: 5%;
  }
  .event-list-section {
    padding: 20px;
  }
  
  .filter-tabs {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-left: 5%;
    padding: 10px 0;
    font-family: sans-serif;
    font-size: large;
  }
  
  .filter-tabs a {
    text-decoration: none;
    text-align: center;
    color: #000;
    margin: 0 15px; /* Horizontal margin */
    font-size: 1.25rem;
    opacity: 0.5;
    transition: opacity 0.3s ease;
    white-space: nowrap; /* Prevent text from wrapping */
  }
  
  .filter-tabs a:hover,
  .filter-tabs a.active { 
    opacity: 1.0; 
    cursor: pointer;
  }
  
  .event-list-content {
    display: flex;
    justify-content: center;
  }
  
  @media only screen and (max-width: 1024px) {
    .filter-tabs a {
      font-size: 1rem;
      margin: 0 10px; /* Adjusted margin for smaller screens */
    }
  }
  
  @media only screen and (max-width: 600px) {
    .filter-tabs {
      padding: 10px 5%;
    }
    .filter-tabs a {
      font-size: 0.875rem;
      margin: 0 5px; /* Adjusted margin for smaller screens */
    }
  }
  
  

</style>

