import Ember from 'ember';

export default Ember.Controller.extend({
    users:[
        {
            id:1,
            name: 'Bob',
            occupation: 'plumber'
        },
         {
            id:2,
            name: 'Lisa',
            occupation: 'lawyer'
        },
         {
            id:3,
            name: 'Sheryl',
            occupation: 'doctor'
        }
    ],
    actions: {
        testAction(){
            alert('hey there');
        }
    }
});
