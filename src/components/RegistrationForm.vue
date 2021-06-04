<template>
  <form @submit.prevent="handleSubmit">
    <label for="userName">UserName</label>
    <input type="text" id="userName" value="" v-model="newUser.name" />
    <label for="passwordOne">Password</label>
    <input
      type="password"
      id="passwordOne"
      value=""
      v-model="newUser.passwordOne"
    />
    <label for="passwordTwo">Repeat Password</label>
    <input
      type="password"
      id="passwordTwo"
      value=""
      v-model="newUser.passwordTwo"
    />
    <div>
      <button type="submit">Sign Up</button>
    </div>

    <div v-if="errorMessage !== ''">
      <p>{{ errorMessage }}</p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'RegistrationForm',
  components: {},
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
          console.log(data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
