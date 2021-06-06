<template>
  <div class="user-posts">
    <UserPost
      @postDelete="fetchToDeleteUserPost"
      @postEdit="showEditingPost"
      v-for="post in userPosts"
      :key="post.id"
      :post="post"
    />
    <EditModal v-if="showModal" @closeModal="handleModalClose">
      <template slot="header">
        <h3 class="modal-title">
          Edit Your Post
        </h3>
      </template>

      <template slot="form">
        <form
          class="edit-post-form"
          @submit.prevent="fetchToEditPost(editingPost.id)"
        >
          <label for="postTitle" class="edit-post-form__label"
            >Post Title</label
          >
          <input
            type="text"
            class="edit-post-form__input"
            id="postTitle"
            v-model="editingPost.title"
          />

          <label for="postDescription" class="edit-post-form__label"
            >Post Description</label
          >
          <textarea
            type="text"
            rows="6"
            class="edit-post-form__input"
            id="postDescription"
            v-model="editingPost.description"
          />

          <label for="postImage" class="edit-post-form__label"
            >Post Image</label
          >
          <input
            type="text"
            class="edit-post-form__input"
            id="postImage"
            v-model="editingPost.image"
          />

          <div class="edit-post-form__button">
            <Button text="Save Post" />
          </div>

          <div v-if="submitMessage !== ''">
            <p>{{ submitMessage }}</p>
          </div>
        </form>
      </template>
    </EditModal>
  </div>
</template>

<script>
import UserPost from '../components/UserPost';
import Button from '../components/Button.vue';
import EditModal from '../components/EditModal';
export default {
  name: 'AllUserPosts',
  components: {
    UserPost,
    Button,
    EditModal,
  },
  data() {
    return {
      userPosts: [],
      userName: localStorage.getItem('vue-blog-user'),
      secretKey: localStorage.getItem('vue-blog-key'),
      showModal: false,
      editingPost: {
        id: '',
        title: '',
        description: '',
        image: '',
      },
      submitMessage: '',
    };
  },
  methods: {
    fetchToDeleteUserPost(postId) {
      this.$confirm({
        message: `Are you sure?`,
        button: {
          no: 'No',
          yes: 'Yes',
        },
        callback: (confirm) => {
          if (confirm) {
            fetch(`http://167.99.138.67:1111/deletepost`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                secretKey: this.secretKey,
                id: postId,
              }),
            })
              .then((res) => res.json())
              .catch((err) => console.log(err));
            this.updatePostsAfterDelete(postId);
          }
        },
      });
    },
    updatePostsAfterDelete(postId) {
      let indexPostToDelete = this.userPosts.findIndex(
        (item) => item.id === postId
      );
      if (indexPostToDelete !== -1) this.userPosts.splice(indexPostToDelete, 1);
    },
    showEditingPost(postId) {
      this.showModal = true;
      let indexPostToEdit = this.userPosts.findIndex(
        (item) => item.id === postId
      );
      this.editingPost.id = this.userPosts[indexPostToEdit].id;
      this.editingPost.title = this.userPosts[indexPostToEdit].title;
      this.editingPost.description = this.userPosts[
        indexPostToEdit
      ].description;
      this.editingPost.image = this.userPosts[indexPostToEdit].image;
    },
    fetchToEditPost(postId) {
      this.$confirm({
        message: `Are you sure?`,
        button: {
          no: 'No',
          yes: 'Yes',
        },
        callback: (confirm) => {
          if (confirm) {
            if (this.checkEditFormInputs()) {
              fetch(`http://167.99.138.67:1111/updatepost`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  secretKey: this.secretKey,
                  id: this.editingPost.id,
                  title: this.editingPost.title,
                  description: this.editingPost.description,
                  image: this.editingPost.image,
                }),
              })
                .then((res) => res.json())
                .catch((err) => console.log(err));
              this.updatePostsAfterEdit(postId);
              this.showModal = false;
            }
          }
        },
      });
    },
    checkEditFormInputs() {
      let errorText = '';
      if (this.editingPost.title.length < 20) {
        errorText += 'Title has to be at least 20 symbols length. ';
      }
      if (this.editingPost.description.length < 50) {
        errorText += 'Description has to be at least 50 symbols length. ';
      }
      if (this.editingPost.image.indexOf('http') === -1) {
        errorText += 'Image url is wrong. (has to include http) ';
      }

      this.submitMessage = errorText;

      return errorText === '';
    },
    updatePostsAfterEdit(postId) {
      let indexPostToUpdate = this.userPosts.findIndex(
        (item) => item.id === postId
      );
      let postToUpdate = this.userPosts[indexPostToUpdate];
      let updatedPost = {
        ...postToUpdate,
        title: this.editingPost.title,
        description: this.editingPost.description,
        name: this.editingPost.name,
      };
      if (indexPostToUpdate !== -1)
        this.userPosts.splice(indexPostToUpdate, 1, updatedPost);
    },
    handleModalClose() {
      this.showModal = false;
    },
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getuserposts/${this.userName}`)
      .then((res) => res.json())
      .then((data) => {
        this.userPosts = data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
/* MOBILE FIRST */
.user-posts {
  padding: 60px 0px 10px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* modal form */

.edit-post-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.edit-post-form__label {
  padding: 25px 0px 5px 0px;
}

.edit-post-form__input {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1em;
  margin: 10px 0px;
  padding: 10px 5px;
  background-color: rgba(0, 0, 0, 0.109);
  border: none;
  border-radius: 5px;
}

.edit-post-form__input:focus {
  outline: none;
  border: 2px solid #fc28c7;
}

.edit-post-form__button {
  margin: 15px 0px 10px 0px;
  width: 100%;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .user-posts {
    padding: 60px 30px 40px 30px;
    justify-content: flex-start;
  }

  /* modal form */

  .edit-post-form {
    width: 60%;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  /* modal form */

  .edit-post-form {
    width: 50%;
  }
}
</style>
