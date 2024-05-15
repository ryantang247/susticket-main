<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to generate a template for checkoutPage + CSS
-->
<template>
    <div class="checkout-page">
      <div class="checkout-container">
        <div class="billing-information">
          <h2>Checkout</h2>
          <form>
            <div class="form-group">
              <input type="text" placeholder="First name" required />
              <input type="text" placeholder="Last name" required />
            </div>
            <div class="form-group">
              <input type="email" placeholder="Email address" required />
            </div>
            <div class="form-group">
              <h3>Pay with</h3>
              <label><input type="radio" name="payment" value="alipay" /> Alipay</label>
            </div>
            <div class="form-group">
              <input type="checkbox" id="terms" />
              <label for="terms">by selecting payment method, I agree to Terms of Services</label>
            </div>
            <button type="submit">Place order</button>
          </form>
        </div>
        <div class="order-summary">
          <h3>Order summary</h3>
          <p>1 x regular ¥50.00</p>
          <p>Subtotal ¥50.00</p>
          <p>Fees ¥0.00</p>
          <p>Delivery ¥0.00</p>
          <p>Total ¥50.00</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Your script here
  </script>
  
  <style>
  /* Your styles here */
  .checkout-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .checkout-container {
    display: flex;
    justify-content: space-between;
    width: 900px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
  }
  
  .billing-information {
    flex: 1;
    margin-right: 20px;
  }
  
  .order-summary {
    width: 300px;
    padding: 20px;
    border-left: 1px solid #eee;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group button {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group label {
    display: block;
    margin-top: 0.5rem;
  }
  
  .form-group input[type="checkbox"] {
    margin-right: 5px;
  }
  
  button {
    background-color: #284949;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #162d2d;
  }
  </style>
  