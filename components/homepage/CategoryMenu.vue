
<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to generate category menu template
    modified to display own data
-->
<template>
  <nav class="category-menu">
    <ul class="category-list">
      <li class="category-item" v-for="category in categories" :key="category.name" @click="selectCategory(category)">
        <a href="#">
          <img :src="category.icon" :alt="category.name" class="category-icon" :class="{'selected': selectedCategory === category}" />
          <span class="category-name" :class="{'selected': selectedCategory === category}">{{ category.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import allIcon from '@/assets/categorymenu/all.png';
import competitionIcon from '@/assets/categorymenu/competition.png';
import fairIcon from '@/assets/categorymenu/fair.png';
import performanceIcon from '@/assets/categorymenu/performance.png';
import activityIcon from '@/assets/categorymenu/activities.png';
import seminarIcon from '@/assets/categorymenu/seminar.png';

export default {
  name: 'CategoryMenu',
  data() {
    const allCategory = { name: 'All', icon: allIcon };
    return {
     categories: [
        allCategory,
        { name: 'Competition', icon: competitionIcon },
        { name: 'Fair', icon: fairIcon },
        { name: 'Performance', icon: performanceIcon },
        { name: 'Activity', icon: activityIcon },
        { name: 'Seminar', icon: seminarIcon }
      ],
      selectedCategory: allCategory,
    };
  },
  // Inside CategoryMenu.vue
methods: {
  selectCategory(category) {
    this.selectedCategory = category;
    this.$emit('category-selected', category.name);
},
},

};

</script>

<style scoped>
.category-menu {
  font-family: sans-serif;
  overflow-x: auto;
}

.category-list {
  /* Styles for the list */
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

.selected {
  opacity: 1.0 !important;
}

.category-icon {
  width: 160px; 
  height: 160px; 
  border: 2px solid #284949; 
  border-radius: 50%;
  opacity: 0.4;
  margin-left:10px;
  margin-right:10px;
  transition: opacity 0.3s ease;
}

.category-name {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #284949;
  opacity: 0.7;
}

.category-icon:hover,
.category-name:hover{
  opacity: 1.0;
}
.category-list a{
  text-decoration: none;
}

@media only screen and (max-width: 2880px){
  .category-icon{
    width: 80px;
    height: 80px;
  }
}

</style>
