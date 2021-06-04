<template>
  <div class="home">
    <AllBlogPosts />
  </div>
</template>

<script>
import AllBlogPosts from '../components/AllBlogPosts';
export default {
  name: 'Home',
  components: {
    AllBlogPosts,
  },
};
</script>
