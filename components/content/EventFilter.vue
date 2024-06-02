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
  width: 100%;
  overflow-x: auto; 
  font-family: sans-serif;
  margin-left: 5%;
}

h2 {
  font-size: 2rem;
  margin-left: 5%;
}

.filter-menu {
  display: flex;
  overflow-x: auto;
  padding: 0 5%; 
}

.filter-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
  margin: 0; /* Reset default margin */
}

.filter-item {
  margin: 0 30px; /* Horizontal margin for spacing */
  font-size: 2.5rem;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  cursor: pointer;
  white-space: nowrap; /* Prevent text from wrapping */
}

.filter-item.selected {
  opacity: 1 !important;
}

.filter-name {
  text-decoration: none;
  color: #000;
  text-align: center;
}

@media only screen and (max-width: 830px) {
  h2 {
    font-size: 2.0rem;
    margin-left: 5%;
  }

  .filter-item {
    margin: 0 20px; /* Adjusted margin for smaller screens */
    font-size: 2.0rem;
  }
}

@media only screen and (max-width: 600px) {
  h2 {
    font-size: 1.5rem;
    margin-left: 5%;
  }

  .filter-item {
    margin: 0 10px; /* Adjusted margin for smaller screens */
    font-size: 0.875rem;
  }
}
</style>