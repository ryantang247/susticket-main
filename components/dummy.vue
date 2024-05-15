<template>
  <div class="event-list">
    <div v-for="event in events" :key="event.id" class="event-card">
      <!-- <img :src="event.thumbnail" alt="event-image" class="event-image"> -->
      <el-button type="danger" round class="status">{{event.status}}</el-button>
      <h1>{{ event.title }}</h1>
      <p>{{ event.startDate }}</p>
      <!-- Display venue name corresponding to the venueID -->
      <!-- <p>{{ getVenueName(event.venueId) }}</p> -->
      <h2>{{ '¥' + event.price }}</h2>
      <p class="available">{{ event.available }}</p>
      <div class="bookmark-share">
        <!-- <img src="/assets/header/bookmark.png" class="bookmark"> -->
        <img :src="bookmarkSrc(event)" @click="toggleBookmark(event)" class="bookmark">
        <img src="/assets/event/share.png" class="share">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue'; // Import defineProps to access props
import emptyBookmark from '@/assets/event/bookmark_empty.png';
import filledBookmark from '@/assets/header/bookmark.png';

// Define reactive data for venues
const events = ref([]);
const venues = ref([]);

const { eventData } = await useFetch('https://secourse2024-675d60a0d98b.herokuapp.com/api

/getAllEvents');
console.log("data received: ", eventData.value);
events.value = eventData.value;

// Fetch venues data using useFetch function after component is mounted
const { data } = await useFetch('https://secourse2024-675d60a0d98b.herokuapp.com/api

/getAllVenues');
console.log("data received: ", data.value);
venues.value = data.value;

// Method to get venue name based on venueID
const getVenueName = (venueID) => {

  for (const venue of venues.value) {
    console.log(venue)
    if (venue.id === venueID) {
      return venue.name;
    }
  }
  return 'Unknown Venue';
};

// Method to toggle the bookmark state
const toggleBookmark = (event) => {
  console.log('button clicked')
  event.bookmarked = !event.bookmarked; // Toggle the bookmarked state
};

// Method to determine the bookmark image source based on the bookmarked state
const bookmarkSrc = (event) => {
  return event.bookmarked ? filledBookmark : emptyBookmark;
};
</script>

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
