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
      <div class="search-box">
        <a href="#" class="search-icon-wrapper">
          <img src="~/assets/header/search.png" class="search-icon" alt="Search" @click="searchEvent"/>
        </a>
        <input type="text" class="search-input" placeholder="Search event..." v-model="searchQuery" @keyup.enter="searchEvent"/>
      </div>

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
        <el-badge v-if="myCartCount != 0" :value="myCartCount" class="item">
          <img src="~/assets/header/cart.png" alt="Image" class="image">
        </el-badge>

        <button class="cart-button">Cart</button>
      </div>

      <div class="image-container-notif">
        <el-badge v-if="notificationsCount != 0" :value="notificationsCount" class="item">
          <img src="~/assets/header/nontif.png" alt="Image" class="image" @click="toggleNotifBox">
        </el-badge>
        <NotifPopup :isVisible="showNotifBox" />

        <button class="notif-button" @click="toggleNotifBox">Notification</button>
      </div>

      <div class="user-profile" @click="toggleProfileBox">
        <img :src="avatar" />
      </div>

      <Profile :userProfile="userProfile" :isVisible="showProfileBox" />
    </header>
  </div>
  <div v-else>
    <header  class="header">
      <div class="logo">
        <img src="~/assets/header/brand_logo.png" alt="logo" @click="goToHomepage" style="cursor: pointer">
      </div>
    </header>
  </div>


</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Profile from '/components/homepage/Profile.vue';
import NotifPopup from '/components/homepage/NotifPopup.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Menu } from '@element-plus/icons-vue';
import axios from 'axios';
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanMd = breakpoints.smaller('xl') // only smaller than lg

const avatar = ref('');
const notificationsCount = ref(0);
const myCartCount = ref(0)

const userProfile = ref({
  name: "",
  email: "",
  coin: 150,
  avatar: ""
});

const fetchNotificationsCount = async () => {
  try {
    const response = await axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getNotifications',{ withCredentials:true});
    console.log("NOTIF");
    console.log(response)
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

const fetchMyCartCount = async () => {
  try {
    const response = await axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getOrderByStatus/0', { withCredentials:true});
    console.log("MY CART");
    console.log(response)
    myCartCount.value = response.data.length; 
  } catch (error) {
    console.error('Failed to fetch carts: ', error);
    ElNotification.error({
      title: 'Error',
      message: `Error fetching carts. ${error.message}`,
      offset: 100,
    });
  }
};

onMounted(() => {
  fetchNotificationsCount();
  fetchMyCartCount();

  if (process.client) {
    const status = localStorage.getItem("Status");
    if (!status) {
      ElNotification.error({
        title: 'Error',
        message: "User not logged in",
        offset: 100,
      });
    } else {
        console.log("HELLO!!!")
        userProfile.value.sid = localStorage.getItem("SID");
        userProfile.value.name = localStorage.getItem("Username");
        userProfile.value.email = localStorage.getItem("Email");
        userProfile.value.avatar = localStorage.getItem("Avatar");
        avatar.value = userProfile.value.avatar || 'assets/logo.png';
      }
  }
});

const showProfileBox = ref(false);
const showNotifBox = ref(false);
const showMenu = ref(false);

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

const isScreenSmall = computed(() =>{
    if (process.client) {
      let width = window.innerWidth
      console.log("Screen small: ",width < 700)
      return width < 700
    }

})

const avatarSrc = computed(() => {
  return userProfile.avatar || 'assets/avatarr.png';
});

const router = useRouter();

const searchQuery = ref('');

const searchEvent = async () => {
  if (searchQuery.value.trim()) {
    // Redirect to the found event page with the search query
    router.push({ path: '/foundEvent/foundEventPage', query: { query: searchQuery.value.trim() } });
  }
};


const goToCalendar = () => {
  router.push('/calendar/calendarPage');
};

const goToCart = () => {
  router.push('/myCart');
};

const goToTickets = () => {
  router.push('/myTickets/myTickets');
};

const goToBookmarks = () => {
  router.push('/bookmark/bookmarkPage');
};

function goToFoundEvent(){
  router.push('/foundEvent/foundEventPage');
}
function goToHomepage(){
  router.push('/')
}


</script>
<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
.calendar-button,
.notif-button {
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
.calendar-button:hover,
.notif-button{
  opacity: 100%;
}

.user-profile img {
  border-radius: 50%; 
  width: 50px; 
  height: 50px; 
  margin-right: 5px;
  cursor: pointer;
  margin-right: 150px;
}
.user-profile:hover img{
  transform: scale(1.05);
}

.image-container-cart,
.image-container-ticket,
.image-container-bookmark,
.image-container-calendar,
.image-container-notif{
  position: relative;
  display: flex;
  align-items: center;
}

.image-container-cart img,
.image-container-ticket img,
.image-container-bookmark img,
.image-container-calendar img,
.image-container-notif img{
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
