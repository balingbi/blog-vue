<script setup>
import { reactive, computed } from 'vue'
import Wrapper from '@/components/Wrapper.vue'
import {useRouter} from 'vue-router';

import { usePostsStore } from '@/stores/posts'

const router = useRouter()
const postStore =usePostsStore() 
const post = reactive({
  title: '',
  body: ''
})

const isFormValid = computed(() => {
  return post.title.trim() !== '' && post.body.trim() !== ''
})

const submit = () => {
  postStore.addPost(post)
  router.push({name: 'home'})
}
</script>

<template>
  <Wrapper>
    <form @submit.prevent="submit">
      <h3>Add a New Post</h3>
      <div>
        <label>Post Title</label>
        <input type="text" v-model="post.title" placeholder="Enter your title..." />
      </div>
      <div>
        <label>Post Content</label>
        <textarea rows="5" v-model="post.body" placeholder="Write something..."></textarea>
      </div>
      <div>
        <button :disabled="!isFormValid">Publish</button>
      </div>
    </form>
  </Wrapper>
</template>

<style lang="scss" scoped>
form {
  background: #1e1e2f;
  padding: 2rem 2.5rem;
  width: 100%;
  max-width: 550px;
  margin: 2rem auto;
  border-radius: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
  font-family: 'Poppins', sans-serif;
  color: #f5f5f5;

  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: #e2e2e2;
    text-align: center;
    letter-spacing: 0.5px;
  }

  div {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.6rem;
      font-weight: 500;
      color: #cfcfcf;
      font-size: 0.95rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.9rem 1rem;
      border: 1px solid #333;
      border-radius: 0.75rem;
      font-size: 1rem;
      background-color: #2a2a3d;
      color: #f5f5f5;
      transition: all 0.3s ease;

      &:focus {
        border-color: #6c63ff;
        background-color: #1f1f2e;
        outline: none;
        box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.3);
      }

      &::placeholder {
        color: #aaa;
        font-size: 0.9rem;
      }
    }
  }

  /* 🚀 move button styles here */
  button {
    width: 100%;
    padding: 0.9rem;
    background: linear-gradient(135deg, #6c63ff, #c2185b);
    color: #fff;
    font-size: 1.05rem;
    font-weight: 600;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.3s ease;

    &:hover:enabled {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(108, 99, 255, 0.4);
    }

    &:active:enabled {
      transform: translateY(0);
      box-shadow: none;
    }

    &:disabled {
      background: #555; /* gray out when disabled */
      cursor: not-allowed;
      opacity: 0.6;
      box-shadow: none;
      transform: none;
    }
  }
}
</style>
