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
  const { messages, add } = useMessages<NotificationProps>();
  const notifications = computed(() => [...messages.value.values()]);

  function error(options: Options) {
    add({ ...options, type: NotificationType.Error });
  }

  function info(options: Options) {
    add({ ...options, type: NotificationType.Info });
  }

  function success(options: Options) {
    add({ ...options, type: NotificationType.Success });
  }

  function warning(options: Options) {
    add({ ...options, type: NotificationType.Warning });
  }

  return {
    notifications,
    error,
    info,
    success,
    warning,
  };
}
