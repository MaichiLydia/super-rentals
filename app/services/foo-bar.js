import Ember from 'ember';

export default Ember.Service.extend({
  property: null,

  setProperty(thing) {
    this.set('property', thing);
  },

  getProperty() {
    return this.get('property');
  }
});
