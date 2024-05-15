<template>
  <div v-if="currentEvent" class="booking-container">
    <h1>{{ currentEvent.title }}</h1>
    <p>{{ currentEvent.description }}</p>
    <p>Date: {{ currentEvent.date }}</p>
    <p>Location: {{ currentEvent.location }}</p>
    <h1>Booking Form</h1>
    <el-form :model="formData" el-form-item-width="auto" style="max-width: 600px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="formData.name" required />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input type="email" v-model="formData.email" required />
      </el-form-item>
      <SeatsioSeatingChart
          workspaceKey="b7250d79-002d-4bbe-9c83-a30c494c6bee"
          :event="currentEvent.seatsioEventsKey"
          :pricing="pricing"
          region="oc"
          @objectSelected="onObjectSelected"
          @objectDeselected="onObjectDeselected"
      />
      <el-form-item>
        <el-button type="primary" class="submit-button" @click="submitForm">Book Now</el-button>
      </el-form-item>
    </el-form>
    <div v-if="bookingStatus === 'success'" class="success-message">Booking successful!</div>
    <div v-if="bookingStatus === 'error'" class="error-message">Booking failed. Please try again.</div>
  </div>
</template>

<script>
import axios from "axios";
import {SeatsioSeatingChart} from "@seatsio/seatsio-vue";

export default {
  components: {SeatsioSeatingChart},
  data() {
    return {

      formData: {
        name: '',
        email: '',
        numTickets: 1
      },
      pricing: [],
      currentEvent: null,
      bookingStatus: null
    };
  },
  props:{
    eventId: null,
  },
  mounted(){
    this.getAllEvents();
  },

  methods: {
    // async submitForm() {
    //   try {
    //     const response = await fetch('https://api.example.com/bookings', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(this.formData)
    //     });
        
    //     this.bookingStatus = response.ok ? 'success' : 'error';
    //   } catch (error) {
    //     console.error('Error submitting booking:', error);
    //     this.bookingStatus = 'error';
    //   }
    // }
    getAllEvents(){
      axios.get(`https://secourse2024-675d60a0d98b.herokuapp.com/api/getEvent/${$route.params.id}`, ).then(response => {

        const eventList = response.data;

        for (const event of eventList) {
          if (event.id === this.eventId) {
            this.currentEvent = event;
            this.pricing = JSON.parse(event.price)
            console.log(this.pricing)
            console.log("Current event ",event)
            break; // Once found, exit the loop
          }
        }

        this.events = response.data;
      })
    },
    submitForm(){
      console.log('submitted')
    }
  }
};
</script>

<style scoped>
.booking-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.el-form-item {
  margin-bottom: 15px;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.success-message,
.error-message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
