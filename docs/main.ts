import { createApp } from 'vue';

import { NotificationsPlugin } from '@/index';
import App from './App.vue';

const app = createApp(App);
app.use(NotificationsPlugin);
app.mount('#app');
