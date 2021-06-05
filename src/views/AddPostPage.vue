<template>
  <main class="addPostPage">
    <AdminRoutes />
    <AddNewPostForm />
  </main>
</template>

<script>
import AddNewPostForm from '../components/AddNewPostForm';
import AdminRoutes from '../components/AdminRoutes.vue';
export default {
  name: 'AddPostPage',
  components: {
    AddNewPostForm,
    AdminRoutes,
  },
};
</script>

<style scoped>
.addPostPage {
  background-color: rgb(230, 230, 230);
}
</style>
