import Ember from 'ember';

export default Ember.Controller.extend({
  users: [{
    id: 1,
    name: 'Bob',
    occupation: 'chef'
  }, {
    id: 2,
    name: 'Lisa',
    occupation: 'lawyer'
  }, {
    id: 3,
    name: 'Arthur',
    occupation: 'doctor'
  }],
  actions: {
    filterUsersByName(name) {
      let users = Ember.get(this, 'users');
      return [users.findBy('name', name)] || users;
    }
  }
});
