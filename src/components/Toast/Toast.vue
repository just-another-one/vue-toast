<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Notification } from '@/components/Notification';
import { Message } from '@/compositions';

export default defineComponent({
  name: 'Toast',
  components: {
    Notification,
  },
  props: {
    messages: {
      type: Array as PropType<Message[]>,
      required: true,
    },
    transition: {
      type: String,
      default: 'message-transition',
    },
  },
});
</script>
<template>
  <transition-group
    :name='transition'
    class='messages-container'
    tag='div'
  >
    <template v-for="message in messages">
      <slot>
        <notification v-bind="message" />
      </slot>
    </template>
  </transition-group>
</template>
