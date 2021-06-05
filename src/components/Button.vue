<template>
  <button class="pink-button" type="submit">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
  },
};
</script>

<style scoped>
.pink-button {
  background-color: #fc28c7;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  color: white;
  font-size: 1.1em;
}

.pink-button:focus {
  outline: none;
}

.pink-button:hover {
  transform: scale(1.15);
}
</style>
