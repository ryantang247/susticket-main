<template>
    <header class="header">
        <div class="logo">
            <img src="~/assets/header/brand_logo.png" alt="logo" @click="goToHomepage" style="cursor: pointer">
          </div>
        <div class="go-back">

        </div>
    </header>

</template>
<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    function goToHomepage() {
      router.push('/');
    }

    return {
      goToHomepage
    };
  }
};
</script>

<style>
.header {
    width: 100%;
    display: flex;
    background-color: #6DC9C8; 
    text-align: center;
  }
  
  .logo {
    align-items: center;
  }
  .logo img{
    margin-left: 30px;
    height: 45px;
    object-fit: cover;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: 1620px) and (max-height:2160px){
    .logo img{
        height: 45px;
    }
  }
  @media (max-width:1024px) and (max-height:1366px){
    .logo img{
        height: 40px;
    }
  }
  @media (max-width: 830px) and (max-height:1800px){

    .logo img{
        height: 80px;
    }
  }
  @media (max-width:820px) and (max-height:1180px){
    .logo img{
        height: 80px;
    }
  }
  
  @media (max-width: 700px) {
    .logo img{
        height: 80px;
    }
  }
  
  @media (max-width: 450px) {
    .logo img{
        height: 35px;
    }
  }
  

</style>