<template>
  <section class="loader">
    <div class="orbit-spinner">
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/helpers/helpers';

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

.loader {
  background-color: rgba(255, 255, 255, 0.8);
  @include position(fixed, 0, 0, 0, 0, 1080);

  .orbit-spinner {
    @include square(55px);
    border-radius: 50%;
    perspective: 800px;
    @extend %center-absolute;

    .orbit {
      position: absolute;
      box-sizing: border-box;
      @include square(100%);
      border-radius: 50%;

      &:nth-child(1) {
        top: 0%;
        left: 0%;
        animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
        border-bottom: 3px solid $primary;
      }

      &:nth-child(2) {
        top: 0%;
        right: 0%;
        animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
        border-right: 3px solid $primary;
      }

      &:nth-child(3) {
        right: 0%;
        bottom: 0%;
        animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
        border-top: 3px solid $primary;
      }
    }
  }
}
</style>
