import { Template } from 'meteor/templating';

Template.orderDetails.helpers({
  templateGestures: {
    'press ul.tickets li': function longPress(event, templateInstance) {
      Router.go('ticket.details', this);
    },
  },
  anySelected: function() {
    var selectedSeats = Session.get('selectedSeats') || [];
    return (selectedSeats.length > 0);
  }
});

Template.ticket.helpers({
  isSelected: function(seatCode) {
    var selectedSeats = Session.get('selectedSeats') || [];
    if (selectedSeats.indexOf(seatCode) !== -1) return 'selected';
    else return null;
  }
});

Template.orderDetails.events({
  'click #cancel': function(event) {
    Session.set('selectedSeats', null);
    Router.go('bookings');
  },
  'click #editOrder': function(event) {
    Router.go('order.edit', this);
  },
  'click #processAll': function(event) {
    alert('TODO: Not yet implemented');
    Session.set('selectedSeats', null);
  },
  'click #processSelected': function(event) {
    alert('TODO: Not yet implemented');
    Session.set('selectedSeats', null);
  },
  'click .ticket': function(event) {
    var selectedSeats = Session.get('selectedSeats') || [];
    var index = selectedSeats.indexOf(this.seatCode);
    if (index === -1) {
      // Add this seat to the selectedSeats array
      selectedSeats.push(this.seatCode);
    } else {
      // Remove this seat from the selectedSeats array
      selectedSeats.splice(index, 1);
    }
    Session.set('selectedSeats', selectedSeats);
  },
})
