<template>
  <div class="event-list">
      <div v-for="event in events" :key="event.id" class="event-card" >
        <div>
        <img :src="event.thumbnail" alt="event-image" class="event-image" style="cursor:pointer;" @click="this.$router.push({ path: `/events/${event.id}`, replace: true })">
        <el-button type="danger" round class="status">{{event.status}}</el-button>
        <h1>{{ event.title }}</h1>
        <!-- <p>{{ event.startDate }}</p> -->
        <p>{{ formatDate(event.startDate) }}</p> <!-- Use formatDate here -->
        <!-- Display venue name corresponding to the venueID -->
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

<!--    <div v-else>-->
<!--      <div v-for="event in events" :key="event.id"  >-->
<!--        <img :src="event.thumbnail" alt="event-image" class="event-image" style="cursor:pointer;" @click="this.$router.push({ path: `/events/${event.id}`, replace: true })">-->
<!--        <el-button type="danger" round class="status">{{event.status}}</el-button>-->
<!--        <h1>{{ event.title }}</h1>-->
<!--        &lt;!&ndash; <p>{{ event.startDate }}</p> &ndash;&gt;-->
<!--        <p>{{ formatDate(event.startDate) }}</p> &lt;!&ndash; Use formatDate here &ndash;&gt;-->
<!--        &lt;!&ndash; Display venue name corresponding to the venueID &ndash;&gt;-->
<!--        <p>{{ getVenueName(event.venueId) }}</p>-->
<!--        <h2>{{ '¥' + displayPrice(event.price) }}</h2>-->
<!--        <p class="available">{{ event.available }}</p>-->
<!--        <div class="bookmark-share">-->
<!--          &lt;!&ndash; <img src="/assets/header/bookmark.png" class="bookmark"> &ndash;&gt;-->
<!--          <img :src="bookmarkSrc(event)" @click="toggleBookmark(event)" class="bookmark">-->
<!--          <img src="/assets/event/linkshare.png" class="share" @click="copyLink(event)">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script setup>
import { ref, onMounted,toRefs  } from 'vue';
import { ElNotification } from 'element-plus'
import emptyBookmark from '@/assets/event/bookmark_empty.png';
import filledBookmark from '@/assets/header/bookmark.png';
import axios from 'axios';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps(['events']);
const { events } = toRefs(props);

const bookmarkEvents = ref({})


const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanMd = breakpoints.smaller('sm') // only smaller than lg

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

    }

  } else {
    console.error('Failed to fetch venues:', venueResponse.statusText);
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
 */  console.log("Parsed ", priceJson);
  
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
  justify-content:left; /* Adjust alignment between items */
  margin-left: 5%;
  font-family: sans-serif;
  overflow-y: scroll;

}

.event-card {
  width: calc(20% - 20px); /* Adjust card width to fit 6 cards per row */
  margin: 10px;
  padding: 10px;
  border: 1px solid #6DC9C8;
  border-radius: 10px;
  transition: border 0.3s;
}

.event-card:hover{
  border: 2px solid #6DC9C8;
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