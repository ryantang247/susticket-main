<template>
  <div class="attraction-details">
    <Header/>
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3"> Event Details </span>
        </template>
      </el-page-header>
      <!-- <el-button class="back-btn" @back="goBack">Back</el-button> 
      <el-button class="close-btn" @click="close">X</el-button>
    </div>-->

    <!-- Main content -->
    <!-- <div class="main-content"> -->
    <el-main>
      <!-- <Thumbnail/> -->
      <!-- <div class="thumbnail">
        <img :src="attraction.thumbnail" :alt="attraction.name">
      </div> -->
      <div class="block text-center">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in attraction.thumbnails" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
<p></p>
      <!-- Details -->
      <div class="details">
        <div class="status">
          <div class="left-container">
            <el-tag type="primary">{{ attraction.status }}</el-tag>
            <!-- <p>Status: {{ attraction.status }}</p> -->
          </div>
          <div class="right-container">
            <span>Rate: {{ attraction.rate }}</span>
            <el-divider direction="vertical" />
            <span>Sold Tickets: {{ attraction.soldTickets }}</span>
          </div>
        </div>
        
        <!-- Title -->
        <h1 class="title">{{ attraction.title }}
            <el-button>Share<i class="fas fa-share-alt"></i></el-button> <!-- Font Awesome icon for share -->
            <el-button>Bookmark<i class="fas fa-bookmark"></i></el-button> <!-- Font Awesome icon for bookmark -->
        </h1>
        
        <!-- Event details -->
        <div class="event-details">
          <p>Date & Time: {{ attraction.dateTime }}</p>
          <p>Location: {{ attraction.location }}</p>
          <p>Price: {{ attraction.price }}</p>
          <span>Venue Id: </span>
            <el-tag size="small">School</el-tag>
          <span></span>
          <p>Description: {{ attraction.description }}</p>
        </div>
      </div>

    <!-- Comments section <v-divider></v-divider>
    -->
    <el-card>
      <template #header>
        <div class="comments">
          <h3>Comments     </h3>
          
        </div>
      </template>
      <div class="comment" v-for="(comment, index) in attraction.comments" :key="index">
        <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{ comment.star } points"
            />
        <p><strong>{{ comment.user }}</strong>: {{ comment.text }}</p>
        <img v-if="comment.image" :src="comment.image" alt="User Comment">
        <video v-if="comment.video" controls>
          <source :src="comment.video" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <el-divider/>
      </div>
      <el-button @click="goToCommentPage">More comments...</el-button>
    </el-card>
    <p>Contact Person: <span>{{ attraction.contactName }}</span> - {{ attraction.contact }}</p>
          
    
  </el-main>

    <!-- Footer -->
    <div class="footer">
      <el-button>Purchase</el-button>
      <el-button>Add to Cart<i class="fas fa-shopping-cart"></i></el-button> <!-- Font Awesome icon for add to cart -->
    </div>
    <CustomerService/>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/homepage/Header.vue';
import Thumbnail from '@/components/eventDetails/Thumbnail.vue';
import Footer from '@/components/homepage/Footer.vue';
import CustomerService from '@/components/CustomerService.vue';
import { ref } from 'vue';
export default {
  components:{Header,Thumbnail,Footer,CustomerService,ref},
  data() {
    return {
      attraction: {
        thumbnails: ['https://via.placeholder.com/400x200','https://via.placeholder.com/200x200','https://via.placeholder.com/300x200','https://via.placeholder.com/100x200'],
        contactName: 'The Grand Palace',
        contact: '093201341',        
        status: 'Open',
        rate: ref(3.7),
        soldTickets: 1000,
        title: 'Royal Grand Palace Guided Tour  ',
        dateTime: 'March 10, 2024 10:00 AM',
        location: 'Bangkok, Thailand',
        price: '$50',
        description: 'Experience the beauty and grandeur of the Royal Grand Palace in Bangkok with a guided tour.',
        comments: [
          { user: 'John Doe', text: 'This was an amazing experience!', image: 'https://via.placeholder.com/200x200', video: '', star:'3.5' },
          { user: 'Jane Smith', text: 'Highly recommend it to everyone.', image: '', video: 'https://www.example.com/video.mp4' , star:'3.9'}
        ]
      }
    }
  },
  methods: {
    goBack() {
      // Navigate back to the dashboard page
      this.$router.push('/dashboard');
    },
    close() {
      // Close the attraction details page (can implement modal closing, for example)
    },
    goToCommentPage() {
      // Navigate to the comment page
      this.$router.push('/comment-page');
    }
  }
}
</script>

<style scoped>
/* Styles for the main container */
.attraction-details {
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* Styles for the header */
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-btn, .close-btn {
  padding: 5px 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

/* Styles for the main content */
.main-content {
  display: flex;
  flex-wrap: wrap;
}

.thumbnail {
  flex: 0 0 50%;
  margin-right: 20px;
}

.details {
  flex: 0 0 50%;
}

/* Styles for the status section */
.status {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.right-container {
  align-content: left;
}

/* Styles for the comments section */
.comments {
  margin-top: 20px;
}

.comment {
  margin-bottom: 10px;
}

.comment img, .comment video {
  max-width: 100%;
  margin-top: 10px;
}

/* Styles for the footer */
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.left-footer, .right-footer {
  display: flex;
  align-items: center;
}

.left-footer el-button, .right-footer el-button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.right-footer el-button {
  background-color: #007bff;
  color: #fff;
}

.right-footer el-button:hover {
  background-color: #0056b3;
}
/* thumbnail */
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 250px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
background-color: #d3dce6;
}
  
</style>