<template>
    <div class="give-rating-container">
        <div class="header">
            <img src="/assets/header/backarrow.png" class="back" @click="goBackorCancel">
            <h2>Event Details</h2>
        </div>
        <div class="content">
          <div class="rate-block">
            <span class="demonstration">How was the event?</span>
            <el-rate v-model="rating" :colors="colors" />
          </div>
            <textarea class="feedback" v-model="feedback" placeholder="Share your thoughts about this event ...."></textarea>

            <div class="upload-box">
                <el-upload
                   :file-list="fileList"
                   :limit="1"
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
            <button class="submit-button" @click="submitted">Submit</button>
            <button class="cancel-button" @click="goBackorCancel">Cancel</button>
        </div>
        <CustomerService/>
        
    </div>
      
</template>
<script setup>
    import CustomerService from '@/components/CustomerService.vue';
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { ElLoading, ElNotification } from 'element-plus';

    const router = useRouter();
    const route = useRoute()
    const currentEvent = route.params.id;
    const feedback = ref(''); // Define feedback as a reactive variable

    const rating = ref(null);
    const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
    const fileList = ref([]);


    // If you're not using TypeScript, you cannot type the parameters
    // You should remove the type annotation here
    const handleChange = (uploadFile) => {
      // Create a new FileReader object
      const reader = new FileReader();

      /*
      * ChatGPT function: For converting files to base64
      * */
      reader.onload = (event) => {
        // Retrieve the base64 encoded string from the reader result
        const base64String = event.target.result;

        // Log the base64 string (you can do further processing here)
        console.log("Base64 encoded file: ", base64String);

        // Set the base64 string to fileList.value or perform further actions
        fileList.value.push(base64String);
      };

      // Read the file as a data URL (base64 encoded)
      reader.readAsDataURL(uploadFile.raw);
    }
    const postComment = async (eventId, text, picture) => {
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.7)',
        });
    try {
        console.log()
        // Make a POST request to the API endpoint
        const response = await axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/postComment', {
        eventId: eventId,
        text: text,
        picture: picture,
          rating: rating.value
        } , {//AxiosRequestConfig parameter
          withCredentials: true //correct
        } );
        // Handle the response as needed
        console.log(response.data); // Assuming the API returns data
        // You can also show a success message or update the UI
    } catch (error) {
        console.error('Error posting comment:', error.response);
        ElNotification.error({
            title: 'Error',
            message: 'Error posting comments.'+error,
            offset: 100
        });
        // Handle errors, show error message, etc.
        showErrorNotification(`Failed to submit comment. ${error.response.data.error}`);
    }
    finally {
      loading.close();
    }
    };
    const showErrorNotification = (message) => {
        // You can use Element Plus Notification component to show error messages
        ElNotification.error({
            title: 'Error',
            message: message,
            duration: 5000, // Duration in milliseconds
            offset: 100 // Notification offset from top
        });
    }
    const goBackorCancel = () => {
        router.push('/events/'+route.params.id);
    };
    const submitted = async () => {
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        try {
            // Call the postComment function with appropriate parameters
            await postComment(route.params.id, feedback.value, fileList.value[0]);
            // Redirect the user to the event details page after submitting the comment
            router.push('/events/' + route.params.id);
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Handle errors, show error message, etc.
            ElNotification.error({
                title: 'Error',
                message: 'Error submitting comments.'+error,
                offset: 100
            });
        }
    finally {
      loading.close();
    }
    }
/**
 * AI-generated-content
 * tool: ChatGPT
 * version: 3.5
 * usage: ask gpt for debug the styling
 * slight copy the code from its response ad modified according the desired style
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