<template>    
    <div class="OUTER">
    <Header/>
    <p></p>
    <div class="container">
      <div class="left-section">
        <div class="item-details card">
          <h2>Event Details</h2>
          <!-- Insert item details here -->
          <div class="event-details">
            <p>Date & Time: {{ attraction.dateTime }}</p>
            <p>Location: {{ attraction.location }}</p>
            <p>Price: {{ attraction.price }}</p>
            <span>Venue Id: </span>
              <el-tag size="small">School</el-tag>
            <span></span>
            <p>Description: {{ attraction.description }}</p>
          </div>
        </div>
        <div class="form-details card">
          <h2>Booking Details</h2>
          <form id="bookingForm">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="identityType">Identity Type:</label>
            <select id="identityType" name="identityType" required>
              <option value="studentID">Student ID</option>
              <option value="nationalCertificate">National Certificate</option>
              <option value="passport">Passport</option>
            </select><br>
            <label for="significantNumber">Identity Number:</label>
            <input type="text" id="significantNumber" name="significantNumber" required><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>
            <!-- <label for="countryCode">Country Code:</label>
          <CountryRegionSelect
            id="countryCode"
            v-model="selectedCountry"
            required
          ></CountryRegionSelect><br>
           //npm install vue-country-region-select --save 
        -->
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required><br>
          </form>
        </div>
        <!-- Seat selection -->
        <div class="seat-selection card">
          <h2>Seat Selection</h2>
          <!-- Add your seat selection component here -->
          <!-- For example, <SeatSelection :seats="availableSeats" @seatSelected="updateSelectedSeats" /> -->
        </div>
      </div>
      <div class="right-section">
        <div class="total-amount card">
          <h2>Total Amount</h2>
          <div class="price-details" v-for="seat in seats" :key="seat.type">
            <div class="item">
              <span>{{ seat.type }} Price</span>
              <span>CNY {{ seat.price.toFixed(2) }} x {{ seat.booked }}</span>
            </div>
          </div>
          <el-divider/>
          <div class="total">
            <span>Total</span>
            <span>CNY {{ totalAmount.toFixed(2) }}</span>
          </div>  
        </div>
        <div class="promotion-code card">
            <h2>Voucher/Promotions</h2>
            <label for="promoCode">Promo Code:</label>
            <input type="text" id="promoCode" name="promoCode" required><br>
            <!-- Display accumulated price including tax, fees, etc. -->
        </div>
        <div class="actions">
            <button class="book-button">Book</button>
            <button class="add-to-cart-button">Add to Cart</button>
          </div>
          <div class="acknowledgement">
            By proceeding, I acknowledge that I have read and agree to SUSTechTicket's <a href="#">Terms of Use</a> and <a href="#">Privacy Statement</a>.
          </div>
        <!-- <div class="payment-method card">
          <h2>Payment Method</h2>
          <input type="radio" id="alipay" name="paymentMethod" value="alipay">
          <label for="alipay">Alipay</label><br>
          <input type="radio" id="wechatpay" name="paymentMethod" value="wechatpay">
          <label for="wechatpay">WeChat Pay</label><br>
          <input type="radio" id="wechatpay" name="paymentMethod" value="wechatpay">
          <label for="PayPal">PayPal</label><br>
        </div>
        <div class="payment-qrcode">
            <p>  Payment QR-Code</p>
          </div> -->
      </div>
      
        
    </div>
      <Footer/>
      <CustomerService/>
    </div>
  </template>
  
  <script>    
  import Header from '@/components/homepage/Header.vue';
  import Footer from '@/components/homepage/Footer.vue';
  import CustomerService from '@/components/CustomerService.vue';
  //import { CountryRegionSelect } from 'vue-country-region-select';
  export default {
    components: {
      Header,
      Footer,
      CustomerService//,    CountryRegionSelect

    },
    data() {
    return {
        attraction: {
        thumbnails: ['https://via.placeholder.com/400x200','https://via.placeholder.com/200x200','https://via.placeholder.com/300x200','https://via.placeholder.com/100x200'],
        contactName: 'The Grand Palace',
        contact: '093201341',        
        status: 'Open',
        rate: ref(3.7),
        soldTickets: 1000,
        title: 'Royal Grand Palace Guided Tour  ',
        dateTime: 'March 10, 2024 10:00 AM',
        location: 'Bangkok, Thailand',
        price: '$50',
        description: 'Experience the beauty and grandeur of the Royal Grand Palace in Bangkok with a guided tour.',
        comments: [
          { user: 'John Doe', text: 'This was an amazing experience!', image: 'https://via.placeholder.com/200x200', video: '', star:'3.5' },
          { user: 'Jane Smith', text: 'Highly recommend it to everyone.', image: '', video: 'https://www.example.com/video.mp4' , star:'3.9'}
        ]
      },
      seats: [
        { type: 'Standard', booked: 2, price: 50 },
        { type: 'VIP', booked: 1, price: 150 }
      ]
      //selectedCountry: null
    };
  },
  computed: {
    totalAmount() {
      return this.seats.reduce((total, seat) => total + (seat.price * seat.booked), 0);
    }
  }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: space-between;
    gap: 50px; /* Add space in the middle */
  }
  
  .left-section {
    flex: 2; /* Make left section wider */
  }
  
  .right-section {
    flex: 1;
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  form {
    display: grid;
    gap: 5px;
  }
  
  label {
    font-weight: bold;
  }
  
  select, input[type="text"], input[type="email"], input[type="tel"] {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  button {
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  input[type="radio"] {
    margin-right: 10px;
  }
  .total-amount {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .price-details {
    margin-bottom: 10px;
  }
  
  .price-details .item, .total {
    display: flex;
    justify-content: space-between;
  }
  .total {font-weight: bold;}
  .actions {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .book-button, .add-to-cart-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .book-button:hover, .add-to-cart-button:hover {
    background-color: #0056b3;
  }
  
  .acknowledgement {
    font-size: 12px;
  }
  
  </style>
  