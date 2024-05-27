<template>
  <div >
      <Header />
      <div class="label-page">
        <img src="~/assets/categorymenu/back.png" alt="Back" @click="goToHomepage">
        <h1>My Events</h1>
      </div>

      <div v-if="dates" class="calendar-container">
        <ElCalendar v-model="value"  @event-click="handleEventClick" >
          <template  #date-cell="{data}">
            <p>{{data.day}}</p>
            <div v-if="getEventOnDate(data.day)" class="grid-container">
              <div v-for="(item, index) in getEventOnDate(data.day)" :key="index" >
                <el-tooltip
                    :content="generateTooltipContent(item)"
                    raw-content
                >
                  <div class="circle" :style="{ backgroundColor: colorMap[item.id] }">
                  </div>
                </el-tooltip>

              </div>
            </div>
          </template>
        </ElCalendar>

      </div>
      
      <Footer />
      <CustomerService/>
  </div>
</template>



<script setup>
  import Header from '@/components/homepage/Header.vue';
  import Footer from '@/components/homepage/Footer.vue';
  import CustomerService from '@/components/CustomerService.vue';

  import { ref } from 'vue'
  import { ElLoading, ElNotification , ElCalendar } from 'element-plus';
  import 'element-plus/dist/index.css';

  const value = ref(new Date())
  const range = ref([]);

  import { useRouter } from 'vue-router';
  const router = useRouter();

  const goToHomepage = () => {
    router.push('/');
  };
  const dates = ref([])
  const colorMap = ref({})

  const events = ref([
    {
    id: '635b9c0b-d988-4853-9d44-adef7a5e40ca',
    thumbnail: 'https://res.cloudinary.com/doa7ha032/image/upload/v1710956300/VenuePhoto/o0n7w0gytxkixsu477b7.jpg',
    title: 'Fun Event',
    description: 'Very Fun!',
    startDate: '2024-03-12T16:00:00.000Z',
    endDate: '2024-03-14T16:00:00.000Z',
    seatsioEventsKey: '538237a3-0302-466c-9319-b881a8d21765'
  },

]);

const getEventOnDate = (date) => {
  for (const [key, value] of Object.entries(dates.value)) {
    // console.log("Comparing: "+ key + " " +date)
    if (key === date) {
      // console.log("Found some events ",dates.value[key])
      return value;

    }else{
    }
  }
  return []

};
// Fetch events data from the API endpoint

  /**
   * AI-generated-content
   * tool: ChatGPT
   * version: latest
   * usage: I asked it on creating an algorithm for creating dates that has an event using start and endDate
   */
  const specialDates =() => {
    events.value.forEach(event => {
      // console.log('event special date method:', event)
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const isoDate = date.toISOString().split('T')[0];
        if (!dates.value[isoDate]) {
          dates.value[isoDate] = [];
        }
        dates.value[isoDate].push(event);
      }
    });
    console.log("Dates in array",dates.value)
  };

  const generateTooltipContent = (item) => {
    return `
     <div>
      <img src="${item.thumbnail}" alt="${item.title}" style="width: 400px; height: 300px;">
      <p>${item.title}</p>
    </div>
  `;
  };

  /**
   * AI-generated-content
   * tool: ChatGPT
   * version: latest
   * usage: I asked it on creating an algorithm generating a color generator
   */
  const generateRandomColor = () => {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Calculate the luminance (perceived brightness) of the color
    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    // Ensure the color is not too light
    if (luminance > 0.5) {
      // If too light, generate darker colors by reducing the RGB values
      const min = 100;
      const max = 200;
      const offset = Math.floor(Math.random() * (max - min + 1)) + min;
      return `rgb(${red - offset}, ${green - offset}, ${blue - offset})`;
    } else {
      // Otherwise, return the generated color
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

const fetchEvents = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents');
    const eventData = await response.json();
    events.value = eventData;
    console.log(eventData);

    events.value.forEach((event) => {

        colorMap.value[event.id] = generateRandomColor()
       }
    )
    console.log("ColorMap",colorMap.value )

    specialDates()
  } catch (error) {
    console.error('Error fetching events:', error);
    ElNotification.error({
      title: 'Error',
      message: `Error fetching events. ${error.message}`,
      offset: 100,
    });    
  }
  finally {
    loading.close();
  }
};

// Call fetchEvents when the component is mounted
onMounted(fetchEvents);

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
    margin-left: 10px;
  }
  .label-page img{
    margin-left: 10px;
    width: 70px;
    height: 70px;
  }
  .label-page img:hover{
    background-color: rgb(189,189,189);
    border-radius: 50%;
  }
  .calendar-container{
    padding: 10px;
    border: 1px solid #6DC9C8;
    width: 90%;
    height: 700px;
    margin-left: 50px;
    margin-bottom: 50px;
    align-items: center;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 5 columns with equal width */
    gap: 5px; /* Gap between the circles */
  }

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
  }

</style>