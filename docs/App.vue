<script lang="ts">
import anime from 'animejs';
import { defineComponent, h } from 'vue';

import '@/assets/styles.scss';
import { Notifications } from '@/components';
import { useNotifications } from '@/compositions';

function enter(element: HTMLElement) {
  anime({
    targets: element,
    translateX: ['100%', 0],
    opacity: [0, 1],
    duration: 250,
    easing: 'easeInOutCubic',
  });
}

function leave(element: HTMLElement, done: () => void) {
  anime({
    targets: element,
    height: 0,
    margin: 0,
    opacity: 0,
    duration: 250,
    easing: 'easeInOutCubic',
    complete: done,
  });
}

export default defineComponent({
  name: 'App',
  components: {
    Notifications,
  },
  setup() {
    const { close, closeAll, error, info, success, warning } = useNotifications();
    const message =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec iaculis lectus. Ut vel metus vitae urna iaculis volutpat.';

    const id = Symbol('sticky:message');

    function showNotification() {
      const items = [success, info, warning, error];
      const notification = items[Math.floor(Math.random() * items.length)];
      notification({ message });
    }

    function showStickyNotification() {
      info({ id, message: 'Sticky note', duration: 0 });
    }

    function updateStickyNotification() {
      error({ id, message: () => [h('span', {}, 'Updated sticky note')], duration: 2000 });
    }

    function closeStickedNotification() {
      close(id);
    }

    return {
      enter,
      leave,
      closeStickedNotification,
      closeAll,
      showNotification,
      showStickyNotification,
      updateStickyNotification,
    };
  },
});
</script>
<template>
  <button @click="showNotification">Show notification</button>
  <button @click="showStickyNotification">Show sticky notification</button>
  <button @click="updateStickyNotification">Update sticky notification</button>
  <button @click="closeStickedNotification">close sticked notification</button>
  <button @click="closeAll">Close all</button>
  <notifications
    transition="anime"
    @enter='enter'
    @leave='leave'
  />
</template>
<style lang="scss">
@import 'normalize.css';

body {
  font-family: -apple-system, 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: 'liga', 'kern';
}
</style>
