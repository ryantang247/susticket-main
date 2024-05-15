<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to generate a template for the menu bar/header, and modify it based on our navigation purpose
-->
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
      <el-badge :value="12" class="item">
        <img src="~/assets/header/cart.png" alt="Image" class="image">
      </el-badge>
      
      <button class="cart-button">Cart</button>
    </div>
    
    <div class="image-container-notif">
      <el-badge :value="3" class="item">
        <img src="~/assets/header/nontif.png" alt="Image" class="image" @click="toggleNotifBox">
      </el-badge>
      <NotifPopup :isVisible="showNotifBox" />
    
      <button class="notif-button" @click="toggleNotifBox">Notification</button>
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
import NotifPopup from '/components/homepage/NotifPopup.vue';


let name = ""
let email=""
let avatar = ""
let coins = 150
if (process.client) {
 name = localStorage.getItem("Username")
  email = localStorage.getItem("Email")
  avatar = localStorage.getItem("avatar")
}
const userProfile = {
  name: name,
  email: email,
  coin: coins,
  avatar: avatar
}
const showProfileBox = ref(false);
const showNotifBox = ref(false);

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
  router.push('/myCart/myCart');
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
  border-radius: 50%; /* Make the image round */
  width: 15%; /* Adjust size as necessary */
  height: 15%; /* Adjust size as necessary */
  margin-right: 5px;
  cursor: pointer;
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
