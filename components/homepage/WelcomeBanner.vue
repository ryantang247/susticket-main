<template>
  <div class="welcome-banner">
    
    <div v-if="name">
      <h1>Hello, {{name}}!</h1>
    </div>
    <div v-else>
      <h1>Hello, There!</h1>
    </div>
    
    <p>What event are you looking for?</p>
    <div class="search-box">
      <!-- <a href="#" class="search-icon-wrapper">
        <img src="~/assets/header/search.png" class="search-icon" alt="Search" @click="searchEvent"/>
      </a> -->
      <input type="text" class="search-input" placeholder="Search event..." v-model="searchQuery" @keyup.enter="searchEvent"/>
    </div>
    <button @click="goToMapPage" class="nearby-events-button">
      <img src="/assets/event/point.png"> Find event
    </button>
  </div>
</template>

<script setup>
import {ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
// const name = ref('There');
let name = '';

const goToMapPage = () => {
  router.push('./map');
};

onMounted(() => {
  if (process.client) {
    console.log("WELCOME BANNER");
    const status = localStorage.getItem("Status");
    console.log("status : ");
    console.log(status);

    if (status) {
      name = localStorage.getItem("Username");
    } else {
      name = "There";
    }
  }
});
const searchEvent = async () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/foundEvent/foundEventPage', query: { query: searchQuery.value.trim() } });
  }
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
h1{
  font-size: 5em;
  font-family: sans-serif;
}
p{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2.5em;
}
.welcome-banner {
  background-color: #284949; 
  color: #000; 
  padding-top: 5%;
  padding-bottom: 4%;
  justify-content: center;
  text-align: center;
  background-image: url('/assets/welcomeBanner/banner5.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
}
.nearby-events-button {
  font-family: sans-serif;
  border: none;
  background-color: #84F3F2; 
  color: #000;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px; 
  opacity: 0.8;
}

.nearby-events-button img {
  width: 30px;
}
.nearby-events-button:hover {
  background-color: #429c9b;
}
.search-box {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 10px;
}

.search-input {
  padding: 14px 60px;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 30px;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

@media only screen and (max-width: 2880px){
  h1{
    font-size: 2.5em;
  }
  p{
    font-size: 1em;
  }
  .search-input{
    padding: 8px 30px;
    font-size: 20px;
    border-radius: 20px;
  }
}


</style>