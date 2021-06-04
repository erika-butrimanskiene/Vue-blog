<template>
  <div class="particular-user-posts">
    <ParticularUserPost
      v-for="post in particularUserPosts"
      :key="post.id"
      :post="post"
      @postClick="getSinglePost(post.username, post.id)"
    />
  </div>
</template>

<script>
import ParticularUserPost from '../components/ParticularUserPost';
export default {
  name: 'AllParticularUserPosts',
  components: {
    ParticularUserPost,
  },
  data() {
    return {
      particularUserPosts: [],
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
        console.log(data);
        this.particularUserPosts = data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.particular-user-posts {
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
