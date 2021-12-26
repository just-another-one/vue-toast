import { ref } from 'vue';

export interface Message {
  id?: symbol;
  onClose?: () => void;
}

export function useMessages<T extends Message = Message>() {
  let messageId = 0;
  const messages = ref(new Map<symbol, T>());

  function remove(id: symbol) {
    messages.value.delete(id);
  }

  function add(props: T) {
    const key: symbol = props.id || Symbol(messageId++);
    const message = {
      ...props,
      key,
      onClose: () => {
        remove(key);
        props.onClose?.();
      },
    };
    messages.value.set(key, message);
  }

  return { add, remove, messages };
}
