<script lang="ts">
import { defineComponent } from 'vue';

import { Toast } from '@/components/Toast';
import { useNotifications } from '@/compositions';

export default defineComponent({
  name: 'Notifications',
  components: {
    Toast,
  },
  setup() {
    const { notifications } = useNotifications();

    return { notifications };
  },
});
</script>
<template>
  <toast :messages="notifications" />
</template>
