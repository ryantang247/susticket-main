<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to generate a template for the menu bar/header, and modify it based on our navigation purpose
-->
<template>
  <div v-if="!smallerThanMd">
    <header  class="header">
      <div class="logo">
        <img src="~/assets/header/brand_logo.png" alt="logo" @click="goToHomepage" style="cursor: pointer">
      </div>
      <div class="right">
        <div v-if="loginStatus" class="nav-container">
          <div class="image-container-calendar" @click="goToCalendar">
            <img src="~/assets/header/calendar.png" alt="Image" class="image">
            <button class="calendar-button">Calendar</button>
          </div>
    
          <div class="image-container-bookmark" @click="goToBookmarks">
            <img src="~/assets/header/bookmark.png" alt="Image" class="image">
            <button class="bookmark-button">Bookmark</button>
          </div>
    
          <div class="image-container-ticket" @click="goToTickets">
            <img src="~/assets/header/ticket.png" alt="Image" class="image">
            <button class="ticket-button">My Tickets</button>
          </div>
    
          <div class="image-container-cart" @click="goToCart">
            <!-- <el-badge v-if="myCartCount !== 0" :value="myCartCount" class="item"></el-badge> -->
            <img src="~/assets/header/cart.png" alt="Image" class="image">
            <button class="cart-button">Cart</button>
          </div>      
    
          <div class="image-container-notif">
            <el-badge v-if="notificationsCount !== 0" :value="notificationsCount" class="item">
              <img src="~/assets/header/nontif.png" alt="Image" class="image" @click="toggleNotifBox">
            </el-badge>
            <NotifPopup :isVisible="showNotifBox" />
    
            <button class="notif-button" @click="toggleNotifBox">Notification</button>
  
          </div>
        </div>      
          
        <div class="user-profile" @click="toggleProfileBox">
          <img v-if="loginStatus" alt="~/assets/header/profile_nologin.png" :src="avatar">
          <img v-else src="~/assets/header/profile_nologin.png"  alt="~/assets/header/profile_nologin.png"/>
        </div>
        <Profile :isVisible="showProfileBox" />
      </div>

    </header>
  </div>
  <div v-else>
    <header  class="header">
      <div class="logo">
        <img src="~/assets/header/brand_logo.png" alt="logo" @click="goToHomepage" style="cursor: pointer">
      </div>
    </header>
  </div>

  <div v-else>
    <header class="header">
        <div class="mobile-taskbar">
                  <!-- <img src="~/assets/header/brand_logo.png" alt="logo" @click="goToHomepage" style="cursor: pointer"> -->
          <button @click="toggleSidebar" class="button-menu">☰</button>
        
          <el-badge v-if="notificationsCount !== 0" :value="notificationsCount" class="item">
            <img class="notif-btn" src="~/assets/header/nontif.png" @click="toggleNotifBox">
          </el-badge>
          <NotifPopup :isVisible="showNotifBox" />
          <!-- <el-badge v-if="myCartCount !== 0" :value="myCartCount" class="item"></el-badge> -->
          <img alt="~/assets/header/cart.png" class="mycart-btn" src="~/assets/header/cart.png" @click="goToCart">
          
      <!-- <div class="sidebar-search-box">
        <input type="text" class="search-input" placeholder="Search event..." v-model="searchQuery" @keyup.enter="searchEvent"/>
      </div> -->
        </div>

    </header>

    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <div class="up">
        <img class="logo" src="~/assets/header/brand_logo.png" alt="logo" @click="goToHomepage" style="cursor: pointer">
        <button @click="toggleSidebar" class="close-button">×</button>
      </div>
      
      <div class="sidebar-content">
        <div class="profile">
          <img v-if="userStat === 'success'" :src="avatar" alt="~/assets/header/profile_nologin.png">
          <img v-else @click="goToLogin" src="~/assets/header/profile_nologin.png" />
          <h1>{{ userName }}</h1>
          <h3 v-if="userStat === 'success'">{{ userEmail }}</h3>
          <!-- <p>{{ userCoins }} coins</p> -->
          <el-button v-if="userStat === 'success'" type="warning" plain>{{coinVal}} coins</el-button><br>
        </div>
        <div v-if="userStat === 'success'" class="menu-items">
          <div @click="goToCalendar"><img src="~/assets/header/calendar.png" alt="Image" class="image">Calendar</div>
          <div @click="goToTickets"><img src="~/assets/header/ticket.png" alt="Image" class="image">My Tickets</div>
          <div @click="goToBookmarks" ><img src="~/assets/header/bookmark.png" alt="Image" class="image">Bookmarks</div>
          <div @click="logout" class="logout"><img src="~/assets/header/logout-icon.png" alt="Image" class="image">Log out</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Profile from '/components/homepage/Profile.vue';
import NotifPopup from '/components/homepage/NotifPopup.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import axios from 'axios';
const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanMd = breakpoints.smaller('xl');
const isSidebarOpen = ref(false);

let userName = '';
let userEmail = '';
let avatar = ref("");
let userStat = null;
const loginStatus = ref(false);
let userCoin =0;
const notificationsCount = ref(0);
const myCartCount = ref(0)
const router = useRouter();
let coinVal = ref(0);

// Clickable box in header
const showProfileBox = ref(false);
const showNotifBox = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};


onMounted(() => {
  avatar.value = localStorage.getItem("Avatar");

  fetchNotificationsCount();
  //fetchMyCartCount();

  if (process.client) {
    console.log('HEADER: ');
    getCoins();
      const status = localStorage.getItem("Status");
      userStat = status;
      console.log("status : ");
      console.log(status);

      if (status!== "null"){
        userName = localStorage.getItem("Username");
        userEmail = localStorage.getItem("Email");
        loginStatus.value = true;
      }else {
        loginStatus.value = false
        userName = "Guest"
        userEmail = null
      }
    }

});

const getCoins = async () => {
      const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getUser', { credentials: 'include' });
      const userDetails = await response.json();
      //coins.value = userDetails.coin;
      userCoin = userDetails.coin;
      coinVal = userDetails.coin;

};

const logout = () => {
  console.log("User logout successfully");

  // Set cookie asynchronously
  const cookie = useCookie('secourse');
  cookie.value = null;

  // Clear local storage
  if (process.client) {
    localStorage.setItem("Username", null);
    localStorage.setItem("Avatar", null);
    localStorage.setItem("Email", null);
    localStorage.setItem("Status", null);
  }

  // Optional: Show a success notification (if using Element UI)
  // ElNotification.success({
  //   title: 'Success',
  //   message: "Successfully logged out!",
  //   offset: 100,
  // });

  // Redirect to the login page
  router.push('/login');
};

// Counting how many  and Cart
const fetchNotificationsCount = async () => {
  try {
    const response = await axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getNotifications', { withCredentials: true });
    console.log("NOTIF");
    console.log(response);
    notificationsCount.value = response.data.length; 
  } catch (error) {
    console.error('Failed to fetch notifications: ', error);
    ElNotification.error({
      title: 'Error',
      message: `Error fetching notifications. ${error.message}`,
      offset: 100,
    });
  }
};


// const fetchMyCartCount = async () => {
//   this.loadingInstance = ElLoading.service({
//         fullscreen: true,
//         background: 'rgba(0, 0, 0, 0.7)',
//       });
//   try {
//     const response = await axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getOrderByStatus/0', { withCredentials:true});
//     console.log("MY CART");
//     console.log(response.data.length);
//     myCartCount.value = response.data.length; 
//   } catch (error) {if (this.loadingInstance) {this.loadingInstance.close(); }
//     console.error('Failed to fetch carts: ', error);
//     ElNotification.error({
//       title: 'Error',
//       message: `Error fetching carts. ${error.message}`,
//       offset: 100,
//     });
//   }
//   finally {
//       if (this.loadingInstance) {this.loadingInstance.close(); }
//   }
// };


function toggleProfileBox() {
  console.log('profile clicked');
  showProfileBox.value = !showProfileBox.value;

  // When toggling the profile box, close the notif box if it's open
  if (showNotifBox.value) {
    showNotifBox.value = false;
  }
}

function toggleNotifBox() {
  // Correct the assignment operator
  showNotifBox.value = !showNotifBox.value;

  // When toggling the notif box, close the profile box if it's open
  if (showProfileBox.value) {
    showProfileBox.value = false;
  }
}

const goToCalendar = () => {
  router.push('/calendar/calendarPage');
};

const goToCart = () => {
  router.push('/myCart');
};

const goToTickets = () => {
  router.push('/myTickets');
};

const goToBookmarks = () => {
  router.push('/bookmark/bookmarkPage');
};

function goToHomepage(){
  router.push('/')
}

const goToLogin = () => {
  router.push('/login');
};


</script>
<style scoped>
/* General header styles */
.header {
  display: flex;
  justify-content: space-between;
  background-color: #6DC9C8;
  align-items: center;
}

.logo {
  margin-left: 6em;
  float: left;
}

.logo img {
  height: 45px;
  cursor: pointer;
  margin-right: 10px;
}

.right{
  display: flex;
  float: right;
}
.nav-container {
  display: flex;
  gap: 4em; 
  margin-right: 3em;
  margin-top:1em;
  margin-bottom: 1em;
}

.cart-button,
.ticket-button,
.bookmark-button,
.calendar-button,
.notif-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  font-size: 1em;
  cursor: pointer;
  opacity: 70%;
  gap: 0.5em;
}

.cart-button:hover,
.ticket-button:hover,
.bookmark-button:hover,
.calendar-button:hover,
.notif-button:hover {
  opacity: 100%;
}

.user-profile img {
  border-radius: 50%;
  width: 5em;
  height: 5em;
  cursor: pointer;
  margin-right: 10em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.user-profile:hover img {
  transform: scale(1.05);
}

.image-container-cart,
.image-container-ticket,
.image-container-bookmark,
.image-container-calendar,
.image-container-notif {
  align-items: center;
  text-align: center;
  justify-content: center;
}

.image-container-cart img,
.image-container-ticket img,
.image-container-bookmark img,
.image-container-calendar img,
.image-container-notif img {
  width: 3.5em;
  height: 3.5em;
  opacity: 70%;
}

/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
  background-color: #6DC9C8;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}
.header .mobile-taskbar{
  display: flex;
  justify-content: center;
  gap: 3em;
}
.mobile-taskbar img{
  width: 4em;
  height: 4em;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

.button-menu {
  background: none;
  border: none;
  font-size: 4em;
  margin-left: 0.5em;
}
.up{
  text-align: center;
  justify-content: center;
  display: inline-flex;
}

.up .logo{
  width: 45%;
  margin-right: 20%;
  margin-left: 20%;
}

.sidebar.open {
  transform: translateX(0);
}

.close-button {
  font-size: 50px;
  background: none;
  border: none;
  align-self: flex-end;
  cursor: pointer;
}

.sidebar-content {
  width: 90%;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile img {
  border-radius: 50%;
  width: 110px;
  height: 110px;
  margin-bottom: 10px;
}

.profile p {
  margin: 5px 0;
}
.profile h1 {
  size: 30px;
}

.profile h3 {
  size: 20px;
}

.menu-items {
  width: 100%;
}

.menu-items div {
  width: 100%;
  padding: 25px;
  margin: 10px 0;
  background-color: transparent;
  border-top: 1px solid #FAA543;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 28px;
  opacity: 0.8;
}

.menu-items img {
  width: 50px;
  height: 50px;
  padding: 5px;
  padding-bottom: 3px;
  margin-right: 8px;
  opacity: 0.8;
}

.menu-items div:hover {
  opacity: 1.0;
  background-color: #FAA543;
}

.logout {
  border-bottom: 1px solid #FAA543;
}


@media only screen and (max-width: 2880px){

  .cart-button,
  .ticket-button,
  .bookmark-button,
  .calendar-button,
  .notif-button{
    font-size: 1em;
  }

  .image-container-cart img,
  .image-container-ticket img,
  .image-container-bookmark img,
  .image-container-calendar img,
  .image-container-notif img {
    width: 2em;
    height: 2em;
  }
  .user-profile img{
    width: 3em;
    height: 3em;
  }
}




</style>

