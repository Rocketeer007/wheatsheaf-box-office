import { check } from 'meteor/check';
import { Match } from 'meteor/check';

Meteor.methods({
  updateSeat: function(orderNumber, seatCode, ticketType, hasArrived) {
    check(orderNumber, Match.Integer);
    check(seatCode, Match.Integer);
    check(ticketType, String);
    check(hasArrived, Boolean);

    Bookings.update(
      {'orderNumber': orderNumber, 'tickets.seatCode': seatCode},
      {$set: {
        'tickets.$.ticketType': ticketType,
        'tickets.$.ticketPrice': TicketTypes.getTicketTypeByKey(ticketType).price,
        'tickets.$.hasArrived': hasArrived,
      }}
    );
  },
});
