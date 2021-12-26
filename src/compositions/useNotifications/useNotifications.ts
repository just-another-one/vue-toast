import { inject, InjectionKey } from 'vue';

import { defineNotifications } from './defineNotifications';

type NotificationsInstance = ReturnType<typeof defineNotifications>;
export const NOTIFICATIONS: InjectionKey<NotificationsInstance> = Symbol('NOTIFICATIONS');

export function useNotifications() {
  const notifications = inject(NOTIFICATIONS);
  if (!notifications) {
    throw new Error('Notifications not installed');
  }

  return notifications;
}
