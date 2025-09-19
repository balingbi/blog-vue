import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts-store', {
  state: () => ({
    posts: [],
    loading: true,
    errMsg: ''
  }),

  getters: {
    sorted(state) {
      return [...state.posts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    },
    saved(state) {
      return state.posts
        .filter(p => p.is_saved)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },

  actions: {
    // ✅ fixed name
    getPosts() {
      this.loading = true
      fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(data => {
          this.posts = data
          this.loading = false
        })
        .catch(err => {
          this.errMsg = 'Something went wrong'
          this.loading = false
          console.log(err)
        })
    },

    addPost(post) {
      const newPost = {
        id: this.posts.length + 1,
        title: post.title,
        body: post.body,
        name: "Angeline Magan",
        date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD format
        is_saved: false
      }

      // local update
      this.posts.push(newPost)

      // ✅ POST to JSON Server
      fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })
        .then(() => {
          // reload posts from server para sync sa db.json
          this.getPosts()
        })
        .catch(err => console.log(err))
    },

    deletePost(id) {
      this.posts = this.posts.filter(p => p.id !== id)

      // ✅ fixed interpolation
      fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
      }).catch(err => console.log(err))
    },

    toggleSave(id) {
      const post = this.posts.find(p => p.id === id)
      if (post) {
        post.is_saved = !post.is_saved

        // ✅ fixed interpolation + PATCH
        fetch(`http://localhost:3000/posts/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ is_saved: post.is_saved })
        }).catch(err => console.log(err))
      }
    }
  }
})
