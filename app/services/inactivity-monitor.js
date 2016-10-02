import Ember from 'ember';
import ENV from '../config/environment';

const {
  Service,
  get,
  inject: { service },
  run: { cancel, later, throttle },
  set
} = Ember;

export default Service.extend({
  inactivityTimeout: ENV.APP.sessionTimeout,
  session: service(),
  userEvents: ['mousemove', 'touchmove', 'keydown'],
  timeoutTimer: null,
  throttleAction: null,

  setupWindowEvents() {
    let events = get(this, 'userEvents').map((event) => {
      return `${event}.inactivityMonitor`;
    }).join(' ');

    $(window).on(events, () => {
      let throttleAction = throttle(this, 'resetTimeout', 1000);
      set(this, 'throttleAction', throttleAction);
    });
  },

  resetTimeout() {
    cancel(get(this, 'timeoutTimer'));
    let inactivityTimeout = get(this, 'inactivityTimeout');

    let timeoutTimer = later(this, 'didBecomeInactive', inactivityTimeout);
    set(this, 'timeoutTimer', timeoutTimer);
  },

  didBecomeInactive() {
    let session = get(this, 'session');
    if (session.isAuthenticated()) {
      session.logout();
    }
  },

  willDestroy() {
    $(window).off('.inactivityMonitor');
    cancel(get(this, 'timeoutTimer'));
    cancel(get(this, 'throttleAction'));

    this._super(...arguments);
  }
});
