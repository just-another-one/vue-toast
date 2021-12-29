import { defineComponent, h, nextTick, Slot } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';

import { Notifications, NotificationsPlugin, useNotifications } from '@/index';

const TestComponent = defineComponent({
  components: {
    Notifications,
  },
  setup: () => useNotifications(),
  template: '<notifications />',
});

describe('useNotifications', () => {
  let wrapper: VueWrapper<InstanceType<typeof TestComponent>>;
  let notification: VueWrapper;

  beforeEach(() => {
    wrapper = mount(TestComponent, {
      global: {
        plugins: [NotificationsPlugin],
        stubs: {
          'transition-group': true,
        },
      },
    });
  });
  afterEach(() => {
    wrapper.vm.closeAll();
    wrapper.unmount();
  });

  async function addAndFindNotification(notify: () => void) {
    notify();
    await nextTick();
    notification = wrapper.findComponent({ name: 'Notification' }) as VueWrapper;
  }

  async function addMessage(message: string | Slot) {
    await addAndFindNotification(() => wrapper.vm.info({ message }));
  }

  describe('when "message" is string', () => {
    beforeEach(async () => addMessage('My cool message'));

    it('renders simple notification', () => {
      expect(notification.html()).toMatchInlineSnapshot(`
        <div class="message message-info" role="alert">
          <div class="message-content">My cool message</div>
          <button aria-label="close" class="message-close">×</button>
        </div>
      `);
    });
  });

  describe('when "message" is function', () => {
    beforeEach(async () => addMessage(() => [h('h3', 'My header'), h('div', 'My cool message')]));

    it('renders custom notification', () => {
      expect(notification.html()).toMatchInlineSnapshot(`
        <div class="message message-info" role="alert">
          <div class="message-content">
            <h3>My header</h3>
            <div>My cool message</div>
          </div>
          <button aria-label="close" class="message-close">×</button>
        </div>
      `);
    });
  });

  describe('when "closable" is "false"', () => {
    beforeEach(async () => {
      await addAndFindNotification(() => wrapper.vm.info({ message: 'My cool message', closable: false }));
    });

    it('renders notification without close button', () => {
      const closeButton = notification.find('.message-close');
      expect(closeButton.exists()).toBe(false);
    });
  });

  describe('useNotification', () => {
    describe('.success', () => {
      beforeEach(async () => {
        await addAndFindNotification(() => wrapper.vm.success({ message: 'My cool message' }));
      });

      it('renders success notification', () => {
        expect(notification.classes()).toEqual(['message', 'message-success']);
      });
    });

    describe('.info', () => {
      beforeEach(async () => {
        await addAndFindNotification(() => wrapper.vm.info({ message: 'My cool message' }));
      });

      it('renders info notification', () => {
        expect(notification.classes()).toEqual(['message', 'message-info']);
      });
    });

    describe('.warning', () => {
      beforeEach(async () => {
        await addAndFindNotification(() => wrapper.vm.warning({ message: 'My cool message' }));
      });

      it('renders warning notification', () => {
        expect(notification.classes()).toEqual(['message', 'message-warning']);
      });
    });

    describe('.error', () => {
      beforeEach(async () => {
        await addAndFindNotification(() => wrapper.vm.error({ message: 'My cool message' }));
      });

      it('renders error notification', () => {
        expect(notification.classes()).toEqual(['message', 'message-error']);
      });
    });

    describe('.close', () => {
      const id = Symbol('myId');
      beforeEach(async () => {
        wrapper.vm.info({ id, message: 'My cool message1' });
        wrapper.vm.info({ message: 'My cool message2' });
        await nextTick();
      });

      it('closes notification by "id"', async () => {
        let notifications = wrapper.findAllComponents({ name: 'Notification' });
        expect(notifications.length).toEqual(2);
        wrapper.vm.close(id);
        await nextTick();
        notifications = wrapper.findAllComponents({ name: 'Notification' });
        expect(notifications.length).toEqual(1);
        const message = notifications[0].find('.message-content');
        expect(message.text()).toEqual('My cool message2');
      });
    });

    describe('.closeAll', () => {
      beforeEach(async () => {
        wrapper.vm.info({ message: 'My cool message' });
        wrapper.vm.info({ message: 'My cool message' });
        await nextTick();
      });

      it('closes all notifications', async () => {
        let notifications = wrapper.findAllComponents({ name: 'Notification' });
        expect(notifications.length).toEqual(2);
        wrapper.vm.closeAll();
        await nextTick();
        notifications = wrapper.findAllComponents({ name: 'Notification' });
        expect(notifications.length).toEqual(0);
      });
    });
  });
});
