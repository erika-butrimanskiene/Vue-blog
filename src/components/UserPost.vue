<template>
  <div class="user-post">
    <div class="user-post-content">
      <div
        :style="{ backgroundImage: `url('${post.image}')` }"
        class="user-post-content__img"
      ></div>
      <h2 class="user-post-content__heading">{{ post.title }}</h2>

      <p class="user-post-content__text">{{ post.description }}</p>
    </div>

    <div class="user-post-edit-buttons">
      <button class="edit-btn" @click="handleUserPostEdit(post.id)">
        Edit Post
      </button>
      <button class="delete-btn" @click="handleUserPostDelete(post.id)">
        Delete Post
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPost',
  props: {
    post: Object,
  },
  methods: {
    handleUserPostDelete(id) {
      this.$emit('postDelete', id);
    },
    handleUserPostEdit(id) {
      this.$emit('postEdit', id);
    },
  },
};
</script>

<style scoped>
/* MOBILE first */
.user-post {
  width: 80%;
  padding: 0px 0px 60px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.user-post-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-post-content__heading,
.user-post-content__text,
.user-post-content__img {
  width: 100%;
  overflow-wrap: break-word;
}

.user-post-content__heading {
  padding: 20px 0px;
}

.user-post-content__text {
  width: 100%;
  text-align: justify;
}

.user-post-content__img {
  width: 100%;
  height: 300px;
  background-position: center;
  background-size: cover;
}

.user-post-edit-buttons {
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
}

.edit-btn,
.delete-btn {
  background-color: white;
  border: none;
  font-size: 1.2em;
}

.edit-btn {
  color: rgb(7, 147, 241);
  font-weight: bolder;
}

.delete-btn {
  color: rgb(245, 12, 12);
  font-weight: bolder;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .user-post {
    width: 50%;
    padding: 0px 20px 60px 20px;
  }

  .user-post-content__img {
    height: 250px;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  .user-post {
    width: 33.33%;
  }
  .user-post-content__img {
    height: 300px;
  }
}
</style>
