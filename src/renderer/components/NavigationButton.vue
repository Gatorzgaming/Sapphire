<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{ icon: any, routeName: string, notifs?: number, mobile?: boolean, text?: string, description?: string }>();
const route = useRoute();
const isActive = computed(() => route.name?.toString().startsWith(props.routeName) || props.routeName === route.name);
</script>

<template>
  <div
    :class="[
      isActive ? 'text-black bg-primary-800 font-semibold' : 'text-primary-900 hover:text-primary-800 hover:bg-surface-700 ',
      text ? 'px-4 py-2 gap-2.5 ' : 'p-3',
      mobile && 'rounded-full'
    ]"
    class="items-center gap-2 text-11px flex relative "
    @click="$router.push({ name: routeName })"
  >
    <component
      :is="icon"
    />
    <div
      v-if="mobile ? isActive && text : text"
      class="flex flex-col gap-1"
    >
      {{ text }}
      <p 
        v-if="description"
        class="text-9px opacity-50"
      >
        {{ description }}
      </p>
    </div>
    <div
      v-if="notifs"
      class="absolute top-2 right-0 transform -translate-x-1/2 p-0.5 overflow-hidden text-primary-800 font-aseprite text-7px items-center flex justify-center"
    >
      {{ notifs }}
    </div>
  </div>
</template>
