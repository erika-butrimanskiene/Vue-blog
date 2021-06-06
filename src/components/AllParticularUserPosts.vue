<template>
  <main class="particular-user-posts">
    <BlogPost
      v-for="post in particularUserPosts"
      :key="post.id"
      :post="post"
      :isparticularUserPost="isparticularUserPost"
      @postClick="getSinglePost(post.username, post.id)"
    />
  </main>
</template>

<script>
import BlogPost from '../components/BlogPost';
export default {
  name: 'AllParticularUserPosts',
  components: {
    BlogPost,
  },
  data() {
    return {
      particularUserPosts: [],
      isparticularUserPost: true,
    };
  },
  methods: {
    getSinglePost(name, id) {
      this.$router.push(`/singlePostPage/${name}/${id}`);
    },
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getuserposts/${this.$route.params.name}`)
      .then((res) => res.json())
      .then((data) => {
        this.particularUserPosts = data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
/* MOBILE FIRST */
.particular-user-posts {
  padding: 60px 0px 10px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .particular-user-posts {
    justify-content: flex-start;
  }
}
</style>
