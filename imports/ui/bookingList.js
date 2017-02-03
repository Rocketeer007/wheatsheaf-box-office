import { Template } from 'meteor/templating';

import './booking.js';

Template.bookingList.helpers({
  templateGestures: {
    'press ul.bookings li': function longPress(event, templateInstance) {
      if (!this.orderNumber) return;
      alert('TODO: Not yet implemented (checkout entire order for '+this.orderNumber+')');
    },
  },
  bookings() {
    return Bookings.find({}, {sort: {orderStatus: -1, lastName: 1}});
  },
});

Template.bookingList.events({
  'click .newOrder': function(event) {
    Router.go('order.new');
  },
});
