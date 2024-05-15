<template>
    <div class="event">
      <!-- 个人信息展示部分 -->
      <Choose/>
      <div class="bg">
        <el-card class="info-card">
          <div slot="header" class="clearfix header-color">
            <span>{{eventInfo.name}}</span>
          </div>
          <div>
            <el-avatar class="avatar" :src="avatarUrl" alt="User Avatar"></el-avatar>
          </div>
          <div class="event-info">
            <div class="info">
              <p><strong>Venue:</strong> {{ eventInfo.venue }}</p>
              <p><strong>Datetime:</strong> {{ eventInfo.datetime }}</p>
              <p><strong>Description:</strong> {{ eventInfo.description }}</p>
              <p><strong>ContactPerson:</strong> {{ eventInfo.contact }}</p>
              <el-row>
                <el-col :span="24">
                  <div class="tags-container">
                    <el-tag
                        v-for="(k, index) in eventInfo.categories"
                        :key="index"
                        type="primary"
                        class="interest-tag"
                    >
                      {{ k }}
                    </el-tag>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 修改信息按钮 -->
          <el-button type="primary" @click="showEditInfoDialog" plain>修改信息</el-button>
          
        </el-card>
      </div>
      <!-- 上传头像按钮 -->
  
  
      <!-- 其他弹窗和逻辑保持不变 -->
  
      <!-- 修改信息弹窗 -->
      <el-dialog
          title="修改个人信息"
          :visible.sync="editInfoDialogVisible"
          width="45%"
      >
        <div class="edit-info-form">
          <el-form ref="editInfoForm" :model="editedUserInfo">
            <el-form-item label="睡觉时间" prop="sleep">
              <el-time-picker
                  v-model="selectedTimeS"
                  :picker-options="pickerOptions"
                  format="HH:mm:ss"
                  placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="起床时间" prop="wake">
              <el-time-picker
                  v-model="selectedTimeW"
                  :picker-options="pickerOptions"
                  format="HH:mm:ss"
                  placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="个人简介" prop="habits">
              <el-input type="textarea" v-model="editedUserInfo.habits"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contact">
              <el-input v-model="editedUserInfo.contact"></el-input>
            </el-form-item>
            <el-form-item label="兴趣标签" prop="interests">
              <el-row :gutter="20"> <!-- 添加 gutter 为列提供间隔 -->
                <el-col :span="5"> <!-- 每个输入框占据6/24的空间 -->
                  <el-input v-model="editedEventInfo.interests[0]"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="editedEventInfo.interests[1]"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="editedEventInfo.interests[2]"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="editedEventInfo.interests[3]"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEditInfo">取消</el-button>
          <el-button type="primary" @click="saveEditedInfo">保存</el-button>
        </span>
      </el-dialog>
  
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Choose from "~/components/Choose.vue";
  export default {
    components: {Choose},
    data() {
      return {
        pickerOptions: {
          selectableRange: '00:00:00 - 23:59:59'
        },
        avatarUrl: '',
        eventInfo: {
          name: 'Hiking',
          venue: 'Outside',
          datetime: '11:00-7:00',
          contact: 'john.doe@example.com',
          description: 'Fun activity',
          categories: ['','','',''],
        },
        avatarPreview: null,
        editInfoDialogVisible: false,
        selectedFile: null,
        selectedTimeS: null,
        selectedTimeW: null,
        editedEventInfo: {
          wake: '',
          sleep:'',
          contact: '',
          habits: '',
          categories: ['','','',''],
        },
      };
    },
    mounted() {
      this.getEventInfo();
    },
    methods: {
        formatTime(time) {
        // 格式化时间为 HH:mm:ss 字符串
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
        },
        getEventInfo(){
        // axios.get('https://backend.susdorm.online/api/user-information?pk=' + localStorage.getItem('pk'))
        //     .then((response) => {  // 使用箭头函数
        //         this.avatarUrl = response.data[0]['avatar']; // this 现在正确指向 Vue 实例
        //         this.userInfo.name = response.data[0]['name'];
        //         this.userInfo.contact = response.data[0]['contact'];
        //         this.userInfo.gender = response.data[0]['sex'];
        //         this.userInfo.interests = response.data[0]['interests'];
        //         this.userInfo.day = response.data[0]['sleep']+'-'+response.data[0]['wake'];
        //         this.userInfo.habits = response.data[0]['habits'];

        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        },
        showEditInfoDialog() {
        this.editInfoDialogVisible = true;
        // 将用户信息复制到编辑表单中

        },
        cancelEditInfo() {
        this.editInfoDialogVisible = false;
        },
        saveEditedInfo() {
        // 在这里保存修改后的用户信息
        this.editedEventInfo.wake = this.formatTime(this.selectedTimeW)
        this.editedEventInfo.sleep = this.formatTime(this.selectedTimeS)
        for(var i = 0; i < this.editedEventInfo.categories.length; i++) {
            var obj = this.editedEventInfo.categories[i];
            if(obj.length > 8) {
            this.$message.error('标签长度不能超过8')
            return;
            }
        }

        // axios.post('https://backend.susdorm.online/api/change-profile/', this.editedUserInfo,{withCredentials:true})
        //     .then(response => {
        //         // 处理响应
        //         this.$message.success('修改成功!');
        //     })
        //     .catch(error => {
        //         // 处理错误
        //         this.$message.error('修改失败！请检查信息是否正确！');
        //         console.error("Error:", error);
        //     });
        this.getUserInfo();
        this.editInfoDialogVisible = false;
        },
        
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  