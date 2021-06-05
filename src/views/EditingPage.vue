<template>
  <main>
    <AdminRoutes />
    <UserPosts />
  </main>
</template>

<script>
import UserPosts from '../components/UserPosts';
import AdminRoutes from '../components/AdminRoutes.vue';
export default {
  name: 'EditingPage',
  components: {
    UserPosts,
    AdminRoutes,
  },
};
</script>
