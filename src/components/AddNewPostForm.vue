<template>
  <div class="newpost-form-wrapper">
    <h1 class="newpost-form-heading">Create your post</h1>
    <form class="newpost-form" @submit.prevent="handleSubmit">
      <label for="postTitle" class="newpost-form__label">Post Title</label>
      <input
        type="text"
        class="newpost-form__input"
        id="postTitle"
        placeholder="type title"
        value=""
        v-model="post.title"
      />

      <label for="postDescription" class="newpost-form__label"
        >Post Description</label
      >
      <textarea
        type="text"
        rows="5"
        class="newpost-form__input newpost-textarea"
        id="postDescription"
        placeholder="type description"
        value=""
        v-model="post.description"
      />

      <label for="postImage" class="newpost-form__label">Post Image</label>
      <input
        type="text"
        class="newpost-form__input"
        id="postImage"
        placeholder="type image url"
        value=""
        v-model="post.image"
      />

      <div class="newpost-form__button">
        <Button text="Create Post" />
      </div>

      <div v-if="submitMessage !== ''">
        <p>{{ submitMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import Button from '../components/Button.vue';

export default {
  name: 'AddNewPostForm',
  components: {
    Button,
  },
  data() {
    return {
      post: {
        title: '',
        description: '',
        image: '',
        secretKey: localStorage.getItem('vue-blog-key'),
      },
      submitMessage: '',
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
      if (this.post.title.length < 20) {
        errorText += 'Title has to be at least 20 symbols length. ';
      }
      if (this.post.description.length < 50) {
        errorText += 'Description has to be at least 50 symbols length. ';
      }
      if (this.post.image.indexOf('http') === -1) {
        errorText += 'Image url is wrong. (has to include http) ';
      }

      this.submitMessage = errorText;

      return errorText === '';
    },
    postFetch() {
      fetch('http://167.99.138.67:1111/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.post),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            this.submitMessage = data.message;
          } else {
            (this.post.title = ''),
              (this.post.description = ''),
              (this.post.image = '');
            this.submitMessage = 'Post is successfully created.';
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
/* MOBILE first */
.newpost-form-wrapper {
  background-color: rgb(230, 230, 230);
  min-height: calc(100vh - 173.2px);
  max-width: 100vw;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.newpost-form-heading {
  padding-bottom: 25px;
}

.newpost-form {
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.newpost-form__label {
  padding: 25px 0px 5px 0px;
}

.newpost-form__input {
  width: 100%;
  margin: 10px 0px;
  padding: 10px 5px;
  border: none;
  border-radius: 5px;
}

.newpost-form__input:focus {
  outline: none;
  border: 2px solid #fc28c7;
}

.newpost-form__input::placeholder {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.newpost-form__button {
  margin: 35px 0px 40px 0px;
  width: 100%;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .newpost-form {
    width: 60%;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  .newpost-form {
    width: 40%;
  }
}
</style>
