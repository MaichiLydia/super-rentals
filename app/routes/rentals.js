import Ember from 'ember';

const {
  Route,
  inject: { service },
  get
} = Ember;

export default Route.extend({
  session: service(),
  deferredTransition: service(),
  inactivityMonitor: service(),

  actions: {
    loginUser() {
      get(this, 'session').login();
      get(this, 'inactivityMonitor').setupWindowEvents();

      let attemptedTransition = get(this, 'deferredTransition').getTransition();

      if (attemptedTransition) {
        attemptedTransition.retry();
      }
    }
  }
});
