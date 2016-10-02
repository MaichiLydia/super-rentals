import Ember from 'ember';

const {
  Route,
  get,
  inject: { service }
} = Ember;

export default Route.extend({
  session: service(),
  deferredTransition: service(),

  beforeModel(transition) {
    let session = get(this, 'session');
    let deferredTransition = get(this, 'deferredTransition');

    if (!session.isAuthenticated()) {
      deferredTransition.setTransition(transition);
      this.transitionTo('rentals');
    }

    this._super(...arguments);
  }
});
