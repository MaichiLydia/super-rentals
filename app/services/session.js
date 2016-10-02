import Ember from 'ember';

const {
  Service,
  get,
  set
} = Ember;

export default Service.extend({
  authenticated: false,

  login() {
    set(this, 'authenticated', true);
  },

  logout() {
    console.log('they have been logged out');
    set(this, 'authenticated', false);
  },

  isAuthenticated() {
    return get(this, 'authenticated');
  }
});
