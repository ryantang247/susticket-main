<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to generate a template for the booking page, modified using own rules and data
-->
<template>
  <div class="booking-container">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="booking-form"
      :size="formSize"
      status-icon
    >
      <!-- Form Fields -->
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <!-- Add more form fields for phone number, passport, etc. -->

      <!-- Seat Selection -->
      <div class="seat-selection">
        <h2>Select Your Seat</h2>
        <!-- Your seat selection component here -->
      </div>

      <!-- Submit Button -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Confirm Booking</el-button>
      </el-form-item>
    </el-form>

    <!-- Receipt Section -->
    <div class="receipt">
      <h2>Receipt</h2>
      <!-- Divider for receipt sections -->
      <div class="divider"></div>
      <!-- Display receipt details -->
      <div class="receipt-details">
        <div class="item">Subtotal: ${{ subtotal }}</div>
        <div class="item">Tax: ${{ tax }}</div>
        <div class="item">Hospitality Fee: ${{ hospitalityFee }}</div>
        <!-- Add more receipt items as needed -->
      </div>
      <!-- Total Price -->
      <div class="total-price">Total Price: ${{ totalPrice }}</div>
    </div>
  </div>
</template>

<script>
  //   import { defineComponent } from '@vue/composition-api'
  //   export default defineComponent({
  //   setup() {
        
  //   },
  // })
import { reactive, ref } from 'vue'

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        email: '',
        // Add more fields for phone number, passport, etc.
      },
      rules: {
        name: [
          { required: true, message: 'Please enter your name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ]
        // Add more validation rules for other fields as needed
      },
      formSize: '', // Adjust form size as needed (default, small, large)
      subtotal: 100, // Example subtotal
      tax: 10, // Example tax
      hospitalityFee: 5, // Example hospitality fee
      totalPrice: 0 // Define totalPrice property
    }
  },
  methods: {
    submitForm(formRef) {
      formRef.value.validate((valid) => {
        if (valid) {
          // Logic to submit form data
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.booking-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.booking-form {
  margin-bottom: 20px;
}

.seat-selection {
  margin-bottom: 20px;
}

.receipt {
  border: 1px solid #ccc;
  padding: 20px;
}

.divider {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.receipt-details {
  margin-bottom: 10px;
}

.item {
  margin-bottom: 5px;
}

.total-price {
  font-weight: bold;
}
</style>
