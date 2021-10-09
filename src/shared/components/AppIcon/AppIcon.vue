<template>
  <component
    :is="iconComponent"
    v-bind="{ class: $props.class, width: width, height: height, fill: fill }"
  ></component>
</template>

<script lang="ts" setup>
import { shallowRef, onMounted } from 'vue';

type Props = {
  class?: string;
  icon: string;
  width?: number;
  height?: number;
  fill?: string;
};

const props = defineProps<Props>();

const iconComponent = shallowRef();

const setIconComponent = async () => {
  try {
    const module = await import(`./Icons/App${props.icon}.vue`);
    iconComponent.value = module.default;
  } catch (error) {
    console.error(error);
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  setIconComponent();
});
</script>
