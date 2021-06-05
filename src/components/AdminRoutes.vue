<template>
  <div class="admin">
    <div class="admin-routes">
      <router-link to="/editPosts">Edit</router-link>
      <router-link to="/addPost">New post</router-link>
    </div>

    <div><router-view /></div>
  </div>
</template>

<script>
export default {
  name: 'AdminRoutes',
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
}
.admin-routes {
  padding: 50px 0px 0px 0px;
  display: flex;
}

.admin-routes a {
  background-color: #3d3d3d;
  margin: 0px 15px;
  padding: 10px 0px;
  width: 135px;
  border-radius: 50px;
  color: white;
  font-size: 1.3em;
  text-decoration: none;
}

.admin-routes a:focus {
  outline: none;
}

.admin-routes a:hover {
  background-color: white;
  color: #3d3d3d;
  border: 2px solid #3d3d3d;
}
</style>
