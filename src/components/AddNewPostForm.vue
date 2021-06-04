<template>
  <form class="new-post-form" @submit.prevent="handleSubmit">
    <div>
      <label for="postTitle">Post Title</label>
      <input type="text" id="postTitle" value="" v-model="post.title" />
    </div>
    <div>
      <label for="postDescription">Post Description</label>
      <textarea
        type="text"
        rows="5"
        id="postDescription"
        value=""
        v-model="post.description"
      />
    </div>

    <div>
      <label for="postImage">Post Image</label>
      <input type="text" id="postImage" value="" v-model="post.image" />
    </div>

    <div>
      <button type="submit">Upload Post</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddNewPostForm',
  data() {
    return {
      post: {
        title: '',
        description: '',
        image: '',
        secretKey: localStorage.getItem('vue-blog-key'),
      },
      errorMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      this.postFetch();
    },
    postFetch() {
      fetch('http://167.99.138.67:1111/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.post),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.new-post-form {
  display: flex;
  flex-direction: column;
}
</style>
