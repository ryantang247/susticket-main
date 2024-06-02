<template>
    <div class="mycart-card">
      <div v-for="event in events" :key="event.id" class="event-card">
        <aside class="left">
            <aside class="check-box">
                <!-- <img src="/assets/header/ticked.png" class="checkbox"> -->
                <img :src="tickedSrc(event)" @click="toggleTicked(event)" class="checkbox">
            </aside>
            <aside class="desc">
                <h1>{{ event.event.title }}</h1>
                <p>{{ formatDate(event.event.startDate) }}</p>
                <p>{{ getVenueName(event.event.venueId) }}</p>
                <p class="seat"><b>{{event.seat}}</b></p>
                <h2>{{ '¥' + event.price }}</h2>
                <!-- <el-button type="danger" round class="status">{{event.event.status}}</el-button> -->
                <p class="available">{{ event.event.available }}</p>
            </aside>
        </aside>
        <aside class="right">
          <div class="image-container">
            <img src="/assets/events/event6.jpg" alt="event-image" class="event-image">
          </div>
          <div class="button-actions">
            <!-- <button class="next-action">Next actions</button> -->
            <!-- <img src="/assets/header/delete.png" class="delete"> -->
            <el-button type="danger" :icon="Delete" circle />
          </div>
        </aside>
  
      </div>
    </div>
    
    </template>
    
<script setup>
    import { ref } from 'vue';
    defineProps(['events']);
  
    import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
  } from '@element-plus/icons-vue'

import checkboxImage from '@/assets/header/checkbox.png';
import tickedImage from '@/assets/header/ticked.png';

const toggleTicked = (event) => {
    console.log(event.bookmarked);
  event.bookmarked = !event.bookmarked; // Toggle the bookmarked state
};

const tickedSrc = (event) => {
  return event.bookmarked ? tickedImage : checkboxImage;
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
      padding-top: 0px ;
      padding-bottom: 0px;
      padding-left: 10px;
      padding-right: 20px;
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
    .check-box{
        float: left;
        display: flex;
        width: 50px;
        height: 100%;
        align-items: center;
        align-content: center;
    }
    .check-box img{
        width: 30px;
    }
    .check-box img:hover{
        background-color: rgb(189,189,189);
        border-radius: 25%;
    }
    .desc{
        float: right;
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
    .next-action {
      margin: 10px;
      padding: 5px 25px;
      background-color: #FAA543;
      border: none; 
      border-radius: 5px;
      font-size: 12px;
    }
    .next-action:hover{
      background-color: #965c19;
    }
    .button-actions {
      display: flex;
      align-items: center;

    }
    .button-actions img{
      width: 30px;
      height: 30px;
      margin: 5px;
      display: flex-end;
  
    }
    .button-actions img:hover{
      background-color: rgb(189, 189, 189);
      border-radius: 50%;
    }
    
    </style>
    