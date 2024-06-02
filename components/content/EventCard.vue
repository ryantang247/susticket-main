<template>
  <div class="event-list">
    <div v-for="event in events" :key="event.id" class="event-card">
      <img :src="event.thumbnail" alt="event-image" class="event-image">
      <el-button type="danger" round class="status">{{event.status}}</el-button>
      <h1>{{ event.title }}</h1>
      <p>{{ formatDate(event.startDate) }}</p>
      <p>{{ getVenueName(event.venueId) }}</p>
      <h2>{{ '¥' + displayPrice(event.price) }}</h2>
      <p class="available">{{ event.available }}</p>
      <div class="bookmark-share">
        <!-- <img src="/assets/header/bookmark.png" class="bookmark"> -->
        <img :src="bookmarkSrc(event)" @click="toggleBookmark(event)" class="bookmark">
        <img src="/assets/event/linkshare.png" class="share" @click="copyLink(event)">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Import axios for making HTTP requests
import { ElLoading, ElNotification } from 'element-plus';
import emptyBookmark from '@/assets/event/bookmark_empty.png';
import filledBookmark from '@/assets/header/bookmark.png';

const props = defineProps(['events']);

const toggleBookmark = async (event) => {
  console.log('button clicked');
  event.bookmarked = !event.bookmarked; // Toggle the bookmarked state

  // Ensure you send the right payload to the server
  const requestBody = {
    eventId: event.id
  };

  if (event.bookmarked) {
    try {
      const response = await axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/bookmarkThisEvent', requestBody,{//AxiosRequestConfig parameter
        withCredentials: true //correct
      } );
      // Handle the success scenario
      ElNotification({
        title: 'Success',
        message: 'Event bookmarked successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error bookmarking event:', error);
      // Handle the error
      ElNotification({
        title: 'Error',
        message: 'Failed to bookmark the event',
        type: 'error',
      });
      // Optionally revert the bookmark state if the API call fails
      event.bookmarked = !event.bookmarked;
    }
  }
};

const bookmarkSrc = (event) => {
  return event.bookmarked ? filledBookmark : emptyBookmark;
};

const copyLink = (event) => {
  navigator.clipboard.writeText(event.link).then(() => {
    ElNotification.success({
      title: 'Copied',
      message: "Event's link is copied to the clipboard",
      offset: 100,
    });
  }).catch(err => {
    console.error('Failed to copy link: ', err);
    ElNotification.error({
      title: 'Error',
      message: "Failed to copy link" + err,
      offset: 100,
    });
  });
};

function formatDate(dateString) {
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
      console.log(venueData);
      ElNotification.success({
        title: 'Success',
        message: "Sucessfully fetch venues!",
        offset: 100,
      }
      );
      
    } else {
      throw new Error(`Failed to fetch venues: ${venueResponse.statusText}`);
      
    } 
  } catch (error) {
    console.error(error);
    ElNotification.error({
      title: 'Error',
      message: `Error fetching venues: ${error.message}`,
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

/*
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to ake a function to display formatted prices
    */
function displayPrice(priceJson) {
  if (typeof priceJson !== 'string') {
    // If priceJson is not a string, return a default value or error
    console.error('displayPrice was called with non-string argument:', priceJson);
    return "Price not available";
  }

  try {
    // Parse the JSON string to an array
    const prices = JSON.parse(priceJson);

    // If the parsed result is not an array, or it's empty, return a default value or error
    if (!Array.isArray(prices) || prices.length === 0) {
      console.error('Parsed price data is not an array or is empty:', prices);
      return "Price not available";
    }

    // Check if there's only one price
    if (prices.length === 1) {
      return `${prices[0].price}`;
    }

    // If there are multiple prices, sort the array by the price field
    prices.sort((a, b) => a.price - b.price);

    // Get the lowest and highest price
    const lowestPrice = prices[0].price;
    const highestPrice = prices[prices.length - 1].price;

    // Return the formatted price range or single price
    return `${lowestPrice}-${highestPrice}`;
  } catch (e) {
    // If JSON.parse() fails or any other error occurs, log the error and return a default value
    console.error('Error parsing priceJson:', e);
    return "Price not available";
  }
}


</script>
<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to style the html above
-->
<style scoped>
.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content:left; /* Adjust alignment between items */
  margin-left: 5%;
  font-family: sans-serif;
}

.event-card {
  width: calc(20% - 20px); /* Adjust card width to fit 6 cards per row */
  margin: 10px;
  padding: 10px;
  border: 1px solid #6DC9C8;
  border-radius: 10px;
}

.event-image{
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.available{
  color: rgb(84, 83, 83);
}
.bookmark, .share {
  width: 10%;
  height: auto;
}
.bookmark:hover, .share:hover{
  background-color: #ccc;
  border-radius: 50%;
}


</style>
