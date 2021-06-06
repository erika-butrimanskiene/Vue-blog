<template>
  <main class="blog-posts">
    <form class="blog-posts-filter" @submit.prevent="handleFilter">
      <div class="blog-posts-filter__inputs">
        <div class="filter-start-date">
          <label class="filter-label" for="start">From:</label>
          <input
            type="date"
            class="filter-input"
            id="start-date"
            name="start-date"
            v-model="filterStartDate"
          />
        </div>

        <div class="filter-end-date">
          <label class="filter-label" for="start">To:</label>
          <input
            type="date"
            class="filter-input"
            id="end-date"
            name="end-date"
            v-model="filterEndDate"
          />
        </div>
      </div>

      <div class="blog-posts-filter__button">
        <Button text="Filter" />
      </div>
    </form>
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @postClick="getSinglePost(post.username, post.id)"
      @authorClick="getParticularAuthorPosts(post.username)"
    />
  </main>
</template>

<script>
import BlogPost from '../components/BlogPost';
import Button from '../components/Button.vue';
export default {
  name: 'AllBlogPosts',
  data() {
    return {
      posts: [],
      duplicatePosts: [],
      filterStartDate: '',
      filterEndDate: '',
    };
  },
  components: {
    BlogPost,
    Button,
  },
  methods: {
    getSinglePost(name, id) {
      this.$router.push(`/singlePostPage/${name}/${id}`);
    },
    getParticularAuthorPosts(name) {
      this.$router.push(`/particularUserPosts/${name}`);
    },
    handleFilter() {
      if (this.filterStartDate !== '' || this.filterEndDate !== '') {
        let startDateTimeStamp;
        if (this.filterStartDate === '') {
          startDateTimeStamp = 0;
        } else {
          startDateTimeStamp = new Date(this.filterStartDate).getTime();
        }

        let endDateTimeStamp;
        if (this.filterEndDate === '') {
          endDateTimeStamp = Number.MAX_SAFE_INTEGER;
        } else {
          endDateTimeStamp = new Date(this.filterEndDate).getTime();
        }

        this.posts = this.duplicatePosts.filter((post) => {
          return (
            post.timestamp >= startDateTimeStamp &&
            post.timestamp <= endDateTimeStamp
          );
        });
      }
    },
  },
  mounted() {
    fetch('http://167.99.138.67:1111/getallposts')
      .then((res) => res.json())
      .then((data) => {
        this.posts = data.data;
        this.duplicatePosts = data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
/* MOBILE first */
.blog-posts {
  max-width: 100vw;
  padding: 25px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.blog-posts-filter {
  margin: 0px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.filter-start-date,
.filter-end-date {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 0px;
}

.filter-label {
  padding: 0px 5px 0px 15px;
}

.filter-input {
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: rgb(217, 216, 218);
}

.blog-posts-filter__button {
  padding-top: 15px;
}

/* SMALL SCREENS, LAPTOPS */

@media screen and (min-width: 768px) {
  .blog-posts-filter {
    margin: 0px 40px;
  }

  .blog-posts-filter__inputs {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .blog-posts-filter {
    flex-direction: row;
  }

  .blog-posts-filter__button {
    padding-top: 0px;
    padding-left: 30px;
  }
}

/* DESKTOPS */

@media screen and (min-width: 1025px) {
  .blog-posts-filter {
    margin: 20px 40px;
  }
}
</style>
