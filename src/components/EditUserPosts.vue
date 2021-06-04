<template>
  <div>
    {{ userName }}
  </div>
</template>

<script>
export default {
  name: 'EditUserPosts',
  data() {
    return {
      userPosts: [],
      userName: localStorage.getItem('vue-blog-user'),
    };
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getuserposts/${this.userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  },
};
</script>
