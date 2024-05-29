<template>
  <div class="my-cart-page">
    <Header />
    <div class="label-page">
      <img src="~/assets/categorymenu/back.png" alt="Back" @click="goToHomepage">
      <h1>My Cart</h1>
    </div>
    <div class="container">

      <div v-for="cart in transactions" :key="cart.id" class="event-card">
        <aside class="left">
          <aside class="check-box">
            <!-- <img src="/assets/header/ticked.png" class="checkbox"> -->
            <img :src="tickedSrc(cart)" @click="toggleTicked(cart)" class="checkbox">
          </aside>
          <aside v-if="cart.event" class="desc">
            <h1 >{{ cart.event[0].title }}</h1>
            <p>{{ cart.event[0].startDate + ' | ' + cart.event[0].endDate }}</p>
            <p>{{ cart.event[0].location }}</p>
            <p class="seat"><b>{{cart.event[0].seat}}</b></p>
            <h2>{{ '¥' + cart.price }}</h2>
            <el-button type="danger" round class="status">{{cart.status}}</el-button>
            <p class="available">{{ cart.event[0].available }}</p>
          </aside>
        </aside>
        <aside v-if="cart.event" class="right">
          <div class="image-container">
            <img :src="cart.event[0].thumbnail" alt="event-image" class="event-image">
          </div>
          <div class="button-actions">
            <!-- <button class="next-action">Next actions</button> -->
            <img @click="deleteFromCart(cart.id)" src="/assets/header/delete.png" class="delete">
            <!-- <el-button type="danger" :icon="Delete" circle /> -->
          </div>
        </aside>
      </div>
      <!-- <MyCardCard :transactions="transactions" /> -->
      <div class="use-coin-cart">
        <p>You have <span class="display-coin">{{ coinVal}} </span> coins . Do you want to use it?</p>
        <div>
          <input type="number" v-model="usedCoin"  min="0" max="50"> coins used.

        </div>
      </div>
    </div>

    <div class="checkout-container">
      <div class="checkout-box">
        <p>Total: <b>{{ total }}</b></p>
        <!-- <button class="checkout-btn">Checkout</button> -->
      </div>
      <button class="checkout-btn" @click="checkoutWithPayPal">Checkout</button>

      <!-- <PayPal v-if="eventData.id" :event-id="eventData.id" :object-selected="seatLabels" :event-key="eventData.seatsioEventsKey" :total-amount="totalAmount.toFixed(2)"/> -->
    </div>
    <el-backtop :right="60" :bottom="150" />
    <Footer />
    <CustomerService/>
  </div>
</template>

<script setup>
import Header from '@/components/homepage/Header.vue';
import Footer from '@/components/homepage/Footer.vue';
import EventCard from '@/components/myTicket/MyCartCard.vue';
import CustomerService from '@/components/CustomerService.vue';
import { ref, computed } from 'vue';

import checkboxImage from '@/assets/header/checkbox.png';
import tickedImage from '@/assets/header/ticked.png';

import { useRouter } from 'vue-router';
import {ElNotification} from "element-plus";

const router = useRouter();

const goToHomepage = () => {
  router.push('/');
};
const transactions = ref([]);
const categories = ref(["To Pay", "Paid", "To Review", "Reviewed"]);
const events = ref([
  // Other event objects...
]);
const coinVal = ref(0)
const usedCoin = ref(0);

const orders = ref([
  // Other event objects...
]);
// Computed property to calculate total price based on ticked events
const total = computed(() => {

  if(transactions.value.length===0){
    return 0;
  }

  return transactions.value.reduce((acc, curr) => {
    if (curr.bookmarked) {
      return acc + parseFloat(curr.price);
    } else {
      return acc;
    }
  }, 0).toFixed(2);
});
// console.log(events);
const toggleTicked = (event) => {
  console.log("Selected event", event);
  if(!event.bookmarked){
    event.bookmarked = false
  }
  const orderIndex = orders.value.findIndex(order => order.orderId === event.id);

  if (orderIndex === -1) {
    orders.value.push({
      eventId: event.eventId,
      id: event.id
    });
  } else {
    orders.value.splice(orderIndex, 1);
  }

  console.log("Current orders: ",  event.bookmarked );
  event.bookmarked = !event.bookmarked; // Toggle the bookmarked state
};

const getUserCoins  = async () =>{
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  
  try{
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getUser', {credentials: 'include'});
    const eventData = await response.json();
    console.log("User details: ",eventData)
    coinVal.value = eventData.coin
  }catch (e) {
    console.log("Error getting user detail")
    ElNotification.error({
        title: 'Error',
        message: 'Error getting user detail.'+error,
        offset: 100
    });
    
  }
  finally {
    loading.close();
  }

}


const tickedSrc = (event) => {
  return event.bookmarked ? tickedImage : checkboxImage;
};

// Fetch events for the cart from the API
const fetchEventsForCart = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getOrderByStatus/0', {credentials: 'include'});
    const eventData = await response.json();
    transactions.value = eventData;
    console.log('transactions: ');
    console.log(transactions.value);
    console.log(eventData);
  } catch (error) {
    ElNotification.error({
      title: 'Error',
      message: 'Error fetching events from your cart',
      offset: 100
    });
    console.error('Error fetching events for cart:', error);
  }
  finally {
    loading.close();
  }
};

const checkoutWithPayPal = async () => {

  if(orders.value.length ===0){
    ElNotification.error({
      title: 'Error',
      message: 'Payment failed: selected events cannot be empty',
      offset: 100
    });
    return;
  }

  try {
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/payFromMyCart', {
      method: 'POST',  // Specify the method as POST
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'  // Set the Content-Type header to application/json
      },
      body: JSON.stringify({
        orderList: orders.value,
        coin: usedCoin.value,
        price: Number(total.value)
      })
    });


    if (response.ok) {
      console.log('Payment successful:', response);
      const eventData = await response.json();

      ElNotification.success({
        title: 'Success',
        message: 'Payment successful, redirecting...',
        offset: 100
      });
      navigateTo(eventData.forwardLink, {
        external: true,
        open: {
          target: '_blank',
        }
      });

    } else {
      const errorMsg = await response.json();
      console.log(errorMsg)
      ElNotification.error({
        title: 'Error',
        message: 'Payment failed: ' + errorMsg.msg,
        offset: 100
      });
      console.error('Payment failed:', errorMsg.msg);
    }
  } catch (error) {
    ElNotification.error({
      title: 'Error',
      message: 'Payment error',
      offset: 100
    });
    console.error('Error paying by cart:', error);
  }
};


// Delete an event from the cart
const deleteFromCart = async (orderId) => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    const response = await fetch(`https://secourse2024-675d60a0d98b.herokuapp.com/api/deleteFromMyCart/${orderId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      // If deletion is successful, update the events list
      await fetchEventsForCart();
      ElNotification.success({
        title: 'Success',
        message: 'Event has been deleted from your cart',
        offset: 100
      });

    } else {
      ElNotification.error({
        title: 'Error',
        message: 'Event delete error ' + response.statusText,
        offset: 100
      });
      console.error('Failed to delete event from cart');
    }
  } catch (error) {
    ElNotification.error({
      title: 'Error',
      message: 'Event delete error',
      offset: 100
    });
    console.error('Error deleting event from cart:', error);
  }
  finally {
    loading.close();
  }
};

// Fetch events for the cart when the component is mounted
onMounted(() => {
  // Execute these functions when the component is mounted
  fetchEventsForCart();
  getUserCoins();
});

</script>
<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to style the html above
-->
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


.use-coin-cart{
  display: flex;
  margin-left: 60px;
  align-items: center;
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
.checkout-container{
  margin-top: 3%;
  margin-left: 60px;
  margin-bottom: 3%;
  width: 70%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
}
.checkout-box{
  width: 30%;
  height: 50px;
  border:2px solid #000000;
}


.total b{
  font-size: 24px;
}
.checkout-btn{
  width: 50%;
  height: 50px;
  float: right;
  font-weight: 100;
  font-size: 25px;
  background-color: #284949;
  color: #fff;
}
.checkout-btn:hover{
  color: #485e5e;
  cursor: pointer;
}

h1{
  font-size: 30px;
}
.event-card {
  display: flex;
  justify-content: space-between; /* Align items to opposite ends */
  width: 70%;
  padding: 0 20px 0 10px;
  border-radius: 10px;
  border: 2px solid #6DC9C8;
  margin-bottom: 15px;
  margin-left: 60px;
}
.display-coin{
  color:red;
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

.button-actions {
  display: flex;
  align-items: center;
}
.button-actions img{
  width: 30px;
  height: 30px;
  margin: 5px;

}
.button-actions img:hover{
  background-color: rgb(189, 189, 189);
  border-radius: 50%;
}
</style>
  