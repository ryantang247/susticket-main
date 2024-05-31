<template>
    <div class="give-rating-container">
        <div class="header">
            <img src="/assets/header/backarrow.png" class="back" @click="goBackorCancel">
            <h2>Rate event</h2>
        </div>
        <div class="content">
            <div class="rate-block">
                <span class="demonstration">How was the event?</span>
                <el-rate v-model="value2" :colors="colors" />
            </div>
            <div class="upload-box">
                <el-upload
                v-model:file-list="fileList"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :on-change="handleChange"
                >
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            Upload photos or videos
                        </div>
                    </template>
                </el-upload>
            </div>
            
            <textarea class="feedback" placeholder="Share your thoughts about this event ...."></textarea>
            <button class="submit-button" @click="submitted">Submit</button>
            <button class="cancel-button" @click="goBackorCancel">Cancel</button>
        </div>
        <CustomerService/>
        
    </div>
      
</template>
<script setup>
    import CustomerService from '@/components/CustomerService.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const value2 = ref(null);
    const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
    const fileList = ref([]);

    // If you're not using TypeScript, you cannot type the parameters
    // You should remove the type annotation here
    const handleChange = () => {
        fileList.value = fileList.value.slice(-5);
    }

    const goBackorCancel = () => {
        router.push('/myTickets/myTickets');
    };
    const submitted = () => {
        router.push('/giveRating/reviewsubmitted');
    }

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
    
    .give-rating-container{
        max-width: 600px;
        height: 700px;
        margin: 0 auto;
        border: 2px solid #6DC9C8;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        padding: 20px;
        margin-top: 50px;
    }
    .header {
        text-align: left;
        display: flex;
        align-items: center; /* This centers the children vertically */
        margin-bottom: 20px;
    }
    
    .back{
        width: 25px;
        height: 25px;
    }
    .back:hover{
        background-color: #ccc;
        border-radius: 50%;
    }
    .header h2{
        margin-left: 20px;
    }

    .content {
        display: flex;
        justify-content: center; /* Center children horizontally */
        flex-direction: column; /* Stack children vertically */
        align-items: center; /* Align children in the cross axis for flex-direction: column */
        text-align: center;
    }
    
    .rate-block {
        padding: 30px 0;
        text-align: center;
        border-right: solid 1px var(--el-border-color);
        display: inline-block;
        width: 49%;
        box-sizing: border-box;
      }
      .rate-block:last-child {
        border-right: none;
      }
      .rate-block .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        margin-bottom: 20px;
      }
    .upload-box{
        width: 93%;
        height: 70px;
        border: 1px solid #ccc;
        text-align: center;
        align-items: center;
        margin-bottom: 5px;
        padding-top: 5px;
    }

    
    .add-photos {
        margin: 20px 0;
    }
    
    .add-photos-button {
        background-color: #f0f0f0;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
    }
    
    .feedback {
        width: 90%;
        height: 130px;
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
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