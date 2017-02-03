import { check } from 'meteor/check';
import '../imports/ui/bookingList.js';
import '../imports/ui/orderDetails.js';
import '../imports/ui/ticketDetails.js';
import '../imports/ui/newOrder.js';

Template.registerHelper('currency', formatCurrency);
Template.registerHelper('ticketDescription', findTicketDescription);
Template.registerHelper('plusOne', function(value) {check(value, Number); return value+1;});
Template.registerHelper('ticketTypes', TicketTypes.getTicketTypes);

function formatCurrency(value, currencyCode='£') {
  check(value, Number);
  check(currencyCode, String);

  return currencyCode+numeral(value).format('0.00');
}

function findTicketDescription(ticketKey) {
  check(ticketKey, String);

  var ticket = TicketTypes.getTicketTypeByKey(ticketKey);
  return ticket.description;
}
