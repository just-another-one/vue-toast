import { App } from 'vue';

import { defineNotifications, NOTIFICATIONS } from '@/compositions';

function install(app: App) {
  const notifications = defineNotifications();

  app.config.globalProperties.$notifications = notifications;
  app.provide(NOTIFICATIONS, notifications);
}

export const NotificationsPlugin = { install };
