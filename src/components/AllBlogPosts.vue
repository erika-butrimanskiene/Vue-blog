<template>
  <div class="blog-posts">
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @postClick="getSinglePost(post.username, post.id)"
      @authorClick="getParticularAuthorPosts(post.username)"
    />
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost';
export default {
  name: 'AllBlogPosts',
  data() {
    return {
      posts: [],
    };
  },
  components: {
    BlogPost,
  },
  methods: {
    getSinglePost(name, id) {
      this.$router.push(`/singlePostPage/${name}/${id}`);
    },
    getParticularAuthorPosts(name) {
      this.$router.push(`/particularUserPosts/${name}`);
    },
  },
  mounted() {
    fetch('http://167.99.138.67:1111/getallposts')
      .then((res) => res.json())
      .then((data) => {
        this.posts = data.data;
        console.log(this.posts);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.blog-posts {
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
