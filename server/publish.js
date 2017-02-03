import { check } from 'meteor/check';
import { Match } from 'meteor/check';

Meteor.publish("bookings", function publishBookings() {
  return Bookings.find();
});

Meteor.publish("orderDetails", function publishOrderDetails(orderNumber) {
  check(orderNumber, Match.Integer);
  var orders = Bookings.find({'orderNumber': parseInt(orderNumber)});
  return orders;
});

Meteor.publish('ticketDetails', function publishTicketDetails(seatCode) {
  check(seatCode, Match.Integer);
  var tickets = Bookings.find({'tickets.seatCode': parseInt(seatCode)},
    {fields: {
      orderNumber: 1,
      orderStatus: 1,
      firstName: 1,
      lastName: 1,
      tickets: 1,
      'tickets.$': 1}
    });
  return tickets;
});
