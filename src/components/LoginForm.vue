<template>
  <form @submit.prevent="handleSubmit">
    <label for="userName">UserName</label>
    <input type="text" id="userName" value="" v-model="user.name" />
    <label for="password">Password</label>
    <input type="password" id="password" value="" v-model="user.password" />

    <div>
      <button type="submit">Log In</button>
    </div>

    <div v-if="errorMessage !== ''">
      <p>{{ errorMessage }}</p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      if (this.checkInputs()) {
        this.postFetch();
      }
    },
    checkInputs() {
      let errorText = '';
      if (this.user.name.length < 5) {
        errorText += 'Name has to be at least 5 symbols length. ';
      }
      if (this.user.password.length < 5) {
        errorText += 'Password has to be at least 5 symbols length. ';
      }

      this.errorMessage = errorText;

      return errorText === '';
    },

    postFetch() {
      fetch('http://167.99.138.67:1111/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            this.errorMessage = data.message;
          } else {
            localStorage.setItem('vue-blog-key', data.secretKey);
            localStorage.setItem('vue-blog-user', this.user.name);
            console.log(data);
            this.$router.push('/home');
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
