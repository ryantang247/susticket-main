<template>
    <!-- Form for adding/editing event -->
    <div v-if="loadChart">
      <SeatsioSeatingChart
          :workspaceKey="workspaceKey"
          :event="eventList[0].seatsioEventsKey"
          :pricing="pricing"
          region="oc"
          @objectSelected="onObjectSelected"
          @objectDeselected="onObjectDeselected"
      />
      <el-row justify="center">
      <el-col cols="auto">
        <el-button density="comfortable" @click="bookEvent">Book Ticket</el-button>
      </el-col>
    </el-row>
    </div>
</template>

<script>
import axios from "axios";
import { SeatsioEventManager, SeatsioSeatingChart} from '@seatsio/seatsio-vue';
const username = '5f4908aa-ff2b-42c5-ad29-62a8d60b8207';

export default {
  components: {SeatsioSeatingChart ,SeatsioEventManager},
  data() {
    return {
      workspaceKey: this.$config.workspaceKey,
      eventList: [],
      loadChart:false,
      pricing: [],
      objects: [],
      eventForm: {
        name: '',
        date: '',
        location: '',
        description: '',
        imageList: [],
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.eventForm.validate(valid => {
        if (valid) {
          // Handle form submission, e.g., send data to backend
          console.log('Form submitted:', this.eventForm);
          this.$emit('submit', this.eventForm);
        } else {
          console.log('Validation failed');
          return false;
        }
      });
    },
    bookEvent(){
      axios.post(`https://api-oc.seatsio.net/events/${this.eventList[0].seatsioEventsKey}/actions/book`, {
        objects: this.objects
      },{
        auth: {
          username: `${username +':'}`,
        }
      }).then(response => {
                  console.log("Book venue successfully")
                  console.log(response.data)
      })
    },
    handleUploadSuccess(response, file, fileList) {
      console.log('Uploaded successfully:', file);
      this.eventForm.imageList = fileList;
    },
    handleUploadRemove(file, fileList) {
      console.log('Removed:', file);
      this.eventForm.imageList = fileList;
    },
    editEvent() {
      this.$emit('edit');
    },
    onObjectDeselected(selectedObjects){
      console.log(selectedObjects.label);
      this.objects = this.objects.filter(object => object.label !== selectedObjects.label);
    },
    onObjectSelected(selectedObjects){
      console.log(selectedObjects.label);
      this.objects.push(selectedObjects.label)
    }
  },
  mounted(){
    axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents')
        .then(response => {

          console.log("All events ", response.data)
          response.data.forEach(item => {

            this.eventList.push(item)

          });
          console.log(this.eventList[0].seatsioEventsKey)
          axios.get(`https://api-oc.seatsio.net/events/${this.eventList[0].seatsioEventsKey}` ,{
            auth: {
              username: `${username +':'}`,
            }
          }).then(response => {
            console.log("Seatsio chart: " ,response.data)
            this.loadChart = true
            this.pricing = JSON.parse(this.eventList[0].price)
            console.log(this.pricing)
        })
        .catch(error => {
          console.log("Error fetching/Parsing Events", error)
          ElNotification.error({
            title: 'Error',
            message: `Error fetching events. ${error.message}`,
            offset: 100,
          }); 
        });
  })
  }

};
</script>

<style scoped>
.event-card {
  width: 300px;
  margin-bottom: 20px;
}
.event-header {
  font-size: 18px;
  font-weight: bold;
}
.event-details {
  padding: 15px;
}
.event-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>
