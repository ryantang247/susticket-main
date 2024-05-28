<template>
  <div class="event-list">
      <div v-for="event in events" :key="event.id" class="event-card" >
        <div>
            <NuxtLink :to="`/events/${event.id}`">
              <img :src="event.thumbnail" alt="event-image" class="event-image" style="cursor:pointer;">
            </NuxtLink>
        <!-- <el-button type="danger" round class="status">{{event.status}}</el-button> -->
        <el-button type="warning" round class="status" v-if="event.status == 0">on sale</el-button>
        <el-button type="success" round class="status" v-if="event.status == 1">on going</el-button>
        <el-button type="info" round class="status" v-if="event.status == 2">ended</el-button>
        <h1>{{ event.title }}</h1>
        <p>{{ formatDate(event.startDate) }}</p>
        <p>{{ getVenueName(event.venueId) }}</p>
        <h2>{{ '¥' + displayPrice(event.price) }}</h2>
        <p class="available">{{ event.available }}</p>
        <div v-if="userStat == 'success'" class="bookmark-share">
          <img :src="bookmarkSrc(event)" @click="toggleBookmark(event)" class="bookmark">
          <img src="/assets/event/linkshare.png" class="share" @click="copyLink(event)">
        </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted,toRefs  } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';
import emptyBookmark from '@/assets/event/bookmark_empty.png';
import filledBookmark from '@/assets/header/bookmark.png';
import axios from 'axios';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const props = defineProps(['events']);
const { events } = toRefs(props);
const bookmarkEvents = ref({})
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanMd = breakpoints.smaller('sm') 

let userStat = null;
// let name;

onMounted(() => {
  if (process.client) {
    console.log("EVENTLIST");
    const status = localStorage.getItem("Status");
    userStat = status;
    console.log("status : ");
    console.log(status);

    // if (status) {
    //   name = localStorage.getItem("Username");
    // }
  }
});

const toggleBookmark = async (event) => {
  console.log('button clicked');

  if(bookmarkEvents.value.hasOwnProperty(event.id)){

    if(!bookmarkEvents.value[event.id]){
      try {
        const bookmarkResponse = await axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/bookmarkThisEvent',
            { eventId: event.id },
            {//AxiosRequestConfig parameter
            withCredentials: true //correct
        } );
        console.log(bookmarkResponse);
        bookmarkEvents.value[event.id] = true;
        ElNotification.success({
          title: 'Copied',
          message: "Event's successfully bookmarked!",
          offset: 100,
        });
      } catch (error) {
        // Handle the error
        console.error('Error occurred while bookmarking the event:', error);
        // Optionally, you can also notify the user about the error
        ElNotification.error({
          title: 'Error',
          message: `Failed to bookmark the event. Please try again later. ${error}`,
          offset: 100,
        });
      }

    } else {
      try {
        const bookmarkResponse = await axios.delete('https://secourse2024-675d60a0d98b.herokuapp.com/api/deleteThisEventBookmark', {
          data: {eventId: event.id},
        }, {
          //AxiosRequestConfig parameter
          withCredentials: true //correct
        }
        );
        console.log(bookmarkResponse)
        bookmarkEvents.value[event.id] = false
        ElNotification.success({
          title: 'Copied',
          message: "Event's successfully removed from bookmark!",
          offset: 100,
        });

      } catch(error){
        console.error('Error occurred while bookmarking the event:', error);
        // Optionally, you can also notify the user about the error
        ElNotification.error({
          title: 'Error',
          message: `Failed to delete bookmark. Please try again later. ${error}`,
          offset: 100,
        });
      }
    }

  }

  event.bookmarked = !event.bookmarked; // Toggle the bookmarked state
};

const bookmarkSrc = (event) => {
  return bookmarkEvents.value[event.id] ? filledBookmark : emptyBookmark;
};

const copyLink = (event) => {
  const eventLink = '/events/' + event.id;
  navigator.clipboard.writeText(eventLink).then(() => {
    ElNotification.success({
      title: 'Copied',
      message: "Event's link is copied to the clipboard",
      offset: 100,
    });
  }).catch(err => {
    console.error('Failed to copy: ', err);
    ElNotification.error({
      title: 'Error',
      message: `Failed to copy. ${err}`,
      offset: 100,
    });
  });
};

function formatDate(dateString) {
    /**
 * AI-generated-content
 * tool: Copilot
 * version: latest
 * usage: displaying date in readable format
 */
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '').toUpperCase();

  return `${formattedDate} | ${time} BJT`;
}

const venues = ref([]);
onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try{
    const venueResponse = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllVenues');
    if (venueResponse.ok) {
      const venueData = await venueResponse.json();
      venues.value = venueData;
      // console.log(venueData);

      const eventIDMap = {};
      const eventsData = await events.value;
      eventsData.forEach(event => {
        eventIDMap[event.id] = false; // Assuming eventID is a unique identifier for each event
      });

      const bookmarkResponse = await axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getBookmarkedEvents' ,{//AxiosRequestConfig parameter
        withCredentials: true //correct
      } );
      console.log("Bookmark response " ,bookmarkResponse.data)
      if(bookmarkResponse){
        bookmarkResponse.data.forEach(item =>{
          if (eventIDMap.hasOwnProperty(item.eventId)) {
            eventIDMap[item.eventId] = true;
          }

        })
        console.log("eventIDMap",eventIDMap)
        bookmarkEvents.value = eventIDMap
      }else{
        console.error('Failed to fetch bookmarks:', bookmarkResponse.statusText);
        ElNotification.error({
            title: 'Error',
            message: "Error fetching bookmarks" + error,
            offset: 100,
          });
      }
      ElNotification.success({
        title: 'Success',
        message: "Sucessfully fetch venues!",
        offset: 100,
      }
      );
    } else {
      console.error('Failed to fetch venues:', venueResponse.statusText);
      ElNotification.error({
        title: 'Error',
        message: "Error fetching venues" + error,
        offset: 100,
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    ElNotification.error({
      title: 'Error',
      message: `Error fetching data. ${error}`,
      offset: 100,
    });
  } finally {
    loading.close();
  }
});

// Function to get venue name by ID
function getVenueName(venueId) {
  const venue = venues.value.find(v => v.id === venueId);
  return venue ? venue.name : 'Unknown venue';
}

function displayPrice(priceJson) {
  /**
 * AI-generated-content
 * tool: Copilot
 * version: latest
 * usage: displaying prices in beautiful UI
 * I slightly adapt the generated code by modifying the RMB symbol
 */
  // console.log("Parsed ", priceJson);
  
  let prices;
  try {
    prices = JSON.parse(priceJson);
  } catch (e) {
    console.error("Parsing error: ", e);
    return; // Or handle the error as appropriate for your application
  }

  if (!prices || !Array.isArray(prices) || prices.length === 0) {
    return `Free`;
  }

  // Convert all prices to numbers to avoid any further issues
  prices = prices.map(price => ({
    ...price,
    price: Number(price.price)
  }));

  // Sort the array by the price field
  prices.sort((a, b) => a.price - b.price);

  // Check if all prices are the same and not zero, return the single price
  const allPricesAreSame = prices.every(price => price.price === prices[0].price);
  if (allPricesAreSame) {
    return prices[0].price === 0 ? `Free` : `${prices[0].price.toFixed(2)}`;
  }

  // Get the lowest and highest price
  const lowestPrice = prices[0].price;
  const highestPrice = prices[prices.length - 1].price;

  // Return the formatted price range or single price
  if (lowestPrice === highestPrice) {
    return `${lowestPrice.toFixed(2)}`;
  }
  return `${lowestPrice.toFixed(2)}-${highestPrice.toFixed(2)}`;
}



</script>
<style scoped>
.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-left: 5%;
  margin-right: 12%;
  font-family: sans-serif;
}

.event-card {
  width: calc(20% - 20px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #6DC9C8;
  border-radius: 10px;
  transition: border 0.3s;
  box-sizing: border-box;
}

.event-card:hover {
  border: 2px solid #6DC9C8;
}

.event-image {
  width: 100%;
  height: 17em;
  object-fit: cover;
}

.available {
  color: rgb(84, 83, 83);
}
h1{
  font-size: 300%;
}
p{
  font-size: 200%;
}
h2{
  font-size: 250%;
}

.bookmark, .share {
  width: 10%;
  height: auto;
}

.bookmark:hover, .share:hover {
  background-color: #ccc;
  border-radius: 50%;
}

@media only screen and (max-width: 2880px){
  .event-image{
    height: 10em;
  }
  h1{
    font-size: 200%;
  }
  p{
    font-size: 100%;
  }
  h2{
    font-size: 150%;
  }
  
}

@media only screen and (max-width: 1800px) {
  .event-card {
    width: calc(25% - 20px); 
  }
}

@media only screen and (max-width: 1024px) {
  .event-list {
    margin-left: 5%;
  }
  .event-card {
    width: calc(33.33% - 20px); 
  }
}

@media only screen and (max-width: 870px) {
  .event-card {
    width: calc(50% - 20px); 
  }
}
@media only screen and (max-width: 830px) {
  .event-list {
    margin-left: 1%;
    margin-right: 1%;
    display: block;
    justify-content: center;
  }
  .event-card {
    width: calc(100% - 20px); 
    margin: 10px auto; 
  }
  .event-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
}
@media only screen and (max-width: 500px){
  .event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
@media only screen and (max-width: 300px){
  .event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}



</style>