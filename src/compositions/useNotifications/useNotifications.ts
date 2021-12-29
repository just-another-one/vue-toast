import { inject, InjectionKey } from 'vue';

import { defineNotifications } from './defineNotifications';

type NotificationsInstance = ReturnType<typeof defineNotifications>;
export const NOTIFICATIONS: InjectionKey<NotificationsInstance> = Symbol('NOTIFICATIONS');

export function useNotifications() {
  // eslint-disable-next-line unicorn/no-useless-undefined
  const notifications = inject(NOTIFICATIONS, undefined);
  if (!notifications) {
    throw new Error('Notifications not installed');
  }

  return notifications;
}
