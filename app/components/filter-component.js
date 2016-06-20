import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Ember.Component.extend({
  firstName: null,
  users: null,
  filteredUsers: null,

  didReceiveAttrs() {
    this._super(...arguments);
    let users = get(this, 'users');
    set(this, 'filteredUsers', users);
  },

  actions: {
    filterUsers() {
      let firstName = get(this, 'firstName');
      let users = get(this, 'users');
      let filtered = users.findBy('name', firstName);
      if (filtered) {
        set(this, 'filteredUsers', [ filtered ]);
      } else {
        set(this, 'filteredUsers', users);
      }
    }
  }
});
