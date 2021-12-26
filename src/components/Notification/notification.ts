import { h, defineComponent, onMounted, PropType, Slot, watch } from 'vue';
import { useTimeoutFn, Stoppable } from '@vueuse/core';

import { NotificationType } from '@/compositions';

type DummyFunction = () => void;

const CROSS = '×';

function renderCloseButton(onClick: DummyFunction) {
  return h(
    'button',
    {
      class: 'message-close',
      'aria-label': 'close',
      onClick,
    },
    CROSS,
  );
}

function renderMessage(message: string | Slot) {
  const content = typeof message === 'function' ? { default: message } : message;
  return h('div', { class: 'message-content' }, content);
}
export default defineComponent({
  name: 'Notification',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      values: Object.values(NotificationType),
      default: NotificationType.Info,
    },
    message: {
      type: [String, Function] as PropType<string | Slot>,
      default: '',
    },
    duration: {
      type: Number,
      default: 5000,
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  setup(props, { attrs, emit }) {
    let timer: Stoppable | undefined;

    function close() {
      emit('close');
    }

    function createTimer() {
      if (props.duration > 0) {
        timer = useTimeoutFn(() => close(), props.duration);
      }
    }

    function stopTimer() {
      if (timer?.isPending.value) {
        timer.stop();
        timer = undefined;
      }
    }

    onMounted(() => {
      createTimer();
    });

    watch(
      () => props.duration,
      () => {
        stopTimer();
        createTimer();
      },
    );

    return () => {
      const message = renderMessage(props.message);
      const closeButton = props.closable ? renderCloseButton(close) : null;
      return h(
        'div',
        {
          class: ['message', { [`message-${props.type}`]: !!props.type }, attrs.class],
          role: 'alert',
        },
        [message, closeButton].filter(Boolean),
      );
    };
  },
});
