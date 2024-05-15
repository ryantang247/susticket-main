<template>
    <div class="attraction-details">
      <Header/>
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3"> Event Details </span>
        </template>
      </el-page-header>
      
      <el-main v-loading="isLoading">
        <div class="block text-center">
          <el-carousel height="250px">
            <el-carousel-item v-for="item in eventData.thumbnails" :key="item">
              <img class="carousel-image" :src="item" alt="Event Thumbnail"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <p></p>
        <div class="details">
          <div class="status">
            <div class="left-container">
              <el-tag type="primary">{{ eventData.status }}</el-tag>
            </div>
            <div class="right-container">
              <span>Rate: {{ eventData.rate }}</span>
              <el-divider direction="vertical" />
              <span>Sold Tickets: {{ eventData.soldTickets }}</span>
            </div>
          </div>
          <h1 class="title">{{ eventData.title }}
            <img src="/assets/event/share.png" class="share-icon" @click="copyLink(currentEvent)"/>  
            <!-- <img :src="bookmarkSrc(currentEvent)" @click="toggleBookmark(currentEvent)" class="bookmark-icon"/> -->      
          </h1>
          <div v-if="currentEvent" class="book" >
            <nuxt-link :to="`/booking/${currentEvent}`">
              <el-button>Purchase</el-button>
            </nuxt-link>
            <el-button>Add to Cart<img src="/assets/event/cart.png" class="cart-icon" @click="addToCart()"/> </el-button>
          </div>
          <div class="event-details">
            <p>Date & Time: {{ eventData.dateTime }}</p>
            <!-- <p>Duration: {{ event.endDate-event.startDate }}</p> -->
            <p>Location: {{ eventData.location }}</p>
            <!-- <span>Venue Id: </span>
            <el-tag size="small">School</el-tag> -->
            <el-row :gutter="10" v-if="pricing">
              <el-col :span="1.6">Price:</el-col>
              <el-col :span="1.6" v-for="(item, index) in pricing" :key="index" >
                <el-tag :type="tagTypes[index]">{{ item.category }}: {{ item.price }}元</el-tag>
              </el-col>
            </el-row>
  
            <p>Description: {{ eventData.description }}</p>
          </div>
        </div>
  
        <el-card>
          <template #header>
            <div class="comments">
              <h3>Comments</h3>
            </div>
          </template>
          <div class="comment" v-for="(comment, index) in comments" :key="index">
            <!-- <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                :value="comment.star"
                score-template="{ value } points"
            /> -->
            <p><strong>{{ comment.user }}</strong>: {{ comment.text }}</p>
            <img v-if="comment.image" :src="comment.image" alt="User Comment">
            <video v-if="comment.video" controls>
              <source :src="comment.video" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <el-divider/>
          </div>
          <el-button type="warning" class="action-btn" @click="goToCommentPage">Add Comment</el-button>
        </el-card>
        <p>Contact Person: <span>{{ eventData.contactName }}</span> - {{ eventData.contact }}</p>
      </el-main>
  
      <CustomerService/>
      <Footer/>
  
    </div>
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
    comments: [
    ]
  });
  // import { postComment, getEventComments } from '@/api'; // Import your API functions
  
  // Add methods for posting comment and getting event comments
  // Method to add the event to the cart
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
          price: eventData.value.price // Adjust this accordingly based on how you get the price
        })
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Notify the user that the event has been added to the cart
        ElNotification.success({
          title: 'Success',
          message: 'Event has been added to your cart',
          offset: 100
        });
      } else {
        // Handle the error if the request fails
        ElNotification.error({
          title: 'Error',
          message: 'Failed to add event to cart. Please try again later.',
          offset: 100
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error adding event to cart:', error);
      ElNotification.error({
        title: 'Error',
        message: 'An unexpected error occurred. Please try again later.',
        offset: 100
      });
    }
  };
  
  
  const copyLink = (event) => {
      /**
 * AI-generated-content
 * tool: Copilot
 * version: latest
 * usage: copy the event link
 * I slightly adapt the generated code by modifying event path
 */
    navigator.clipboard.writeText(event.link).then(() => {
      ElNotification.success({
        title: 'Copied',
        message: "Event's link is copied to the clipboard",
        offset: 100,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };
  
  const toggleBookmark = (event) =>  {
    console.log('button clicked');
    event.value.bookmarked = !event.value.bookmarked; // Toggle the bookmarked state
  };
  
  const bookmarkSrc = (event) =>  {
    return event.value.bookmarked ? filledBookmark : emptyBookmark;
  };
  
  const goBack = () => {
    router.push('/');
  };
  
  const goToCommentPage = () => {
    router.push('/events/giveComment/'+route.params.id);
  };
  
  onMounted(async () => {
    const eventDataResponse = await getEvents(route.params.id);
    if (eventDataResponse.eventData) {
      event.value = eventDataResponse;
      pricing.value = eventDataResponse.pricing;
      Object.assign(eventData.value, eventDataResponse.eventData);
      eventData.value.location = eventDataResponse.eventData.venue;
      isLoading.value = false;
  
    }else {
      console.log(eventDataResponse)
    }
    // const fetchEventComments = async (eventId) => {
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
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '').toUpperCase();

  return `${formattedDate} | ${time} BJT`;
}
  </script>
  
  <style scoped>
  /* Styles for the main container */
  .attraction-details {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  /* Styles for the header */
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .back-btn, .close-btn {
    padding: 5px 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
  /* Styles for the main content */
  .main-content {
    display: flex;
    flex-wrap: wrap;
  }
  
  .thumbnail {
    flex: 0 0 50%;
    margin-right: 20px;
  }
  
  .details {
    flex: 0 0 50%;
  }
  
  /* Styles for the status section */
  .status {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .right-container {
    align-content: left;
  }
  /*.title {
    justify-content: space-between;
  }*/
  
  /* Styles for the comments section */
  .comments {
    margin-top: 20px;
  }
  
  .comment {
    margin-bottom: 10px;
  }
  
  .comment img, .comment video {
    max-width: 100%;
    margin-top: 10px;
  }
  .book{
   display: flex; 
   justify-content: flex-end;
  }
  /* Styles for the footer   justify-content: right; */
  .book el-button {
    background-color: #007bff;
    color: #fff;
    margin-right: 100px;
    width: 200px;
    height: 200px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
    border-radius: 5px; /* Rounded corners */
  
  }
  
  .book el-button:hover {
    background-color: #0056b3;
    width: 200%;
    height: 200%;
  }
  
  /* Styles for the thumbnail */
  .el-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  
  /* Additional styles for the page header */
  .text-large {
    font-size: 1.5rem;
  }
  
  .font-600 {
    font-weight: 600;
  }
  
  .mr-3 {
    margin-right: 0.75rem;
  }
  
  /* Additional styles for the share and bookmark icons   margin-left: 10px;*/
  .share, .bookmark {
    cursor: pointer;
  }
  .contact-info {
    margin-top: 20px;
  }
  .contact-info span {
    margin-right: 10px;
  }
  /*
  .bookmark, .share {
    width: 10%;
  }
  .bookmark:hover, .share:hover{
    background-color: #ccc;
    border-radius: 50%;
  }*/
  </style>
  