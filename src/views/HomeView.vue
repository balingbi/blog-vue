<script setup>
import { ref } from 'vue'
import { usePostsStore } from '@/stores/posts'
import PostItem from '../components/PostItem.vue'
import Wrapper from '../components/Wrapper.vue'

const postStore = usePostsStore()
const postFilter = ref('all')

// toggle filter
const setPostFilter = () => {
  postFilter.value = postFilter.value === 'all' ? 'saved' : 'all'
}

postStore.getPosts()
</script>

<template>
  <div class="page-header">
    <div>
      <h3>{{ postFilter === 'all' ? 'All Posts' : 'Saved Posts' }}</h3>
      <span v-show="postStore.loading" class=" material-icons spin">cached</span>
    </div>
    <button @click="setPostFilter">
      {{ postFilter === 'all' ? 'Show Saved Posts' : 'Show All Posts' }}
    </button>
  </div>

  <div v-if="postStore.errMsg" class="error">{{ postStore.errMsg }}</div>

  <main>
    <!-- ALL POSTS -->
    <div v-if="postFilter === 'all'">
      <div v-for="post in postStore.sorted" :key="post.id" class="wrapper">
        <div class="header">
          <span>Written by {{ post.name }} on {{ post.date }}</span>
          <div>
            <button
              @click="postStore.deletePost(post.id)"
              class="del materials-icon"
            >
              delete
            </button>
            <button
              @click="postStore.toggleSave(post.id)"
              class="save materials-icon"
            >
              bookmark_border
            </button>
          </div>
        </div>
        <h2 class="title-box">{{ post.title }}</h2>
        <p class="body-box">{{ post.body }}</p>
      </div>
    </div>

    <!-- SAVED POSTS -->
    <div v-if="postFilter === 'saved'">
      <div v-for="post in postStore.saved" :key="post.id" class="wrapper">
        <div class="header">
          <span>Written by {{ post.name }} on {{ post.date }}</span>
          <div>
            <button
              @click="postStore.deletePost(post.id)"
              class="del materials-icon"
            >
              delete
            </button>
            <button
              @click="postStore.toggleSave(post.id)"
              class="save materials-icon"
            >
              bookmark_border
            </button>
          </div>
        </div>
        <h2 class="title-box">{{ post.title }}</h2>
        <p class="body-box">{{ post.body }}</p>
      </div>
    </div>
  </main>
</template>

<style>
/* 🌈 Page background */
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #e3f2fd, #f4f6f8);
  font-family: "Segoe UI", Arial, sans-serif;
}

/* 📦 Card container */
.wrapper {
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.page-header {
  max-width: 900px;
  margin: 20px auto;
  padding: 16px 24px;
  background: #0d47a1;
  color: white;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error {
  max-width: 700px;
  margin: 10px auto;
  padding: 12px 16px;
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
  border-radius: 8px;
  font-weight: 500;
}

/* 📌 Header bar */
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: -24px -24px 16px -24px;
  padding: 12px 24px;
  background: #787c7e;
  border-bottom: 1px solid #d0e3ff;
  color: #fff;
  font-size: 14px;
  border-radius: 16px 16px 0 0;
}

/* 🔘 Buttons */
.materials-icon {
  font-family: "Material Icons";
  font-size: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background 0.2s, transform 0.2s;
}
.materials-icon:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
}
.del {
  color: #e53935;
}
.save {
  color: #22ae89;
}

/* 📝 Title and Body styles */
.title-box {
  background: #bbdefb;
  color: #0d47a1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 26px;
  margin-bottom: 16px;
}

.body-box {
  background: #f1f8e9;
  color: #33691e;
  padding: 16px;
  border-radius: 8px;
  line-height: 1.8;
  font-size: 16px;
}

/* 🔄 Spinner animation */
.spin {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style> 