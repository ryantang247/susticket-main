<template>
  <h2>Recommendations</h2>
  <nav class="filter-menu">
    <ul class="filter-list">
      <li class="filter-item" 
          :class="{ 'selected': selectedFilter === filter }" 
          v-for="filter in filters" 
          :key="filter" 
          @click="selectFilter(filter)">
        <span class="filter-name">{{ filter }}</span>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  /**
 * AI-generated-content
 * tool: ChatGPT
 * version: 3.5
 * usage: I used the prompt "categorizing in vue", and
 *modify the UI
 */
  name: 'FilterMenu',
  data() {
    return {
      filters: ['All', 'This week', 'This month', 'Next month'],
      selectedFilter: 'All',
    };
  },
  methods: {
    selectFilter(filter) {
      console.log(`Filter selected: ${filter}`);
      this.selectedFilter = filter;
    },
  },
};
</script>

<style scoped>
.filter-menu {
  font-family: sans-serif;
  margin-left: 5%;
}

h2 {
  font-size: 50px;
  margin-left: 5%;
}

.filter-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
}

.filter-item {
  margin: 30px;
  margin-top: 0px;
  font-size: 30px;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.filter-item.selected {
  opacity: 1 !important;
}


.filter-name {
  text-decoration: none;
  color: #000;
  text-align: center;
}
</style>
