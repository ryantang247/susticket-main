<template>
    <div class="found-event-page">
        <Header />
        <div class="label-page">
          <img src="~/assets/header/backarrow.png" alt="Back" @click="goToHomepage">
          <h1>Find Event</h1>
        </div>
        <div class="container">
            <AMap/>
        </div>
        <Footer />
        <CustomerService/>
      </div>
      
</template>

<script setup>
  import Header from '@/components/homepage/Header.vue';
  import Footer from '@/components/homepage/Footer.vue';
  import CustomerService from '@/components/CustomerService.vue';
  import AMap from '~/components/Map/AMap.vue'

  import { useRouter } from 'vue-router';

    const router = useRouter();

    const goToHomepage = () => {
        router.push('/');
    };
</script>

<style scoped>
  *{
    font-family: sans-serif;
  }

  .label-page{
    display: flex;
    align-items: center;
  }
  .label-page h1{
    font-family: sans-serif;
    font-size: 40px;
    margin-left: 20px;
  }
  .label-page img{
    margin-left: 10px;
    width: 50px;
    height: 50px;
  }
  .label-page img:hover{
    background-color: rgb(189,189,189);
    border-radius: 50%;
  }
  .container{
    width: 80%;
    margin-left: 50px;
    border: 1px solid #6DC9C8
  }
</style>