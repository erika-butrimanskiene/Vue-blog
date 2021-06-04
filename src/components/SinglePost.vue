<template>
  <div class="single-post">
    <h4 class="single-post__heading">{{ singlePost.title }}</h4>
    <p
      class="single-post__author"
      @click="getParticularAuthorPosts(singlePost.username)"
    >
      {{ singlePost.username }} - see more author posts
    </p>
    <p class="single-post__text">{{ singlePost.description }}</p>
    <div
      :style="{ backgroundImage: `url('${singlePost.image}')` }"
      class="single-post__img"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  data() {
    return {
      singlePost: {},
    };
  },
  methods: {
    getParticularAuthorPosts(name) {
      this.$router.push(`/particularUserPosts/${name}`);
    },
  },
  mounted() {
    fetch(
      `http://167.99.138.67:1111/getsinglepost/${this.$route.params.name}/${this.$route.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.singlePost = data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.single-post__img {
  width: 300px;
  height: 300px;
  background-position: center;
  background-size: cover;
}
</style>
