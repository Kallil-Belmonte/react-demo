<template>
  <footer>
    <div class="container">
      <div class="d-flex justify-content-center">
        <ul class="social-networks list-inline">
          <li class="list-inline-item">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
              >Facebook</a
            >
          </li>
          <li class="list-inline-item">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
          </li>
          <li class="list-inline-item">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
              >Instagram</a
            >
          </li>
          <li class="list-inline-item">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"
              >Linkedin</a
            >
          </li>
        </ul>
      </div>

      <div class="copyright text-center">
        <p class="mb-0">© Nome 2016 - Todos os Direitos Reservados</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/helpers/helpers';

footer {
  padding: 30px 0;

  /* SOCIAL NETWORKS */

  .social-networks {
    li {
      &:not(:last-child) {
        margin-right: 40px;
      }

      a {
        font-size: 0px;
        @include square(25px);
        display: inline-block;

        &::before {
          content: '';
          display: block;
          @include square(100%);
          @extend %background-image-cover;
        }

        /* Facebook */
        &[href*='facebook.com']::before {
          background-image: url('@/assets/icons/social-networks/facebook.svg');
        }

        /* Twitter */
        &[href*='twitter.com']::before {
          background-image: url('@/assets/icons/social-networks/twitter.svg');
        }

        /* Instagram */
        &[href*='instagram.com']::before {
          background-image: url('@/assets/icons/social-networks/instagram.svg');
        }

        /* Linkedin */
        &[href*='linkedin.com']::before {
          background-image: url('@/assets/icons/social-networks/linkedin.svg');
        }
      }
    }
  }
}
</style>
