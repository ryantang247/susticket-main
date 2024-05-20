<template>
  <div>
    <!-- Chat button/icon -->
    <div v-if="!showChatBox" class="chat-button" @click="toggleChatBox">
      <img src="/assets/header/cs.png" alt="Chat Icon">
    </div>

    <!-- Chat box component -->
    <div v-show="showChatBox" class="chat-box">
      <div>
        <button class="close-btn" style="margin-bottom:10px " @click="closeChatBox">x</button> <!-- Close button -->

      </div>

      <div >

        <ClientOnly>
        <ChatEngineWrapper>
          <ChatSocket
              :projectID="projectId"
              :chatID="chatID"
              :chatAccessKey="chatAccessKey"
              :senderUsername="username"
          />

          <ChatFeed/>
        </ChatEngineWrapper>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { ChatFeed,ChatEngineWrapper,ChatSocket  } from 'react-chat-engine';
// const {applyReactInVue} = require('veaury')
import  {applyReactInVue} from 'veaury';
// const config = useRuntimeConfig()

export default {
  components:{
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    ChatFeed: applyReactInVue(ChatFeed),
    ChatEngineWrapper: applyReactInVue(ChatEngineWrapper),
    ChatSocket:applyReactInVue(ChatSocket)

  },
  data() {
    return {
      newMessage: '',
      messages: [],
      showChatBox: false, // Initially set to false
      projectId: useRuntimeConfig().public.chatProjectId,
      privateKey: useRuntimeConfig().public.chatPrivateKey,
      username: '',
      chatID: '',
      chatAccessKey: ''
    };
  },
  mounted(){
    console.log()
    if (process.client) {
      this.chatID = localStorage.getItem("ChatID")
      this.username = localStorage.getItem("Username")
      this.chatAccessKey = localStorage.getItem("ChatAccessKey")

    }

  },
  methods: {
//     <!--
//     AI-generated-content
//     tool: ChatGPT
//     version: latest
//     usage: Inititally used this to create a placeholder for the customer service chat
// -->
    toggleChatBox() {
      this.showChatBox = !this.showChatBox;
      if (this.showChatBox) {
        // If chat box is shown, you may want to do additional actions, such as initializing the chat
        // For example, call a method to initialize the chat service
        // this.initializeChatService();
        // In this case, you can call receiveMessageFromService to initiate the conversation
        //   this.receiveMessageFromService("Welcome to our customer service!");
      } else {
        // If chat box is hidden, you may want to do additional actions, such as closing the chat
        // For example, call a method to close the chat service
        this.closeChatService();
      }
    },
    closeChatBox() {
      this.showChatBox = false;
      // Optionally, perform any additional actions upon closing the chat box
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      this.messages.push({ sender: 'user', text: this.newMessage });
      this.newMessage = '';
      this.receiveMessageFromService(); // recieved message from admin?
    },
    receiveMessageFromService(text) { // Pass text parameter to customize the message
      const response = text || 'Hello! How can I assist you today?'; // Use provided text or default message
      this.messages.push({ sender: 'service', text: response }); // Push the message from customer service to the messages array
      this.scrollToBottom();
    },
    scrollToBottom() {
      const messagesContainer = this.$refs.messages;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
};
</script>

<style scoped>
.header {
  font-size: 16px;
}
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 600px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f0f0f0;
  padding: 10px;

}

.header {
  background-color: #007bff;
  color: #fff;
  padding: 13px;
  text-align: center;
}

.messages {
  height: 300px; /* Adjust the height of the message display area */
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 3px;
}

.message {
  overflow-y: auto;
  padding: 3px;
  text-align: right;
}

.user-message {
  background-color: #007bff;
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
  display: inline-block;
  max-width: 70%; /* Optionally, set a max-width to prevent message box from becoming too wide */
  text-align: left;

}

.service-message {
  background-color: #e6e6e6;
  padding: 8px;
  border-radius: 8px;
  text-align: left;
  max-width: 70%;

}

.input {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
}

.input button {
  margin-left: 10px;
  padding: 10px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 2000;
}
.chat-button {
  position: fixed; /* Fixed position relative to the viewport */
  bottom: 20px; /* 20px from the bottom */
  right: 20px; /* 20px from the right */
  z-index: 1000; /* Make sure it's above other elements */
}
.chat-button img{
  width: 70px;
  height: 70px;
  cursor: pointer;

}
.chat-button:hover img {
  transform: scale(1.1); /* Optional: Scale up the image on hover */
}
</style>
