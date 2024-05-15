<template>
  <div class="confirmation-container">
    <!-- User data form -->
    <div class="user-data">
      <h2>User Data</h2>
      <el-form :model="formData" ref="formData" :rules="formRules" label-width="120px">
        <el-form-item label="Name" prop="name">
          <el-input v-model="formData.name" placeholder="Enter your name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="formData.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="formData.phone" placeholder="Enter your phone number"></el-input>
        </el-form-item>
        <el-form-item label="Passport" prop="passport">
          <el-input v-model="formData.passport" placeholder="Enter your passport number"></el-input>
        </el-form-item>
        <!-- Add other fields as needed -->
      </el-form>
    </div>

    <!-- Receipt of price accumulation -->
    <div class="receipt">
      <h2>Receipt</h2>
      <div v-if="selectedSeats.length > 0">
        <div v-for="seat in selectedSeats" :key="seat" class="receipt-item">
          Seat {{ seat }} - $10
        </div>
        <div class="divider"></div> <!-- Divider for calculations -->
        <div class="total-price">Subtotal: ${{ totalPrice }}</div>
        <div class="tax">Tax: ${{ tax }}</div>
        <div class="hospitality-fee">Hospitality Fee: ${{ hospitalityFee }}</div>
        <div class="total-amount">Total Amount: ${{ totalAmount }}</div>
      </div>
      <div v-else>No seats selected</div>
    </div>

    <!-- Seat selection -->
    <div class="seat-selection">
      <h2>Seat Selection</h2>
      <!-- Add your seat selection component here -->
      <!-- For example, <SeatSelection :seats="availableSeats" @seatSelected="updateSelectedSeats" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        passport: ''
      },
      formRules: {
        name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
        email: [{ required: true, message: 'Please enter your email', trigger: 'blur' }, { type: 'email', message: 'Please enter a valid email', trigger: ['blur', 'change'] }],
        phone: [{ required: true, message: 'Please enter your phone number', trigger: 'blur' }],
        passport: [{ required: true, message: 'Please enter your passport number', trigger: 'blur' }]
        // Add other form validation rules as needed
      },
      selectedSeats: [], // Assuming you have selected seats data
      totalPrice: 0, // Assuming you have total price data
      tax: 0, // Assuming you have tax data
      hospitalityFee: 0 // Assuming you have hospitality fee data
    };
  },
  computed: {
    totalAmount() {
      return this.totalPrice + this.tax + this.hospitalityFee;
    }
  }
};
</script>

<style scoped>
.confirmation-container {
  display: flex;
}

.user-data {
  flex: 2;
  margin-right: 20px;
}

.receipt {
  flex: 1;
  margin-left: 20px;
}

.seat-selection {
  flex: 2;
}

.receipt-item {
  margin-bottom: 5px;
}

.divider {
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.total-price,
.tax,
.hospitality-fee,
.total-amount {
  font-weight: bold;
}
</style>
