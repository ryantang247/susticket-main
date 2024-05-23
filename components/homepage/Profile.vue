<template>
    <transition name="fade">
      <div class="profile-box" v-if="isVisible">
        <div v-if="loginStatus" class="profile-content">
          <h2>{{ name }}</h2>
          <p>{{ email }}</p>
          <p><b> 123 coins</b></p>

          <el-button  @click="logout" type="danger" round class="logout-btn">Log out</el-button>

        </div>
        <div v-else class="profile-content">
          <h2>Guest</h2>
          <el-button @click="logout" type="primary" round class="logout-btn">Login</el-button>

        </div>
      </div>
    </transition>
  </template>
  
  <script>

  export default {
    props:{
      isVisible: Boolean
    },
    data() {
      return {
        sid: "",
        name: "",
        email: "",
        loginStatus: true
      }
    },
    mounted(){
      if (process.client) {
      const status = localStorage.getItem("Status")

        if (status){
            this.sid = localStorage.getItem("SID")
            this.name = localStorage.getItem("Username"),
            this.email = localStorage.getItem("Email")
            this.email = localStorage.getItem("avatar")
          }
      }
    },
    methods: {
      logout() {
          console.log("User logout successfully");
          // Set cookie asynchronously
          const cookie = useCookie('secourse');
          cookie.value = null;
        if (process.client) {
          localStorage.setItem("Username", null)
          localStorage.setItem("SID", null)
          localStorage.setItem("Avatar", null)
          localStorage.setItem("Email", null)
          localStorage.setItem("Status", null)
        }

          // Redirect to another page only after cookie is set
          this.$router.push('/login');

      }
    }
  }
  import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

  </script>

  <style scoped>
  *{
    font-family: sans-serif;
  }
  .profile-box {
    position: absolute;
    right: 20px; /* Adjust as needed */
    top: 70px; /* Adjust based on the header height */
    background-color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    border-radius: 8px;
    padding: 20px;
    width: 250px; /* Adjust width as necessary */
    z-index: 100;
    align-items: center;
    text-align: center;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  