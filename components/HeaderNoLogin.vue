<template>
    <header class="header">
      <div class="logo">
        <img src="~/assets/header/brand_logo.png" alt="logo" @click="goToHomepage" style="cursor: pointer">
      </div>
      <div class="search-box">
        <a href="#" class="search-icon-wrapper">
          <img src="~/assets/header/search.png" class="search-icon" alt="Search" @click="searchEvent"/>
        </a>
        <input type="text" class="search-input" placeholder="Search event..." v-model="searchQuery" @keyup.enter="searchEvent"/>
      </div>
      
      <div class="user-profile">
        <img src="assets\logo.png" alt="User Profile" @click="toggleProfileBox" />
      </div>
      <Profile :userProfile="userProfile" :isVisible="showProfileBox" />
    </header>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Profile from '/components/homepage/Profile.vue';
  

  
  
  const router = useRouter();
  
  const searchQuery = ref('');
  
  const searchEvent = async () => {
    if (searchQuery.value.trim()) {
      // Redirect to the found event page with the search query
      router.push({ path: '/foundEvent/foundEventPage', query: { query: searchQuery.value.trim() } });
    }
  };
  
  
 
  function goToHomepage(){
    router.push('/')
  }
  
  // ...other methods for navigation
  </script>
  
  <style scoped>
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #6DC9C8; /* Adjust the color to match the image */
    align-items: center;
  }
  
  .logo {
    font-size: 50px;
    font-weight: bold;
    color: #FFAA00; /* Adjust the color to match the image */
    align-items: center;
  }
  .logo img{
    height: 45px;
    object-fit: cover;
    align-items: center;
    margin-top: 10px;
    margin-left: 30px;
  }
  
  .cart-button,
  .ticket-button,
  .bookmark-button,
  .calendar-button {
    display: flex;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 70%;
    gap: 5px;
  }
  .cart-button:hover,
  .ticket-button:hover,
  .bookmark-button:hover,
  .calendar-button:hover{
    opacity: 100%;
  }
  
  .user-profile img {
    border-radius: 50%; /* Make the image round */
    width: 20%; /* Adjust size as necessary */
    height: 20%; /* Adjust size as necessary */
    margin-right: 10px;
    cursor: pointer;
  }
  .user-profile:hover img{
    transform: scale(1.05);
  }
  
  .image-container-cart,
  .image-container-ticket,
  .image-container-bookmark,
  .image-container-calendar{
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .image-container-cart img,
  .image-container-ticket img,
  .image-container-bookmark img,
  .image-container-calendar img{
    width: 45px;
    height: 45px;
    opacity: 70%;
  }
  .search-box {
    position: relative;
    display: inline-block;
    width: 25%;
  }
  
  .search-icon-wrapper {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  
  .search-icon {
    width: 20px; /* Adjust icon size as needed */
    height: 20px;
  }
  
  .search-input {
    padding: 8px 30px; /* Adjust padding to ensure text doesn't overlap with icon */
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px; /* Adjust font size as needed */
    outline: none; /* Remove outline when input is focused */
  }
  
  .search-input::placeholder {
    color: #999; /* Adjust placeholder color as needed */
  }
  
  
  </style>
  