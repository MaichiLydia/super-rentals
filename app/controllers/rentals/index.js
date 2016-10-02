import Ember from 'ember';

const {
  Controller,
  inject: { service },
  computed,
  get
} = Ember;

export default Controller.extend({
  session: service(),
  isAuthenticated: computed('session.authenticated', {
    get() {
      let isAuthenticated = get(this, 'session').isAuthenticated();

      return isAuthenticated;
    }
  }),

  actions: {
    filterByCity(param) {
      if (param !== '') {
        return this.get('store').query('rental', { city: param });
      } else {
        return this.get('store').findAll('rental');
      }
    }
  }
});
