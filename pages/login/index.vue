<template>
    <div class="app">
        <!-- <HeaderNoLogin /> -->
        <div class="box">
            <aside class="left">
                <div class="left-login">
                    <h1>LOGIN</h1>
                    <form class="login-form">
                        <div class="up">
                            <label for="school-id" ></label>
                            <el-input style="width: 400px; height: 50px;border-radius: 20px" v-model="sid" type="text" id="school-id" name="school-id" required placeholder="Student/Faculty ID"/>
                        </div>
                        <div class="down">

                          <el-input
                              v-model="password"
                              style="width: 400px; height: 50px;border-radius: 20px"
                              type="password"
                              placeholder="Password"
                              show-password
                          />
                          <button v-loading="loginStatus" @click="login()" class="log-in" type="button">Login</button>
                          
                        </div>
                      
                        
                    </form>
                    <!-- <button class="back" @click="goToHomepage()">Back to Homepage</button> -->
                    
                </div>
                
            </aside>
            <aside class="right">
                <img class="logo" src="assets/login_logo.png">
            </aside>
            
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        sid: '',
        password: '',
        loginStatus: false
      }
    },

    methods: {
      async login() {
        try {
          // Perform login logic here
          console.log('Logging in with:', this.sid, this.password);
          this.loginStatus = true

          const response = await axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/login', {
            sid: this.sid,
            password: this.password
          },{
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          }
          );
          console.log("User login successfully");
          console.log(response.data);
          this.loginStatus = false
          // Set cookie asynchronously
          // const cookie = useCookie('secourse', {
          //   secure: true,
          //   sameSite: 'None'
          // });

          // cookie.value = response.data.secourse;
          localStorage.setItem("Username", response.data.user.name)
          localStorage.setItem("SID", response.data.user.sid)
          localStorage.setItem("Avatar", response.data.user.avatar)
          localStorage.setItem("Email", response.data.user.email)
          localStorage.setItem("ChatID", response.data.user.chat_id)
          localStorage.setItem("ChatAccessKey",response.data.user.chat_access_key)

          // Redirect to another page only after cookie is set
          this.$router.push('/');
        } catch (error) {
          console.log("Error login");
          this.loginStatus = false

          ElNotification.error({
            title: 'Error logging in',
            message: error,
            duration: 5000, 
            offset: 100 
          });
        }
      }
    }
  }


  </script>

  <style scoped>

  *{
    font-family: sans-serif;
  }

.app {
    height: 100vh; 
    background-image: url('/assets/welcomeBanner/banner5.jpg'); 
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    opacity: 0.9;
}
.box {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%; 
    height: 60%; 
    border: 1px solid #ccc; 
    background-color: rgb(0, 128, 128);
    border-radius: 5px;
    opacity: 0.9;
}

.left, .right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  padding: 20px;
}

.left {
  border-right: solid 1px silver;
}

.right {
  border-left: 1px black;
}

.left-login {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%; 
    width: 100%;
    margin-bottom: 1em;
    gap: 1em;
}   



.down{
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
  border-radius: 20px;

}
.login-form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.left-login h1 {
    text-align: center;
    font-size: 200%;
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 0.5em;
}



.log-in {
    background-color: #3d9140; 
    border: none;
    color: white;
    padding: 8px 3px; 
    text-align: center;
    text-decoration: none;
    display: inline-block;
    width: 90%; 
    height: 50px;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 12px; 
    margin-top: 10px;
    
}
.log-in:hover {
    background-color: #2a6e2c;
}
.logo{
    width: 80%;
    height: 80%;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-left: 40px;

}

@media (max-width: 1024px) {
  .box {
    width: 90%;
    height: auto;
}
  .left, .right {
    width: 100%;
    padding: 10px;
    border: none;
}
.left {
    border-bottom: solid 1px silver;
}

}

@media (max-width: 700px) {
  .left-login h1 {
    font-size: 1.5rem;
}
.login-form input, .log-in {
    height: 40px;
}
.logo {
    display: none;
}
.right{
  display: none;
}
}


  </style>
  