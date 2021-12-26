<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

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
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const items = computed<Message[]>(() => {
      return props.reverse ? [...props.messages].reverse() : props.messages;
    });

    return { items };
  },
});
</script>
<template>
  <transition-group
    :name='transition'
    class='messages-container'
    tag='div'
  >
    <template v-for="item in items">
      <slot>
        <notification v-bind="item" />
      </slot>
    </template>
  </transition-group>
</template>
