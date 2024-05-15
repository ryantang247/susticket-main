<template>
    <transition name="fade">
      <div class="notif-box" v-if="isVisible">
        
          <div v-if="notifications" v-for="(notif, index) in notifications" :key="index" class="msg-box">
            <h3>{{notif.title}}</h3>
            <p>{{notif.description}}</p>
            <h6>{{ simplifyTimestamp(notif.updatedAt) }}</h6>
          </div>
        
      </div>
    </transition>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    props: {
      isVisible: Boolean
    },
    data() {
      return {
        // Hardcoded list of notifications
        notifications: [
          "Seminar by Prof Hao Qi starts in 1 hour. Be prepared!",
          "Seminar by Prof Hao Qi starts in 1 hour. Be prepared!",
          "Seminar by Prof Hao Qi starts in 1 hour. Be prepared!",

        ]
      }
    },
    mounted(){
      this.getNotification()
    },

    methods:{
      /**
       * AI-generated-content
       * tool: ChatGPT
       * version: latest
       * usage: Directly used it to convert time format
       */
      simplifyTimestamp(timestamp) {
        // Create a new Date object from the provided timestamp
        const date = new Date(timestamp);

        // Extract the date components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Construct the simplified timestamp format: YYYY-MM-DD HH:MM:SS
        const simplifiedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return simplifiedTimestamp;
      },
      getNotification(){
        axios.get(
            `https://secourse2024-675d60a0d98b.herokuapp.com/api/getNotifications`,

        )
        .then((response) => {
              // Check the response status
              const data = response.data;
              this.notifications = response.data
              console.log("Notifications ",data);

       }).catch((error) => {
          ElNotification.error({
            title: 'Error fetching notification',
            message: error,
            offset: 100,
          });
          console.error('Error booking seats:', error);
        });
      }
      }
    }
  </script>
  
  <style scoped>
 
  .notif-box {
    position: absolute;
    right: 20px;
    top: 70px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    border-radius: 8px;
    width: 500px;
    z-index: 100;
    align-items: center;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .msg-box{
    border: 1px solid #ccc;
    position: relative;
    padding-top: 0;
  }
  h5{
    font-size: 20px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  }
  h6 {
    font-size: 12px;
    position: absolute;
    top: 0;
    right: 0;
    color: #ccc;
    padding: 10px 15px;
    
  }
  </style>
  