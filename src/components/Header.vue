<template>
  <div class="wrapper">
    <header class="header">
      <nav id="nav">
        <router-link to="/">Home</router-link>
        <p>Logout</p>
        <router-link to="/register">Sign Up</router-link>
        <router-link to="/login">Log In</router-link>
        <router-link v-if="this.token !== null" to="/addPost"
          >Admin</router-link
        >
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      token: localStorage.getItem('vue-blog-key'),
    };
  },
  updated() {
    this.token = localStorage.getItem('vue-blog-key');
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
}
.header {
  background-color: #272727;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

#nav a,
#nav p {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #fc28c7;
}
#nav p:active {
  color: #fc28c7;
}
</style>
