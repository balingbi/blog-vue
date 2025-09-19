<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { usePostsStore } from '@/stores/posts'
const postStore = usePostsStore()
postStore.getPosts()
</script>

<template>
  <header>  
    <nav class="navbar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/add-post">Add Post</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.navbar {
  background-color: #001f4d; /* dark blue */
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height:70px;
}

.navbar a {
  color: rgb(199, 202, 7);
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
  font-size:18px;
}

.navbar a:hover {
  color: #ffcc00; /* highlight color on hover */
}
</style>