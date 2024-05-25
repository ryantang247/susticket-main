<template>
  <transition name="fade">
    <div class="profile-box" v-if="isVisible">
      <div v-if="loginStatus" class="profile-content">
        <h2>{{ userProfile.name }}</h2>
        <p>{{ userProfile.email }}</p>
        <el-button type="warning" plain>1000 coins</el-button>
        <el-button @click="logout" type="danger" round class="logout-btn">Log out</el-button>
      </div>
      <div v-else class="profile-content">
        <h2>Guest</h2>
        <el-button @click="login" type="primary" round class="logout-btn">Login</el-button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
// import { useCookie } from 'vue-composable';
import { ElButton } from 'element-plus';
import 'element-plus/theme-chalk/el-button.css';

<<<<<<< HEAD
// Define props to accept user profile data
const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Guest',
      email: '',
      avatar: ''
    })
  },
  isVisible: {
    type: Boolean,
    required: true
=======
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
          // ElNotification.success({
          //   title: 'Success',
          //   message: "Sucessfully log out!",
          //   offset: 100,
          // }
          // );
          // Redirect to another page only after cookie is set
          this.$router.push('/login');

      }
    }
>>>>>>> dd9fbc7ce27c5fec40424ef70415cdbcd8de84da
  }
});

// Define reactive variables
const loginStatus = computed(() => props.userProfile.email !== '');

// Set up the router
const router = useRouter();

// Define methods for login and logout actions
const login = () => {
  router.push('/login'); // Navigate to login page
};

const logout = async () => {
  console.log("User logout successfully");

  // Set cookie asynchronously
  const cookie = useCookie('secourse');
  cookie.value = null;

  if (process.client) {
    localStorage.setItem("Username", null);
    localStorage.setItem("SID", null);
    localStorage.setItem("Avatar", null);
    localStorage.setItem("Email", null);
    localStorage.setItem("Status", null);
  }

  // Redirect to another page only after cookie is set
  await router.push('/');
};
</script>

  <style scoped>
  *{
    font-family: sans-serif;
  }
  .profile-box {
    position: absolute;
    right: 20px; 
    top: 70px; 
    background-color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    border-radius: 8px;
    padding: 20px;
    width: 250px; 
    z-index: 100;
    align-items: center;
    text-align: center;
  }
  .profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .logout-btn{
    margin-top: 10px;
  }
  </style>
  