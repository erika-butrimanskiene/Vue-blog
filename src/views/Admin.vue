<template>
  <div class="admin">
    <router-link to="/editPosts">Edit</router-link>
    <router-link to="/addPost">Add new post</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Admin',
};
</script>

<style scoped>
.admin {
  padding: 30px;
}

.admin a {
  padding: 0px 20px;
  font-weight: bold;
  color: #2c3e50;
}

.admin a.router-link-exact-active {
  color: #42b983;
}
</style>
