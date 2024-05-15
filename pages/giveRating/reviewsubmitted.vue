<template>
    <div class="review-submitted">
        <div class="header">
            <h4>Review</h4>

        </div>
        <div class="content">
            <img src="/assets/succes_submitted.png">
            <button class="submit-button" @click="goBack">Back</button>
            <button class="cancel-button" @click="goHome">Home</button>
        </div>
        <CustomerService/>
        
    </div>
      
</template>
<script setup>
    import CustomerService from '@/components/CustomerService.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const goBack = () => {
        router.push('/myTickets/myTickets');
    };
    const goHome = () => {
        router.push('/');
    };

</script>


<style scoped>
    *{
        font-family: sans-serif;
        text-align: center;
    }
    
    .review-submitted{
        max-width: 600px;
        height: 700px;
        margin: 0 auto;
        border: 2px solid #6DC9C8;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        padding: 20px;
        margin-top: 50px;
    }
    .header {
        display: flex;
        align-items: center; /* This centers the children vertically */
        text-align: center;
        margin-bottom: 20px;
    }

    .header h4{
        text-align: center;
        margin: 0;
    }

    .content{
        text-align: center;
    }
    .content img{
        width: 200px;
        height: 200px;
        margin-top: 100px;
        margin-bottom: 100px;
    }
    
    .submit-button, .cancel-button {
        width: 95%;
        background-color: #284949;
        border: none;
        padding: 15px 0;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 10px;
        font-size: 20px;
    }
    .cancel-button{
        background-color: #90B1B1;
        border: 1px;
    }
    .submit-button:hover{
        background-color: #232d2d;
    } 
    .cancel-button:hover{
        background-color: #284949;
    }

</style>