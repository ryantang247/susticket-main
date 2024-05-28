<template>
  <Header/>
  <div v-if="isLoading" class="loading-overlay">
    <!-- <p>Loading...</p> -->
  </div>
  <div class="event-desc-container">
      <div class="header">
          <img src="/assets/header/backarrow.png" class="back" @click="goBack">
      </div>
      <div class="left">
          <!-- <img class="event-img" src="/assets/events/event6.jpg"> -->
          
              <el-carousel height="250px" width="">
                <el-carousel-item v-for="item in eventData.thumbnails" :key="item">
                  <img class="carousel-image" :src="item" alt="Event Thumbnail"/>
                </el-carousel-item>
              </el-carousel>
          
          <!-- <el-button type="danger" round class="status">{{eventData.status}}</el-button> -->
          <el-button type="warning" round class="status" v-if="eventData.status == 0">on sale</el-button>
          <el-button type="success" round class="status" v-if="eventData.status == 1">on going</el-button>
          <el-button type="info" round class="status" v-if="eventData.status == 2">ended</el-button>

          <div class="event-desc">
              <h1>{{eventData.title}}</h1>
              <p v-if="eventData.status == 2"> {{eventData.rate}} ratings | {{eventData.soldTickets}} solds</p>
              <h5>Date & time</h5>
              <div class="date-loc">
                  <img src="/assets/header/calendar.png">
                  <h6>{{formatDate(eventData.dateTime)}}</h6>
              </div>

              <h5>Location</h5>
              <div class="date-loc">
                  <img src="/assets/event/point.png">
                  <h6>{{eventData.location}}</h6>
              </div>
              
              <h5>Price</h5>
              <div class="date-loc">
                <el-row :gutter="10" v-if="pricing && pricing.length">
                  <el-col :span="1.6" v-for="(item, index) in pricing" :key="index">
                    <el-tag :type="tagTypes[index]">
                      <h2 v-if="item.price > 0">{{ item.category }}: ¥{{ item.price }}</h2>
                      <h2 v-else>{{ item.category }}: Free</h2>
                    </el-tag>
                  </el-col>
                </el-row>
                <div v-else>
                  <!-- <h3 color="red">Free</h3> -->
                  <el-button type="danger" plain><h2>Free</h2></el-button>
                </div>
              </div>

              <div class="desc">
                  <h5>About this event</h5>
                  <div class="desc-box">
                      <p>{{eventData.description}}</p>
                  </div>
                  
                  <h6>Contact person: <span>{{ eventData.contactName }}</span> - {{ eventData.contact }}</h6>
              </div>
              
          </div>

            <div class="down">
              <div v-if="userStat == 'success' && currentEvent" class="button-action">
                <!-- <h2>Price: <span>{{ '¥' + displayPrice(event.price)}}</span></h2> -->
              
                <!-- <div class="add-cart-btn" @click="addToCart()">+Add to Cart</div> -->
                  <div class="get-ticket-btn">
                    <nuxt-link :to="`/booking/${currentEvent}`">
                      <p>Get Ticket</p>
                    </nuxt-link>
                  </div>
                
                  <div class="share-bookmark">
                    <!-- <img :src="bookmarkSrc(currentEvent)" @click="toggleBookmark(currentEvent)"> -->
                    <h6>Bookmark</h6>
                    <img src="/assets/event/linkshare.png" @click="copyLink(event)">
                    <h6>Copy link</h6>
                  </div>
              </div>
              
          </div>
            
      </div>
  </div>

  <div v-if="eventData.videolink" class="live-stream">
    <h2>Live Streaming</h2>
    <iframe width="560" height="315" :src="transformToEmbedUrl(eventData.videolink)" frameborder="0" allowfullscreen></iframe>
  </div>

  <div class="comments-box">
      <h2>Comments</h2>
      <!-- <el-button type="warning" class="comment-btn" @click="goToCommentPage">Give Comment</el-button> -->
      <div class="comment" v-for="(comment, index) in comments" :key="index">
        <!-- <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            :value="comment.star"
            score-template="{ value } points"
        /> -->
        <p>
          <strong>{{ comment.user }}</strong>: {{ comment.text }}
        </p>
        <img v-if="comment.image" :src="comment.image" alt="User Comment">
        <video v-if="comment.video" controls>
          <source :src="comment.video" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <el-divider/>
      </div>
      <el-button v-if="userStat == 'success'" type="warning" class="action-btn" @click="goToCommentPage">Add Comment</el-button>
  </div>
  <Footer/>
  <CustomerService/>
    
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ElNotification } from 'element-plus'

import Header from '@/components/homepage/Header.vue';
import Footer from '@/components/homepage/Footer.vue';
import CustomerService from '@/components/CustomerService.vue';
import { useRouter, useRoute } from 'vue-router';
import { getEvents } from '@/api';
import emptyBookmark from '@/assets/event/bookmark.png';
import filledBookmark from '@/assets/event/bookmark (1).png';

const bookmarkEvents = ref({});
const event = ref([]);
const tagTypes=['success', 'info', 'warning', 'danger'];
const router = useRouter();
const route = useRoute();
const currentEvent = ref(route.params.id);
const value = ref(0);
const pricing = ref([]);
const isLoading = ref(true);
const eventData = ref({
  thumbnails: [],
  contactName: '',
  contact: '',
  status: '',
  rate: 0,
  soldTickets: null,
  title: '',
  dateTime: '',
  location: '',
  price: '',
  description: '',
  videolink: null,
  comments: [
  ]

});

let name = '';
let userStat = null;
onMounted(() => {
  if (process.client) {
    console.log("EVENT DESC");
    const status = localStorage.getItem("Status");
    userStat = status;
    console.log("status : ");
    console.log(status);

    // if (status) {
    //   name = localStorage.getItem("Username");
    // }
  }
});

function transformToEmbedUrl(youtubeUrl) {
  // Extract the video ID from the URL
  const url = new URL(youtubeUrl);
  const videoId = url.searchParams.get('v');

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return embedUrl;
}

const addToCart = async () => {
  try {
    // Send a POST request to the API endpoint
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/putToMyCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId: currentEvent.value,
        price: eventData.value.price 
      })
    });

    
    if (response.ok) {
      
      ElNotification.success({
        title: 'Success',
        message: 'Event has been added to your cart',
        offset: 100
      });
    } else {
      
      ElNotification.error({
        title: 'Error',
        message: 'Failed to add event to cart. Please try again later.',
        offset: 100
      });
    }
  } catch (error) {
    
    console.error('Error adding event to cart:', error);
    ElNotification.error({
      title: 'Error',
      message: 'Error adding event to cart.'+error,
      offset: 100
    });
  }
};


const copyLink = (event) => {
    /**
 * AI-generated-content
 * tool: Copilot
 * version: latest
 * usage: copy event link
 * I slightly adapt the generated code by modifying the event path
 */
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
      message: "Failed to copy link" + err,
      offset: 100,
    });
  });
};


const goBack = () => {
  router.push('/');
};

const goToCommentPage = () => {
  router.push('/events/giveComment/'+route.params.id);
};

onMounted(async () => {
    isLoading.value = true;  
    try {
        const eventDataResponse = await getEvents(route.params.id);
        if (eventDataResponse.eventData) {
            event.value = eventDataResponse;
            pricing.value = eventDataResponse.pricing;
            Object.assign(eventData.value, eventDataResponse.eventData);
            eventData.value.location = eventDataResponse.eventData.venue;
        } else {
            console.error('Failed to load event data:', eventDataResponse);
        }
    } catch (error) {
        console.error('Error fetching event data:', error);
        ElNotification.error({
          title: 'Error',
          message: 'Error fetching event data.'+error,
          offset: 100
        });
    } finally {
        isLoading.value = false; 
    }
});

onMounted(async () => {
  // const fetchEventComments = async (eventId) => {
  try {
    // Call your API function to fetch event comments
    const comments = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getEventComment/'+route.params.id);
    // Handle the fetched comments as needed
    comments.value = comments;
    console.log(comments);
  } catch (error) {
    console.error('Error fetching event comments:', error);
  }
});


function formatDate(dateString) {
    /**
 * AI-generated-content
 * tool: Copilot
 * version: latest
 * usage: format date in readable
 */
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '').toUpperCase();

  return `${formattedDate} | ${time} BJT`;
}


// const bookmarkSrc = (event) =>  {
//   return event.value.bookmarked ? filledBookmark : emptyBookmark;
// };
// const toggleBookmark = async (event) => {
//   console.log('button clicked');

//   if(bookmarkEvents.value.hasOwnProperty(event.id)){

//     if(!bookmarkEvents.value[event.id]){
//       try {
//         const bookmarkResponse = await axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/bookmarkThisEvent',
//             { eventId: event.id },
//             {//AxiosRequestConfig parameter
//             withCredentials: true //correct
//         } );
//         console.log(bookmarkResponse);
//         bookmarkEvents.value[event.id] = true;
//         ElNotification.success({
//           title: 'Copied',
//           message: "Event's successfully bookmarked!",
//           offset: 100,
//         });
//       } catch (error) {
//         // Handle the error
//         console.error('Error occurred while bookmarking the event:', error);
//         // Optionally, you can also notify the user about the error
//         ElNotification.error({
//           title: 'Error',
//           message: `Failed to bookmark the event. Please try again later. ${error}`,
//           offset: 100,
//         });
//       }

//     } else {
//       try {
//         const bookmarkResponse = await axios.delete('https://secourse2024-675d60a0d98b.herokuapp.com/api/deleteThisEventBookmark', {
//           data: {eventId: event.id},
//         }, {
//           //AxiosRequestConfig parameter
//           withCredentials: true //correct
//         }
//         );
//         console.log(bookmarkResponse)
//         bookmarkEvents.value[event.id] = false
//         ElNotification.success({
//           title: 'Copied',
//           message: "Event's successfully removed from bookmark!",
//           offset: 100,
//         });

//       } catch(error){
//         console.error('Error occurred while bookmarking the event:', error);
//         // Optionally, you can also notify the user about the error
//         ElNotification.error({
//           title: 'Error',
//           message: `Failed to delete bookmark. Please try again later. ${error}`,
//           offset: 100,
//         });
//       }
//     }

//   }

//   event.bookmarked = !event.bookmarked; // Toggle the bookmarked state
// };
</script>


<style scoped>
  *{
      font-family: sans-serif;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);  /* Semi-transparent white */
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    color: #333;
  }
  
  .loading-overlay::before {
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
  
  .loading-overlay-text {
    z-index: 1;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bold;
    text-shadow: 0px 0px 10px rgba(0,0,0,0.5); /* Soft shadow for text */
  }
  .event-desc-container{
      width: 50%;
      margin: 0 auto;
      border: #ccc 1px solid;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
      padding: 20px;
      margin-top: 50px;
  }
  .header {
      text-align: left;
      display: flex;
      align-items: center; 
      margin-bottom: 20px;
  }
  .left{
      border: #6DC9C8 1px;
  }
  
  .back{
      width: 25px;
      height: 25px;
  }
  .back:hover{
      background-color: #ccc;
      border-radius: 50%;
  }
  .carousel-image{
    height: 20%;
  }
  .carousel-image{
      width: 100%;
      height: 700px;
      object-fit: cover;
      margin-bottom: 10px;
  }
  .date-loc img{
      width: 25px;
      height: 25px;
  }
  h5{
      font-size: 25px;
      margin-bottom: 0;
  }
  h6{
      font-size: 20px;
      margin-top: 0;
  }
  h1, h5, h6 {
      margin: 5px;
      padding: 0;
  }
  h1{
    font-size: 50px;
      margin-bottom: 40px;
  }
  .date-loc{
      position: relative;
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
  }
  .button-action{
      width: 300px;
      height: 200px;
      border-radius: 10px;
      border: 1px solid #6DC9C8; 
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center; 
  }
  
  .down{
    display: flex;
    justify-content: right;
  }
  
 .get-ticket-btn{
      background-color: #284949;
      width: 250px;
      height: 50px;
      border-radius: 10px;
      margin-bottom: 5px;
      font-size: 20px;
      color: #fff;
      display: flex; 
      justify-content: center; 
      align-items: center; 
      text-align: center; 
      text-decoration: none;
  }

  .get-ticket-btn{
      background-color: #284949;
      border: #284949 solid 2px;
      text-decoration: none;
  }
  .get-ticket-btn a{
    text-decoration: none;
    color: #fff;
  }
  .get-ticket-btn:hover{
      background-color: #fff;
      color: #000;
      cursor: pointer;
  }
  .get-ticket-btn a:hover{
    color: #000;
  }
  .desc{
      margin-top: 40px;
  }
  .desc h6{
      font-size: 16px;
  }
  .share-bookmark{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
  }
  .share-bookmark img{
      width: 30px;
      height: 30px;
  }
  .share-bookmark img:hover{
      background-color: #ccc;
      border-radius: 50%;
  }
  .share-bookmark h6{
      font-size: 14px;
  }
  .desc-box{
      padding: 20px;
      border: 1px solid #ccc;
      box-shadow: #ccc;
  }

  .fixed-size-tag {
    width: 100px; 
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .comments-box{
    width: 50%;
    height: 200px;
    margin: 0 auto;
    border: #ccc 1px solid;
    padding: 20px;
    margin-bottom: 50px;
}
.live-stream{
  width: 50%;
  height: 400px;
  margin: 0 auto;
  border: #ccc 1px solid;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  padding: 20px;
}

@media only screen and (max-width: 2880px){
  .event-desc-container{
    width: 70%;
  }
  .live-stream{
    width: 70%;
  }
  .comments-box{
    width: 70%;
  }
}

@media only screen and (max-width: 830px) {
  .event-desc-container{
    width: 90%;
  }
  .live-stream{
    width: 90%;
  }
  .comments-box{
    width: 90%;
  }
}

</style>