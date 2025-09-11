<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>  
    <nav class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/add-post">Add Post</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.navbar {
  background-color: #001f4d; /* dark blue */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;
}

.navbar a:hover {
  color: #ffcc00; /* highlight color on hover */
}
</style>