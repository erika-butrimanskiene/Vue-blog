<template>
  <main class="signup-form-wrapper">
    <h1 class="signup-form-heading">Join Us</h1>
    <form class="signup-form" @submit.prevent="handleSubmit">
      <input
        type="text"
        class="signup-form__input"
        id="userName"
        placeholder="type username"
        value=""
        v-model="newUser.name"
      />

      <input
        type="password"
        class="signup-form__input"
        id="passwordOne"
        placeholder="type password"
        value=""
        v-model="newUser.passwordOne"
      />

      <input
        type="password"
        class="signup-form__input"
        id="passwordTwo"
        placeholder="repeat password"
        value=""
        v-model="newUser.passwordTwo"
      />
      <div class="signup-form__button">
        <Button text="Sign Up" />
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
  name: 'RegistrationForm',
  components: {
    Button,
  },
  data() {
    return {
      newUser: {
        name: '',
        passwordOne: '',
        passwordTwo: '',
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
      if (this.newUser.name.length < 5) {
        errorText += 'Name has to be at least 5 symbols length. ';
      }
      if (this.newUser.passwordOne.length < 5) {
        errorText += 'Password has to be at least 5 symbols length. ';
      }
      if (this.newUser.passwordOne !== this.newUser.passwordTwo) {
        errorText += 'Password should match. ';
      }

      this.errorMessage = errorText;

      return errorText === '';
    },

    postFetch() {
      fetch('http://167.99.138.67:1111/createaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            this.errorMessage = data.message;
          } else {
            this.$router.push('/login');
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
/* MOBILE first */
.signup-form-wrapper {
  background-color: rgb(230, 230, 230);
  min-height: calc(100vh - 78.4px);
  width: 100vw;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signup-form-heading {
  padding-bottom: 35px;
}
.signup-form {
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.signup-form__input {
  width: 100%;
  margin: 10px 0px;
  padding: 10px 5px;
  border: none;
  border-radius: 5px;
}

.signup-form__input:focus {
  outline: none;
  border: 2px solid #fc28c7;
}

.signup-form__button {
  margin: 25px 0px 35px 0px;
  width: 100%;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .signup-form {
    width: 60%;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  .signup-form {
    width: 30%;
  }
}
</style>
