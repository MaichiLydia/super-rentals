import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';
import Ember from 'ember';

const {
  Service,
  run
} = Ember;

let clock;

moduleFor('service:inactivity-monitor', 'Unit | Service | inactivity monitor', {
  beforeEach() {
    clock = sinon.useFakeTimers();
  },
  afterEach() {
    clock.restore();
  }
});

test('`setupWindowEvents` properly throttles action', function(assert) {
  assert.expect(2);

  let resetTimeout = function() {
    assert.ok(true, 'this function is called');
  }

  let service = this.subject({
    userEvents: ['keydown'],
    inactivityTimeout: 1000,
    resetTimeout
  });

  service.setupWindowEvents();
  $(window).trigger('keydown');
  $(window).trigger('keydown');
  clock.tick(2000);
  $(window).trigger('keydown');
  $(window).trigger('keydown');
});


test('`resetTimeout` resets our timeout and prevenst logout', function(assert) {
  assert.expect(1);
  let didBecomeInactive = function() {
    assert.ok(true, 'user became inactive');
  }

  let service = this.subject({
    didBecomeInactive,
    inactivityTimeout: 1000
  });

  service.resetTimeout();
  clock.tick(500);
  service.resetTimeout();
  clock.tick(1500);
});

test('`didBecomeInactive` logs user out through session service', function(assert) {
  assert.expect(2);

  let sessionStub = Service.extend({
    isAuthenticated() {
      assert.ok(true, 'check authentication');
      return true;
    },
    logout() {
      assert.ok(true, 'user is logged out');
    }
  });

  let service = this.subject();

  this.register('service:session', sessionStub);
  this.inject.service('session', { as: 'session' });

  service.didBecomeInactive();
});

test('`didBecomeInactive` logs user out through session service', function(assert) {
  assert.expect(1);

  let sessionStub = Service.extend({
    isAuthenticated() {
      assert.ok(true, 'check authentication');
      return false;
    },
    logout() {
      assert.ok(true, 'this is not called');
    }
  });

  let service = this.subject();

  this.register('service:session', sessionStub);
  this.inject.service('session', { as: 'session' });

  service.didBecomeInactive();
});
