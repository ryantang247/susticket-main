<template>
    <Header />
    <div class="single-checkout-box">
        <div class="header">
            <img src="/assets/header/backarrow.png" class="back" @click="goBack">
          <h3>  Checkout</h3>
        </div>
        <div class="left">
            
            <div class="payment-method">
                <h2>Pay with</h2>
                <label>
                <input type="radio" value="PayPal" checked>
                PayPal
                </label>
            </div>
            <div class="use-coin">
                <p>You have <span>50 coins</span>. Do you want to use it?</p>
                <input type="number"  min="0" max="50"> coins used.
            </div>

            <!-- <div class="place-order-button">
              
                Place order
            </div> -->
            <PayPal v-if="eventId" :event-id="eventId" :object-selected="seatLabels" :event-key="seatsioEventsKey" :total-amount="totalAmount"/>
            <div class="cancel-order-btn" @click="goBack">
              Cancel payment
            </div>
        </div>
        <div class="right">
            <div class="order-info">
                <div class="order-detail">
                  <div v-for="seat in seatDetails" :key="seat.type">
                    <p>{{ seat.type }} <span> {{ seat.booking }} x ¥{{ seat.price }}</span></p>
                  </div>
                </div>
                <el-divider/>
                <div class="total">
                    <h1>Total: <span>¥{{ totalAmount }}</span></h1>
                </div>
            </div>
            
        </div>

    </div>
    <Footer />
    <CustomerService />

</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
import Header from '@/components/homepage/Header.vue';
import Footer from '@/components/homepage/Footer.vue';
import CustomerService from '@/components/CustomerService.vue';
import PayPal from "~/components/PayPal.vue";

const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.go(-1); 
};

const eventId = ref(route.query.eventId);
const seatsioEventsKey = ref(route.query.seatsioEventsKey);
const totalAmount = ref(route.query.totalAmount);
const seatDetails = ref(route.query.seatDetails ? JSON.parse(route.query.seatDetails) : []);
const seatLabels = ref(route.query.seatLabels ? JSON.parse(route.query.seatLabels) : []);

onMounted(() => {
  console.log("Seat Details Parsed:", seatDetails.value);
  console.log("Total Amount:", totalAmount.value);
});

/**
 * AI-generated-content
 * tool: ChatGPT
 * version: 3.5
 * usage: ask gpt for debug the styling
 * slightly copy the code from its response ad modified according the desired style
 */

</script>
<style scoped>
*{
    font-family: sans-serif;
}
.single-checkout-box{
    max-width: 1200px;
    height: 700px;
    margin: 0 auto;
    border: #ccc 1px solid;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    padding: 30px;
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
  .left{
    float: left;
    border: #6DC9C8 1px;
    border-right: #000 1px;
    width: 75%;
  }
  .right{
    float: right;
    border: #6DC9C8 1px;
  }
.billing-form input {
    display: inline-block;
    width: 75%;
    height: 50px;
    margin-top: 5px;
    margin-bottom: 20px;
}
.left{
    position: relative;
}
.cancel-order-btn{
    background-color: #fff;
    border: 2px solid #e3bd49;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  color: #000;
  display: flex; /* Enables Flexbox */
  justify-content: center; /* Centers content horizontally */
  align-items: center; /* Centers content vertically */
  text-align: center; 
  text-decoration: none;
}
.cancel-order-btn:hover{
    background-color: #e3bd49;
  cursor: pointer;
  color: #000;

}
.order-info{
    border: #6DC9C8 1px solid;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
}

.order-detail span{
    display: flex;
  flex-direction: row-reverse; /* Reverse the order of flex items */
  justify-content: space-between;
  align-items: center;
}
.use-coin span{
    color:crimson;
}
.use-coin{
  margin-bottom: 50px;
}



  
</style>