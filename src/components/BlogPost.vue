<template>
  <div class="blog-post-wrapper">
    <div class="blog-post" @click="handlePostClick">
      <div
        :style="{ backgroundImage: `url('${post.image}')` }"
        class="blog-post__img"
      ></div>
      <h2 class="blog-post__heading">{{ post.title }}</h2>
      <p class="blog-post__text">{{ post.description }}</p>
      <p class="blog-post__author" v-if="isparticularUserPost">
        Author - <span>{{ post.username }}</span>
      </p>
      <p
        class="blog-post__author"
        @click="handleAuthorClick"
        v-if="!isparticularUserPost"
      >
        <span>see more author posts</span> - {{ post.username }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',

  props: {
    post: Object,
    isparticularUserPost: {
      type: Boolean,
      default: false,
    },
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
.blog-post-wrapper {
  width: calc(100% - 40px);
  margin: 25px 20px;
}

.blog-post {
  margin: 0px 0px 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-post__heading,
.blog-post__text,
.blog-post__author {
  width: 100%;
  overflow-wrap: break-word;
}

.blog-post__heading {
  padding: 20px 0px;
}

.blog-post__text {
  text-align: justify;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.blog-post__img {
  width: 100%;
  height: 300px;
  background-position: center;
  background-size: cover;
}

.blog-post__author {
  padding-top: 25px;
  font-style: italic;
  text-align: right;
}

.blog-post__author span {
  color: rgb(7, 147, 241);
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .blog-post-wrapper {
    width: calc(50% - 80px);
    margin: 25px 40px;
  }

  .blog-post__img {
    width: 100%;
    height: 250px;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  .blog-post-wrapper {
    width: calc(33.33% - 80px);
  }
  .user-post-content__img {
    height: 300px;
  }
}
</style>
