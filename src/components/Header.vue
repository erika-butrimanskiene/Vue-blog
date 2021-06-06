<template>
  <div class="wrapper">
    <header class="header">
      <div class="logo">
        <p>VUE</p>
      </div>
      <nav id="nav">
        <router-link to="/">Home</router-link>
        <router-link v-if="isLogedIn" to="/addPost">Admin</router-link>
        <div id="login-signup" v-if="!isLogedIn">
          <router-link to="/register">Sign Up</router-link>
          <span>|</span>
          <router-link to="/login">Log In</router-link>
        </div>
        <p @click="handleLogout" v-if="isLogedIn">Logout</p>
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
      isLogedIn: false,
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('vue-blog-key');
      localStorage.removeItem('vue-blog-user');
      this.isLogedIn = false;
    },
  },
  created() {
    if (localStorage.getItem('vue-blog-key') !== null) this.isLogedIn = true;
  },
  updated() {
    if (localStorage.getItem('vue-blog-key') !== null) this.isLogedIn = true;
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
}
.header {
  background-color: #272727;
  display: flex;
  justify-content: space-between;
}

.logo {
  display: flex;
  padding: 0px 20px;
  align-items: center;
  font-size: 1.7em;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#nav {
  padding: 30px 20px;
  display: flex;
  justify-content: flex-end;
}

#nav a,
#nav p {
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 0px 15px;
}

#nav p {
  font-style: italic;
}

#nav a.router-link-exact-active {
  color: #fc28c7;
}
#nav p:active {
  color: #fc28c7;
}

#login-signup a {
  padding: 0px 5px;
  font-style: italic;
}

#login-signup span {
  color: white;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .logo {
    font-size: 2em;
  }

  #nav a,
  #nav p {
    font-size: 1.3em;
  }

  .logo {
    padding: 0px 40px;
  }

  #nav {
    padding: 30px 40px;
  }
}
</style>
