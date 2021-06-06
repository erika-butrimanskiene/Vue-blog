<template>
  <main>
    <AdminRoutes />
    <AllUserPosts />
  </main>
</template>

<script>
import AllUserPosts from '../components/AllUserPosts';
import AdminRoutes from '../components/AdminRoutes.vue';
export default {
  name: 'EditingPage',
  components: {
    AllUserPosts,
    AdminRoutes,
  },
};
</script>
