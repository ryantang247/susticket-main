<template>
    <div id="app">
        <!-- <HeaderNoLogin /> -->
        <div class="box">
            <aside class="left">
                <div class="left-login">
                    <h1>LOGIN</h1>
                    <form class="login-form">
                        <div class="up">
                            <label for="school-id" ></label>
                            <input type="text" id="school-id" name="school-id" required placeholder="Student/Faculty ID">
                        </div>
                        <div class="down">
                                <label for="password" required placeholder="Password"></label>
                                <input type="password" id="password" name="password" required placeholder="Password">
                        </div>
                        <button class="log-in" type="submit">Login</button>
                    </form>
    
                </div>
                
            </aside>
            <aside class="right">
                <img class="logo" src="assets/login_logo.png">
            </aside>
        </div>
    </div>
  </template>
  
  <script>
  import HeaderNoLogin from '../../components/HeaderNoLogin.vue';

  </script>
  
  <style scoped>
body{
    background-color: ghostwhite;
}
.box {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%; /* Set your desired width */
    height: 60%; /* Set your desired height */
    border: 1px solid #ccc; /* Optional: Add border for visualization */
    background-color: rgb(0, 128, 128);
}

.left{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    border-right: solid 1px silver;
    flex-direction: column;
}

.right{
    display: flex;
    border-left: 1px black;
    display: flex; /* Make them flex containers */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    flex-direction: column;
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

.login-form input{
    box-sizing: border-box;
    background-color: ghostwhite;
    width: 400px;
    height: 60px;
    border-radius: 12px;
    border: none;
    text-align: center;
    margin-bottom: 2px;

}

.log-in {
    background-color: #3d9140; /* Set the background color */
    border: none;
    color: white;
    padding: 8px 3px; /* Set the padding */
    text-align: center;
    text-decoration: none;
    display: inline-block;
    width: 400px; 
    height: 50px;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 12px; /* Set the border radius */
    
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
  </style>
  