<template>
  <header>
    <img class="logo" src="@/assets/icons/brand/logo.svg" alt="Vue" />

    <h1 class="title">{{ PROJECT_TITLE }}</h1>

    <nav class="main-menu">
      <ul>
        <li>
          <router-link class="d-flex align-items-center" to="/" exact>
            <AppIcon icon="Home" />
            Home
          </router-link>
        </li>
        <li>
          <router-link class="d-flex align-items-center" active-class="active" to="/blog">
            <AppIcon icon="Newspaper" />
            Blog
          </router-link>
        </li>
        <li>
          <router-link class="d-flex align-items-center" active-class="active" to="/contact">
            <AppIcon icon="Envelope" />
            Contact
          </router-link>
        </li>
        <li>
          <router-link class="d-flex align-items-center" active-class="active" to="/account">
            <AppIcon icon="User" />
            Account
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="welcome-box d-flex align-items-center position-absolute">
      <p class="mb-0 mr-3">Hello {{ fullName }}!</p>
      <button class="btn btn-dark" type="button" @click="logOut">Log out</button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { PROJECT_TITLE } from '@/shared/files/consts';
import { clearStorageData } from '@/shared/helpers';
import { fullName, setUser, resetUser } from '@/core/state/auth';
import { getUser } from '@/core/services/auth';
import AppIcon from '@/shared/components/AppIcon/AppIcon.vue';

const router = useRouter();

const getUserData = async () => {
  if (fullName.value.trim()) return;

  try {
    const response = await getUser('id');
    setUser(response);
  } catch (error: any) {
    console.error(error.message);
  }
};

const logOut = () => {
  clearStorageData();
  resetUser();
  router.push({ name: 'login' });
};

// LIFECYCLE HOOKS
onMounted(() => {
  getUserData();
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/helpers/helpers';

header {
  color: #fff;
  text-align: center;
  padding: 20px;
  background-color: #222;
  position: relative;

  .logo {
    @include square(80px);
  }

  .title {
    font-size: 1.5em;
    margin-bottom: 30px;
  }

  .main-menu {
    ul {
      padding-left: 0;
      margin-bottom: 0;

      li {
        display: inline-block;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }

        a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover,
          &:focus,
          &:active,
          &.active {
            color: $primary;
          }

          svg {
            @include square(100%);
            max-width: 20px;
            max-height: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .welcome-box {
    top: 20px;
    right: 20px;

    .btn {
      margin-left: 20px;
    }
  }
}
</style>
