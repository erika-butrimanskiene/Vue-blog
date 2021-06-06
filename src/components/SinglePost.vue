<template>
  <main class="single-post">
    <div
      :style="{ backgroundImage: `url('${singlePost.image}')` }"
      class="single-post__img"
    ></div>
    <h2 class="single-post__heading">{{ singlePost.title }}</h2>
    <p class="single-post__text">{{ singlePost.description }}</p>
    <p
      class="single-post__author"
      @click="getParticularAuthorPosts(singlePost.username)"
    >
      <span>see more author posts</span> - {{ singlePost.username }}
    </p>
  </main>
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
        this.singlePost = data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
/* MOBILE first */
.single-post {
  min-height: calc(100vh - 78.4px);
  padding: 60px 40px 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.single-post__img {
  width: 90%;
  height: 250px;
  background-position: center;
  background-size: cover;
}

.single-post__heading {
  width: 90%;
  padding: 30px 0px;
  text-align: center;
}

.single-post__text {
  width: 90%;
  text-align: justify;
}

.single-post__author {
  padding-top: 25px;
  width: 90%;
  font-style: italic;
  text-align: right;
}

.single-post__author span {
  color: rgb(7, 147, 241);
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .single-post {
    padding: 60px 80px 30px 80px;
  }

  .single-post__img {
    height: 350px;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  .single-post__img {
    width: 60%;
    height: 450px;
    background-position: center;
    background-size: cover;
  }

  .single-post__heading {
    width: 60%;
  }

  .single-post__text {
    width: 60%;
  }

  .single-post__author {
    width: 60%;
  }
}
</style>
