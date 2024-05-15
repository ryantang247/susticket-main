<template>
    <div>
      <h2>{{ month }} {{ year }}</h2>
      <div class="calendar">
        <div v-for="day in daysInMonth" :key="day" class="day">{{ day }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        month: '',
        year: '',
        daysInMonth: []
      };
    },
    mounted() {
      this.generateCalendar();
    },
    methods: {
      generateCalendar() {
        const now = new Date();
        this.month = now.toLocaleString('default', { month: 'long' });
        this.year = now.getFullYear();
        
        const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  .day {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  </style>
  