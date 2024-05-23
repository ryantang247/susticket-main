<template>
  <div class="welcome-banner">
    
    <div v-if="name">
      <h1>Hello, {{ name }}!</h1>
    </div>
    <div v-else>
      <h1>Hello, There!</h1>

    </div>
    <p>What event are you looking for?</p>
    <button @click="goToMapPage" class="nearby-events-button">
      <img src="/assets/event/point.png"> Find event
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let isCookieNull = null

if (process.client) {
  isCookieNull = localStorage.getItem("Status")
  console.log("Has cookie ", isCookieNull)
;}

const goToMapPage = () => {
  router.push('./map');
};

// Define the prop 'name' with its type
const props = defineProps({
  name: String
});


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
  font-size: 50px;
  font-family: sans-serif;
}
p{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
}
.welcome-banner {
  background-color: #284949; 
  color: #000; 
  padding-top: 5%;
  padding-bottom: 3%;
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

</style>