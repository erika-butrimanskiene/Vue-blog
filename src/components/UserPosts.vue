<template>
  <div class="user-posts">
    <SingleUserPost
      @postDelete="deleteUserPost"
      @postEdit="editUserPost"
      v-for="post in userPosts"
      :key="post.id"
      :post="post"
    />
    <EditModal
      :post="editingPost"
      v-if="showModal"
      @closeModal="handleModalClose"
    >
      <template slot="header">
        <h3 class="modal-title">
          Edit Your Post
        </h3>
      </template>
    </EditModal>
  </div>
</template>

<script>
import SingleUserPost from '../components/SingleUserPost';
import EditModal from '../components/EditModal';
export default {
  name: 'UserPosts',
  components: {
    SingleUserPost,
    EditModal,
  },
  data() {
    return {
      userPosts: [],
      userName: localStorage.getItem('vue-blog-user'),
      secretKey: localStorage.getItem('vue-blog-key'),
      showModal: false,
      editingPost: {},
    };
  },
  methods: {
    deleteUserPost(postId) {
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
              .then((data) => {
                console.log(data);
                let indexPostToDelete = this.userPosts.findIndex(
                  (item) => item.id === postId
                );
                if (indexPostToDelete !== -1)
                  this.userPosts.splice(indexPostToDelete, 1);
              })
              .catch((err) => console.log(err));
          }
        },
      });
    },
    editUserPost(postId) {
      this.showModal = true;
      let indexPostToEdit = this.userPosts.findIndex(
        (item) => item.id === postId
      );
      this.editingPost = this.userPosts[indexPostToEdit];
    },
    handleModalClose() {
      this.showModal = false;
    },
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getuserposts/${this.userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.userPosts = data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.user-posts {
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
