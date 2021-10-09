<template>
  <div class="post-item">
    <img v-if="post.image" class="img-fluid" :src="post.image" alt="Capa" />
    <div v-else class="img-placeholder">Não há imagem para esse post</div>

    <article>
      <h3 class="title">{{ post.title }}</h3>
      <p v-if="post.body" class="mb-0">{{ limitWords(post.body, 8) }}</p>
      <router-link class="btn btn-primary mt-3" :to="{ name: 'post', params: { id: post.id } }">
        Read more
      </router-link>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { Post } from '@/core/services/news/types';
import { limitWords } from '@/shared/helpers';

type Props = {
  post: Post;
};

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import '../../assets/scss/helpers/bootstrap-helpers';
@import '../../assets/scss/helpers/helpers';

.post-item {
  text-align: center;
  margin-bottom: 50px;

  img {
    display: block;
    @include square(100px);
    margin: 0 auto 10px;
  }

  .img-placeholder {
    font-weight: 700;
    color: #fff;
    padding: 20px;
    @include border-top-radius(5px);
    background-color: $primary;
  }

  article {
    padding: 20px;
    @include border-bottom-radius(5px);
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
