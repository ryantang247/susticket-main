<template>
<div class="block text-center">
    <el-carousel height="150px">
    <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
    </el-carousel-item>
    </el-carousel>
</div>
</template>
<script setup lang="ts">

import { Picture as IconPicture } from '@element-plus/icons-vue'
const props = defineProps({
    data() {
        return {
            item: {
                thumbnail: 'https://via.placeholder.com/400x200',
                status: 'Open',
                rate: '3.7',//ref
                soldTickets: 1000,
                title: 'Royal Grand Palace Guided Tour',
                dateTime: 'March 10, 2024 10:00 AM',
                location: 'Bangkok, Thailand',
                price: '$50',
                description: 'Experience the beauty and grandeur of the Royal Grand Palace in Bangkok with a guided tour.',
                comments: [
                { user: 'John Doe', text: 'This was an amazing experience!', image: 'https://via.placeholder.com/200x200', video: '' },
                { user: 'Jane Smith', text: 'Highly recommend it to everyone.', image: '', video: 'https://www.example.com/video.mp4' }
                ]
            }
        }
    }
});
</script>

<style scoped>
.el-carousel__item h3 {
color: #475669;
opacity: 0.75;
line-height: 150px;
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
