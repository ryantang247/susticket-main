<template>
  <div class="myticket-card">
    <div v-for="ticket in transactions" :key="ticket.id" class="event-card">
      <aside class="left">
        <h1>{{ ticket.event[0].title }}</h1>
        <p>{{ ticket.event[0].startDate + ' | ' + ticket.event[0].endDate }}</p>
        <p>{{ ticket.event[0].venueId }}</p>
        <p class="seat"><b>{{ticket.event[0].seat}}</b></p>
        <h2>{{ '¥' + ticket.price }}</h2>
         <!-- <p class="status">{{ ticket.status }}</p>  -->
        <!-- -1 refund 0 kayaknya sih cart 1 paid
        2 mungkin event start -->

        <el-button type="danger" round class="status">Status</el-button>
        <p class="available">{{ ticket.event.available }}</p>
      </aside>
      <aside class="right">
        <div class="image-container">
          <img :src="ticket.event[0].thumbnail" alt="event-image" class="event-image">
        </div>
        <div class="bookmark-share">
          <el-button type="warning" class="action-btn" @click="goToReview">Next Action</el-button>
          <img src="/assets/event/linkshare.png" class="share" @click="copyLink(ticket)"> 
        </div>
      </aside>
    </div>
    <div v-for="event in events" :key="event.id" class="event-card">
      <aside class="left">
          <h1>{{ event.title }}</h1>
          <p>{{ event.date + ' | ' + event.time }}</p>
          <p>{{ event.location }}</p>
          <p class="seat"><b>{{event.seat}}</b></p>
          <h2>{{ '¥' + event.price }}</h2>
          <el-button type="danger" round class="status">Status</el-button>
          <p class="available">{{ event.available }}</p>
      </aside>
      <aside class="right">
        <div class="image-container">
          <img src="/assets/events/event6.jpg" alt="event-image" class="event-image">
        </div>
        <div class="bookmark-share">
          <el-button type="warning" class="action-btn" @click="goToReview">Next Action</el-button>
          <img src="/assets/event/linkshare.png" class="share" @click="copyLink(event)"> 
        </div>
      </aside>
    </div>
  </div>
  
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  defineProps(['transactions','events']);

  const router = useRouter();

  import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

const goToReview = () => {
  router.push('/giveRating/reviewRatingPage');
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
  });
};
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

.event-details {
  flex: 1; /* Take remaining space */
  float: left;
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
  