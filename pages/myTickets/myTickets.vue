<template>
  <div class="my-tickets-page">
    <Header/>
    <div class="label-page">
      <img src="~/assets/categorymenu/back.png" alt="Back" @click="goToHomepage">
      <h1>My Ticket</h1>
    </div>
    <div class="container">
      <MyTicketCard :transactions="transactions" />
      <MyTicketCard :events="events" />

    </div>
    <Footer />
    <el-backtop :right="60" :bottom="150" />
    <CustomerService/>
  </div>
</template>

<script setup>
import Header from '@/components/homepage/Header.vue';
import MyTicketCard from '@/components/myTicket/MyTicketCard.vue';
import CustomerService from '@/components/CustomerService.vue';
import Footer from '@/components/homepage/Footer.vue';
import { ref } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHomepage = () => {
  router.push('/');
};
const transactions = ref([]);
const categories = ref(["Paid","Finished"]);
const events = ref([
  // Other event objects...
]);
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
    ElNotification.error({
      title: 'Error',
      message: "Failed to copy link" + err,
      offset: 100,
    });
  });
};
// Fetch purchased tickets from the API endpoint
const fetchPurchasedTickets = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getOrderByStatus/1',{credentials: 'include'}); // Update the endpoint URL
    const ticketData = await response.json();
    console.log(ticketData)
    transactions.value = ticketData;
  } catch (error) {
    console.error('Error fetching purchased tickets:', error);
    ElNotification.error({
        title: 'Error',
        message: 'Error fetching purchased tickets.'+error,
        offset: 100
    });
  }finally {
    loading.close();
  }
};
// Call fetchPurchasedTickets when the component is mounted
onMounted(fetchPurchasedTickets);
</script>

<style scoped>
*{
  font-family: sans-serif;
}

.filter-list li {
  margin-right: 20px; /* Add spacing between items */
}
.filter-list li a{
  text-decoration: none;
  color: black;
  font-size: 25px;
  opacity: 0.7;
}
.filter-list li a:hover{
  opacity: 1.5;
}

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
  background-color: rgb(189,189,189);
  border-radius: 50%;
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
  