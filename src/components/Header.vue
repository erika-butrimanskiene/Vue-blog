<template>
  <header>
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/register">Sign Up</router-link>
      <router-link to="/login">Log In</router-link>
      <router-link v-if="this.token !== null" to="/admin">Admin</router-link>
    </nav>
    <router-view />
  </header>
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

<style>
#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
