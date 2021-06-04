<template>
  <div class="wrapper">
    <div class="blog-post" @click="handlePostClick">
      <h4 class="blog-post__heading">{{ post.title }}</h4>

      <p class="blog-post__text">{{ post.description }}</p>
      <div
        :style="{ backgroundImage: `url('${post.image}')` }"
        class="blog-post__img"
      ></div>
    </div>
    <div class="blog-post__author" @click="handleAuthorClick">
      <p>{{ post.username }}</p>
      <p>See more author posts</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  props: {
    post: Object,
  },
  methods: {
    handlePostClick() {
      this.$emit('postClick');
    },
    handleAuthorClick() {
      this.$emit('authorClick');
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: calc(25% - 60px);
  margin: 25px 30px;
}

.blog-post {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-post__heading,
.blog-post__text,
.blog-post__img {
  max-width: 100%;
  overflow-wrap: break-word;
}

.blog-post__heading {
  height: 50px;
  margin: 0;
}

.blog-post__text {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.blog-post__img {
  width: 300px;
  height: 300px;
  background-position: center;
  background-size: cover;
}

.blog-post__author {
  display: flex;
}
</style>
