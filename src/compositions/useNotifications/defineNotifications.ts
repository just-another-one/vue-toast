import { computed, Slot } from 'vue';

import { useMessages, Message } from '@/compositions/useMessages';

export enum NotificationType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface NotificationProps extends Message {
  message: string | Slot;
  type?: NotificationType;
  duration?: number;
  closable?: boolean;
}

type Options = Omit<NotificationProps, 'type'>;

export function defineNotifications() {
  const { messages, add, remove } = useMessages<NotificationProps>();
  const notifications = computed(() => [...messages.value.values()]);

  function close(id: symbol) {
    remove(id);
  }

  function closeAll() {
    messages.value.clear();
  }

  function error(options: Options) {
    return add({ ...options, type: NotificationType.Error });
  }

  function info(options: Options) {
    return add({ ...options, type: NotificationType.Info });
  }

  function success(options: Options) {
    return add({ ...options, type: NotificationType.Success });
  }

  function warning(options: Options) {
    return add({ ...options, type: NotificationType.Warning });
  }

  return {
    notifications,
    close,
    closeAll,
    error,
    info,
    success,
    warning,
  };
}
