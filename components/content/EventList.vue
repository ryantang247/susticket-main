<template>
  <div class="event-list">
    <div v-for="event in validEvents" :key="event.id" class="event-card">
      <div v-if="event">
        <NuxtLink style="text-decoration: none; color: inherit;" :to="`/events/${event.id}`">
          <img :src="event.thumbnail" alt="event-image" class="event-image" style="cursor:pointer;">

        <el-button type="warning" round class="status" v-if="event.status == 0">on sale</el-button>
        <el-button type="success" round class="status" v-if="event.status == 1">on going</el-button>
        <el-button type="info" round class="status" v-if="event.status == 2">ended</el-button>
        <h1>{{ event.title }}</h1>
        </NuxtLink>

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
import { ref, onMounted, toRefs } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';
import emptyBookmark from '@/assets/event/bookmark_empty.png';
import filledBookmark from '@/assets/header/bookmark.png';
import axios from 'axios';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
});
const { events } = toRefs(props);
const bookmarkEvents = ref({});
const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanMd = breakpoints.smaller('sm');

let userStat = null;

onMounted(() => {
  if (process.client) {
    const status = localStorage.getItem("Status");
    userStat = status;
  }
});

const validEvents = computed(() => events.value.filter(event => event !== undefined && event !== null));

const toggleBookmark = async (event) => {
  if (bookmarkEvents.value.hasOwnProperty(event.id)) {
    if (!bookmarkEvents.value[event.id]) {
      try {
        const bookmarkResponse = await axios.post(
          'https://secourse2024-675d60a0d98b.herokuapp.com/api/bookmarkThisEvent',
          { eventId: event.id },
          { withCredentials: true }
        );
        bookmarkEvents.value[event.id] = true;
        ElNotification.success({
          title: 'Copied',
          message: "Event's successfully bookmarked!",
          offset: 100,
        });
      } catch (error) {
        ElNotification.error({
          title: 'Error',
          message: `Failed to bookmark the event. Please try again later. ${error}`,
          offset: 100,
        });
      }
    } else {
      try {
        const bookmarkResponse = await axios.delete(
          'https://secourse2024-675d60a0d98b.herokuapp.com/api/deleteThisEventBookmark',
          { data: { eventId: event.id }, withCredentials: true }
        );
        bookmarkEvents.value[event.id] = false;
        ElNotification.success({
          title: 'Copied',
          message: "Event's successfully removed from bookmark!",
          offset: 100,
        });
      } catch (error) {
        ElNotification.error({
          title: 'Error',
          message: `Failed to delete bookmark. Please try again later. ${error}`,
          offset: 100,
        });
      }
    }
  }

  event.bookmarked = !event.bookmarked;
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
    ElNotification.error({
      title: 'Error',
      message: `Failed to copy. ${err}`,
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
  // const loading = ElLoading.service({
  //   lock: true,
  //   text: 'Loading...',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // });
  try {
    const venueResponse = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllVenues');
    if (venueResponse.ok) {
      const venueData = await venueResponse.json();
      venues.value = venueData;

      const eventIDMap = {};
      const eventsData = await events.value;
      eventsData.forEach(event => {
        if (event) eventIDMap[event.id] = false;
      });

      const bookmarkResponse = await axios.get(
        'https://secourse2024-675d60a0d98b.herokuapp.com/api/getBookmarkedEvents',
        { withCredentials: true }
      );
      if (bookmarkResponse) {
        bookmarkResponse.data.forEach(item => {
          if (eventIDMap.hasOwnProperty(item.eventId)) {
            eventIDMap[item.eventId] = true;
          }
        });
        bookmarkEvents.value = eventIDMap;
      } else {
        ElNotification.error({
          title: 'Error',
          message: "Error fetching bookmarks",
          offset: 100,
        });
      }
      ElNotification.success({
        title: 'Success',
        message: "Successfully fetched venues!",
        offset: 100,
      });
    } else {
      ElNotification.error({
        title: 'Error',
        message: "Error fetching venues",
        offset: 100,
      });
    }
  } catch (error) {
    ElNotification.error({
      title: 'Error',
      message: `Error fetching data. ${error}`,
      offset: 100,
    });
  } finally {
    loading.close();
  }
});

function getVenueName(venueId) {
  const venue = venues.value.find(v => v.id === venueId);
  return venue ? venue.name : 'Unknown venue';
}

function displayPrice(priceJson) {
  let prices;
  try {
    prices = JSON.parse(priceJson);
  } catch (e) {
    return;
  }

  if (!prices || !Array.isArray(prices) || prices.length === 0) {
    return `Free`;
  }

  prices = prices.map(price => ({
    ...price,
    price: Number(price.price)
  }));

  prices.sort((a, b) => a.price - b.price);

  const allPricesAreSame = prices.every(price => price.price === prices[0].price);
  if (allPricesAreSame) {
    return prices[0].price === 0 ? `Free` : `${prices[0].price.toFixed(2)}`;
  }

  const lowestPrice = prices[0].price;
  const highestPrice = prices[prices.length - 1].price;

  return lowestPrice === highestPrice ? `${lowestPrice.toFixed(2)}` : `${lowestPrice.toFixed(2)}-${highestPrice.toFixed(2)}`;
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