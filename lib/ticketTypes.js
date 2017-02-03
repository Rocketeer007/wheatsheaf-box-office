import { check } from 'meteor/check';

TicketTypes = {
  adults: {
    description: 'Adult Ticket',
    price: 8.50,
    key: 'Adults',
  },
  concessions: {
    description: 'Concession Ticket',
    price: 7.00,
    key: 'Concessions and Children',
  },
  complimentary: {
    description: 'Free Ticket',
    price: 0.00,
    key: 'Complimentary',
  },
  children: {
    description: 'Child Ticket (Panto only)',
    price: 5.00,
    key: 'Children',
  },
  other: {
    description: 'Unrecognised Ticket Type',
    price: 8.50,
    key: 'none',
  }
};

TicketTypes.getTicketTypes = function(eventType = 'normal') {
  check(eventType, String);
  if (eventType === 'panto') {
    return [TicketTypes.adults, TicketTypes.children, TicketTypes.complimentary];
  } else {
    return [TicketTypes.adults, TicketTypes.concessions, TicketTypes.complimentary];
  }
};

TicketTypes.getTicketTypeByKey = function(ticketKey) {
  check(ticketKey, String);

  // Loop through all the defined ticket types
  for (var ticket in TicketTypes) {
    // Ignore functions!
    if (typeof TicketTypes[ticket] === 'function') continue;

    if (ticketKey === TicketTypes[ticket].key) {
      return TicketTypes[ticket];
    }
  }
  var defaultTicket = Object.assign({}, TicketTypes.other);
  defaultTicket.description += '('+ticketKey+')';
  defaultTicket.key = ticketKey;
  return defaultTicket
}
