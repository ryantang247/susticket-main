<template>
  <Header />
  <div class="event-book-container">
      <div class="header">
          <img src="/assets/header/backarrow.png" class="back" @click="goBack">
          <h3>  Seat selection</h3>
      </div>

      <div class="left">
        <div v-if="eventData.seatsioEventsKey" class="seat-selection card">
          <div v-if="loadChart">
            <SeatsioSeatingChart
                workspaceKey="b7250d79-002d-4bbe-9c83-a30c494c6bee"
                :event="eventData.seatsioEventsKey"
                :pricing="pricing"
                region="oc"
                @objectSelected="onObjectSelected"
                @objectDeselected="onObjectDeselected"
            />
          </div>
        </div>
        <div v-else class="seat-selection card">
          <h2>Ticket Selection</h2>
          <el-row>
            <el-col v-bind:key="price-cat" v-for="price in pricing">
              <el-card @click="onObjectSelectedNoSeats(price)" class="ticket-card">
                <h1 class="price">${{price.price}}</h1>
                  <p1 class="category" >{{price.category}}</p1>
              </el-card>
            </el-col >
          </el-row>
        </div>
      </div>

      <div class="right">
          <div class="right-info">
            <div class="price-details" v-if="objects.length > 0">
              <div v-for="seat in seats" :key="seat.type" class="item">
                <span>{{ seat.type }} </span>
                <span class="yuan"> {{ seat.booking }} x ¥{{ seat.price.toFixed(2) }}</span>
                <button v-if="!eventData.seatsioEventsKey" @click="onObjectNoSeatsDeselected(seat)" style="background: #99a9bf"> - </button>
              </div>
            </div>
            <el-divider/>
            <div class="total">
              <h1>Total: <span class="yuan">¥{{ totalAmount.toFixed(2) }}</span></h1>
              
            </div>
            <div class="actions">
              <div class="add-cart-btn" @click="addToCart(totalAmount)" v-if="eventData.id" :event-id="eventData.id" :object-selected="seatLabels" :event-key="eventData.seatsioEventsKey" :total-amount="totalAmount.toFixed(2)">+Add to Cart</div>
              
              <div class="get-ticket-btn" @click="navigateToCheckout"><a>Get Ticket Now</a></div>
              
              
            </div>
              
              
                                
          </div>
      </div>


  </div>
  <Footer />
  <CustomerService />

</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElNotification } from 'element-plus'

import Header from '@/components/homepage/Header.vue';
import Footer from '@/components/homepage/Footer.vue';
import CustomerService from '@/components/CustomerService.vue';
import PayPal from "~/components/PayPal.vue";
import { SeatsioSeatingChart } from '@seatsio/seatsio-vue';
import { getEvents } from "~/api.js";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const pricing = ref([]);
const loadChart = ref(false);
const objects = ref([]);
const seatLabels = ref([]);
const isLoading = ref(true);

const currentEvent = ref(route.params.id);

const goBack = () => {
  router.go(-1); 
};

const addToCart = async (totalAmount) => {
  try {
    console.log('Adding to cart:', currentEvent.value, totalAmount);
    
    // Send a POST request to the API endpoint
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/putToMyCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        eventId: currentEvent.value,
        price: totalAmount// Adjust this accordingly based on how you get the price
      })
    });

    // Check if the request was successful
    if (response.ok) {
      // Notify the user that the event has been added to the cart
      ElNotification.success({
        title: 'Success',
        message: 'Event has been added to your cart',
        offset: 100
      });
    } else {
      // Handle the error if the request fails
      console.log(response)
      ElNotification.error({
        title: 'Error',
        message: 'Failed to add event to cart. Please try again later.' + response.statusText,
        offset: 100
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding event to cart:', error);
    ElNotification.error({
      title: 'Error',
      message: 'An unexpected error occurred. Please try again later.' + error.statusText,
      offset: 100
    });
  }
};

const eventData = ref({
  id: null,
  thumbnails: ['https://via.placeholder.com/400x200','https://via.placeholder.com/200x200','https://via.placeholder.com/300x200','https://via.placeholder.com/100x200'],
  contactName: '',
  contact: '',
  status: '',
  rate: ref(3.7),
  soldTickets: 1000,
  title: '',
  dateTime: '',
  location: '',
  price: '',
  description: '',
  seatsioEventsKey: null,
  seatsioChartKey: null,
});

const seats = ref([]); 

const totalAmount = computed(() => {

    var totalPrice =0;
    if (eventData.value.seatsioEventsKey) {
      for (let i = 0; i < objects.value.length; i++) {
        totalPrice += objects.value[i].pricing.price;

      }

    } else {
      console.log(objects.value)

      for (let i = 0; i < objects.value.length; i++) {
        totalPrice += objects.value[i].price;

      }

    }
    return totalPrice;

});

const onObjectDeselected = (selectedObjects) => {
  console.log(selectedObjects.label);
  objects.value = objects.value.filter(object => object.label !== selectedObjects.label);
  seatLabels.value = seatLabels.value.filter(object => object !== selectedObjects.label)
  console.log(seatLabels.value);
  const existingCategoryIndex = seats.value.findIndex(category => category.type === selectedObjects.category.label);

  if (existingCategoryIndex !== -1) {
    // If the category exists, decrement its booking
    seats.value[existingCategoryIndex].booking -= 1;

    if (seats.value[existingCategoryIndex].booking === 0) {
      seats.value.splice(existingCategoryIndex);
    }
  }

};

const onObjectNoSeatsDeselected = (selectedObjects) => {
  // selectedObjects take in value from prices, not objects

  console.log("Current seats",seats.value);
  console.log("Current object",objects.value);

  const existingCategoryIndex = seats.value.findIndex(category => category.type === selectedObjects.type);
  const objectIndex = objects.value.findIndex(category => category.type === selectedObjects.type);

  console.log(existingCategoryIndex)
  //
  if (existingCategoryIndex !== -1) {
    // If the category exists, increment its booking
    seats.value[existingCategoryIndex].booking-=1;
    objects.value.splice(objectIndex, 1); // Splice the element if it meets the condition

    if(seats.value[existingCategoryIndex].booking===0){
      seats.value.splice(existingCategoryIndex)
    }

  }

};

const onObjectSelectedNoSeats = (selectedObjects) => {
  const existingCategoryIndex = seats.value.findIndex(category => category.type === selectedObjects.category);
  const selectedSeat = {type: selectedObjects.category, booking: 1, price:  Number(selectedObjects.price) }
  objects.value.push({type: selectedObjects.category, price:  Number(selectedObjects.price) });
  console.log("After adding to objects",objects.value);

  if (existingCategoryIndex !== -1) {
    // If the category exists, increment its booking
    seats.value[existingCategoryIndex].booking+=1;
  } else {
    // If the category doesn't exist, add it to the array
    seats.value.push(selectedSeat);
  }
  console.log(seats.value)

};

const onObjectSelected = (selectedObjects) => {
console.log(selectedObjects.label);
objects.value.push(selectedObjects);
seatLabels.value.push(selectedObjects.label)

const existingCategoryIndex = seats.value.findIndex(category => category.type === selectedObjects.category.label);

  if (existingCategoryIndex !== -1) {
    // If the category exists, increment its booking
    seats.value[existingCategoryIndex].booking+=1;
  } else {
    // If the category doesn't exist, add it to the array
    seats.value.push({type: selectedObjects.category.label, booking: 1, price:  Number(selectedObjects.pricing.price) });
  }
// console.log("seats array", seats.value)
console.log(seatLabels.value);
};

onMounted(async () => {
const eventDataResponse = await getEvents(route.params.id);

if (eventDataResponse) {
  pricing.value = eventDataResponse.pricing;
  Object.assign(eventData.value, eventDataResponse.eventData);
  eventData.value.location = eventDataResponse.eventData.venue
  loadChart.value = true
  console.log('eventData',eventData.value)
  isLoading.value = false

}
});

function navigateToCheckout() {
  const checkoutData = {
    eventId: eventData.value.id,
    seatsioEventsKey: eventData.value.seatsioEventsKey,
    totalAmount: totalAmount.value.toFixed(2),
    seatDetails: JSON.stringify(seats.value.map(seat => ({
      type: seat.type,
      booking: seat.booking,
      price: seat.price.toFixed(2)
    }))),
    seatLabels: JSON.stringify(seatLabels.value),
  };

  router.push({
    path: `/checkoutSingle/${currentEvent.value}`,
    query: checkoutData
  });
}

</script>
<style scoped>
.event-book-container{
  max-width: 1200px;
  height: 700px;
  margin: 0 auto;
  border: #ccc 1px solid;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  
}
.header {
  text-align: left;
  display: flex;
  align-items: center; /* This centers the children vertically */
  margin-bottom: 20px;
}
.header h2{
  margin-left: 20px;
  margin: 0;
}
.back{
  width: 25px;
  height: 25px;
}
.back:hover{
  background-color: #ccc;
  border-radius: 50%;
}
.select-seat-box{
  max-width: 1000px;
  height: 600px;
  margin: 0 auto;
  border: #ccc 1px solid;
  padding: 20px;
  margin-bottom: 50px;
}
.left{
  float: left;
  border: #6DC9C8 1px;
  border-right: #000 1px;
  width: 75%;
  background-color: #6DC9C8;
}
.right{
  float: right;
  border: #6DC9C8 1px;
}

.add-cart-btn, .get-ticket-btn{
  background-color: #284949;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  color: #fff;
  display: flex; /* Enables Flexbox */
  justify-content: center; /* Centers content horizontally */
  align-items: center; /* Centers content vertically */
  text-align: center; 
  text-decoration: none;

}
.get-ticket-btn{
  background-color: #fff;
  border: #284949 solid 2px;
  color: #000;
}
.get-ticket-btn a{
text-decoration: none;
}
.add-cart-btn:hover{
  background-color: #fff;
  cursor: pointer;
  color: #000;
  border: 2px solid #284949;
}
.get-ticket-btn:hover{
  background-color: #284949;
  cursor: pointer;
}
.yuan {
  display: flex;
  flex-direction: row-reverse; /* Reverse the order of flex items */
  justify-content: space-between;
  align-items: center;
}

</style>
