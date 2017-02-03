import { Template } from 'meteor/templating';
import { check } from 'meteor/check';

Template.ticketForm.onCreated(function() {
  this.currentTicketPrice = new ReactiveVar(this.data.ticket.ticketPrice);
});

Template.ticketForm.helpers({
  isCurrentTicketType: function(ticketKey) {
    check(ticketKey, String);

    return (ticketKey === this.key);
  },
  getSelectedTicketPrice: function() {
    return Template.instance().currentTicketPrice.get();
  },
  hasArrivedChecked: function() {
    var checked = this.ticket.hasArrived ? "checked" : "";
    return checked;
  },
});

Template.ticketForm.events({
  'change .ticketType': function(event, template) {
    var newTicketType = TicketTypes.getTicketTypeByKey(event.target.value);
    template.currentTicketPrice.set(newTicketType.price);
  },
});

Template.ticketDetails.events({
  'click #cancel': function(event) {
    Router.go('order.details', this);
  },
  'submit #ticketForm': function(event) {
    var currentOrder = this;
    var ticketForm = event.target;
    var seatCodes = [];
    var ticketTypes = [];
    var hasArriveds = [];

    // Prevent form from firing and reloading the page
    event.preventDefault();

    // Check if we are dealing with one or multiple tickets
    if (ticketForm.seatCode instanceof NodeList) {
      // Process multiple tickets
      for (var i = 0; i < ticketForm.seatCode.length; i++) {
        seatCodes.push(ticketForm.seatCode[i].value);
        ticketTypes.push(ticketForm.ticketType[i].value);
        hasArriveds.push(ticketForm.hasArrived[i].checked);
      }
    } else {
      // Process single ticket
      seatCodes.push(ticketForm.seatCode.value);
      ticketTypes.push(ticketForm.ticketType.value);
      hasArriveds.push(ticketForm.hasArrived.checked);
    }

    for (var i = 0; i < seatCodes.length; i++) {
      console.log('Update Order '+this.orderNumber+' / Seat '+seatCodes[i]+' to: '+ticketTypes[i]+'/'+hasArriveds[i]);
      Meteor.call("updateSeat", this.orderNumber, parseInt(seatCodes[i]), ticketTypes[i], hasArriveds[i]);
    }

    Router.go('order.details', this);
  },
  'click #delete': function(event) {
    alert('TODO: Implement delete of seatCode '+this.ticket.seatCode);
  },
});
