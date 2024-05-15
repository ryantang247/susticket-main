<template>
  <div class="bookmark-page">
    <Header />
    <div class="label-page">
      <img src="~/assets/categorymenu/back.png" alt="Back" @click="goToHomepage">
      <h1>Bookmarks</h1>
    </div>
    <div v-if="isLoaded" class="container">
      <EventList :events="events" />
    </div>
    <Footer />
    <CustomerService/>
  </div>
</template>

<script setup>
import Header from '@/components/homepage/Header.vue';
import EventList from '@/components/homepage/EventList.vue';
import Footer from '@/components/homepage/Footer.vue';
import CustomerService from '@/components/CustomerService.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Make sure axios is installed

const router = useRouter();
const events = ref([]);
const isLoaded = ref(false);


const goToHomepage = () => {
  router.push('/');
};

// Fetch bookmarked events on component mount
onMounted(async () => {
  try {
    const response = await axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getBookmarkedEvents');

    response.data.forEach((bookmarkedEvent)=>{

      // Bug: event aprt is an array ven thoguh there is only one event
      events.value.push(bookmarkedEvent.event[0])
    })// Assuming the API responds with an array of events
    console.log("bookmarkedEvent", events.value);
    isLoaded.value = true
  } catch (error) {
    console.error('Error fetching bookmarked events:', error);
    // Handle error, e.g., show notification or message to the user
  }
});
</script>


<style scoped>
.label-page{
  display: flex;
  align-items: center;
}
.label-page h1{
  font-family: sans-serif;
  font-size: 40px;
  margin-left: 10px;
}
.label-page img{
  margin-left: 10px;
  width: 70px;
  height: 70px;
}
.label-page img:hover{
  background-color: #ccc;
  border-radius: 50%;
}
</style>
