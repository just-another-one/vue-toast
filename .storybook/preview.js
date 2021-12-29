import { app } from '@storybook/vue3';
import { NotificationsPlugin } from '../src';

app.use(NotificationsPlugin);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
