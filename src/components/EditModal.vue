<template>
  <div id="myModal" class="modal">
    <div class="modal__content">
      <div class="modal-close" @click="closeModal">
        <span class="modal-close__span">&times;</span>
      </div>
      <div class="modal-text">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>

        <form class="new-post-form">
          <p>{{ post.id }}</p>
          <div>
            <label for="postTitle">Post Title</label>
            <input type="text" id="postTitle" :value="post.title" />
          </div>
          <div>
            <label for="postDescription">Post Description</label>
            <textarea
              type="text"
              rows="5"
              id="postDescription"
              :value="post.description"
            />
          </div>

          <div>
            <label for="postImage">Post Image</label>
            <input type="text" id="postImage" :value="post.image" />
          </div>

          <div>
            <button type="submit">Save Post</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditModal',
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
  props: {
    post: Object,
  },
};
</script>
<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 130px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal__content {
  display: flex;
  flex-wrap: wrap;
  background-color: #fefefe;
  margin: auto;
  padding: 30px;
  border: 1px solid #888;
  width: 80%;
  height: 60%;
}

.modal-close__span {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.modal-close__span:hover,
.modal-close__span:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-close {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.modal-text {
  display: flex;
  flex-direction: column;
}
</style>
