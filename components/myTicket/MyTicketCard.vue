<template>
  <div class="myticket-card">
    <div v-for="ticket in transactions" :key="ticket.id">
    <div  v-if="ticket.event" class="event-card">
      <aside  class="left">
        <h1>{{ ticket.event.title }}</h1>
        <p>{{ formatDate(ticket.event.startDate) }}</p>
        <p>{{ getVenueName(ticket.event.venueId) }}</p>
        <!-- <p class="seat"><b>{{ticket.event.seat}}</b></p> -->
        <h2>{{ '¥' + ticket.price }}</h2>
         <!-- <p class="status">{{ ticket.status }}</p>  -->
        <!-- -1 refund 0 kayaknya sih cart 1 paid
        2 mungkin event start -->

        <!-- <el-button type="danger" round class="status">Status</el-button> -->
        <p class="available">{{ ticket.event.available }}</p>
      </aside>
      <aside v-if="ticket.event" class="right">
        <div class="image-container">
          <img :src="ticket.event.thumbnail" alt="event-image" class="event-image">
        </div>
        <div class="bookmark-share">
          <el-button type="warning" class="action-btn" @click="goToReview(ticket.eventId)">Give Comment</el-button>
          <img src="/assets/event/linkshare.png" class="share" @click="copyLink(ticket)"> 
        </div>
      </aside>
    </div>
    </div>
  </div>
  
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ElNotification } from 'element-plus';

  defineProps(['transactions','events']);

  const router = useRouter();
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

const goToReview = (eventId) => {
  router.push(`/events/giveComment/${eventId}`);
};
const copyLink = (event) => {
  navigator.clipboard.writeText(event.link).then(() => {
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
/**
 * AI-generated-content
 * tool: ChatGPT
 * version: 3.5
 * usage: ask gpt for debug the styling
 * copy the code from its response ad modified according the desired style
 */

  </script>
  
  <style scoped>

.action-btn{
  width: 150px;
}
.myticket-card {
  font-family: sans-serif;
  margin-top: 20px;
}
h1{
  font-size: 30px;
}
.event-card {
  display: flex;
  justify-content: space-between; /* Align items to opposite ends */
  width: 70%;
  padding: 0px 20px;
  border-radius: 10px;
  border: 2px solid #6DC9C8;
  margin-bottom: 15px;
  margin-left: 60px;
}

.left{
  float: left;
}
.right{
  float:right;
  justify-content: center;
  align-items: center;
}

.available{
  font-size: 80%;
  opacity: 0.7;
}

.event-image {
  width: 250px;
  height: 150px;
  object-fit: cover;
  margin-top: 30px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;

}

.bookmark-share {
  display: flex;
  align-items: center;
}
.bookmark-share img{
  width: 30px;
  height: 30px;
  margin: 5px;

}
.bookmark-share img:hover{
  background-color: rgb(189,189,189);
  border-radius: 50%;
}

  </style>
  