import { Template } from 'meteor/templating';

import './booking.html';

Template.booking.helpers({
  createOrderSummary() {
    let ticketTypes = new Map();
    var outputText = [];

    // Loop through all the Tickets on the Order
    for (let ticket of this.tickets) {
      if (ticketTypes.has(ticket.ticketType)) {
        ticketTypes.set(ticket.ticketType, ticketTypes.get(ticket.ticketType) + 1);
      } else {
        ticketTypes.set(ticket.ticketType, 1);
      }
    }
    for (var [key, value] of ticketTypes) {
      outputText.push(value + ' x ' + TicketTypes.getTicketTypeByKey(key).description);
    }
    return outputText;
  }
});

Template.booking.events({
  'click .order': function(event) {
    Router.go('order.details', this);
  },
});
