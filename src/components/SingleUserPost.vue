<template>
  <div class="wrapper">
    <div class="user-post">
      <div
        :style="{ backgroundImage: `url('${post.image}')` }"
        class="user-post__img"
      ></div>
      <h4 class="user-post__heading">{{ post.title }}</h4>

      <p class="user-post__text">{{ post.description }}</p>
    </div>

    <div>
      <button @click="handleUserPostEdit(post.id)">Edit Post</button>
      <button @click="handleUserPostDelete(post.id)">Delete Post</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleUserPost',
  props: {
    post: Object,
  },
  methods: {
    handleUserPostDelete(id) {
      this.$emit('postDelete', id);
    },
    handleUserPostEdit(id) {
      this.$emit('postEdit', id);
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
}
.user-post {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-post__heading,
.user-post__text,
.user-post__img {
  max-width: 100%;
  overflow-wrap: break-word;
}

.user-post__heading {
  height: 50px;
  margin: 0;
}

.user-post__img {
  width: 300px;
  height: 300px;
  background-position: center;
  background-size: cover;
}
</style>
