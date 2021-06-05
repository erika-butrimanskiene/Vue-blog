<template>
  <main class="login-form-wrapper">
    <h1 class="login-form-heading">Login</h1>
    <form class="login-form" @submit.prevent="handleSubmit">
      <input
        type="text"
        class="login-form__input"
        id="userName"
        placeholder="type username"
        value=""
        v-model="user.name"
      />

      <input
        type="password"
        class="login-form__input"
        id="password"
        placeholder="type password"
        value=""
        v-model="user.password"
      />

      <div class="login-form__button">
        <Button text="Login" />
      </div>

      <div v-if="errorMessage !== ''">
        <p>{{ errorMessage }}</p>
      </div>
    </form>
  </main>
</template>

<script>
import Button from '../components/Button.vue';
export default {
  name: 'LoginForm',
  components: {
    Button,
  },
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
            this.$router.push('/');
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
/* MOBILE first */
.login-form-wrapper {
  background-color: rgb(230, 230, 230);
  min-height: calc(100vh - 78.4px);
  width: 100vw;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-form-heading {
  padding-bottom: 35px;
}
.login-form {
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.login-form__input {
  width: 100%;
  margin: 10px 0px;
  padding: 10px 5px;
  border: none;
  border-radius: 5px;
}

.login-form__input:focus {
  outline: none;
  border: 2px solid #fc28c7;
}

.login-form__button {
  margin: 25px 0px 35px 0px;
  width: 100%;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .login-form {
    width: 60%;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  .login-form {
    width: 30%;
  }
}
</style>
