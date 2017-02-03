import { Template } from 'meteor/templating';

Template.newOrder.events({
  'click #cancel': function(event) {
    Router.go('bookings');
  },
  'click #processOrder': function(event) {
    alert('TODO: Not yet implemented');
  },
})
