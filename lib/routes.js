Router.configure({
  loadingTemplate: 'loadingTemplate',
  layoutTemplate: 'layoutTemplate',
  yieldTemplates: {
    'header': { to: 'header' },
    'footer': { to: 'footer' }
  }
});

Router.route('/', {
    name: 'bookings',
    template:'bookingList',
    //layoutTemplate: 'layoutTemplate',
    // data: function() {
    //     ...
    // },
    waitOn: function () {
       return Meteor.subscribe("bookings");
    },
  });

Router.route('/order/:orderNumber', {
  name: 'order.details',
  template: 'orderDetails',
  cache: 100,
  expireIn: 60,
  waitOn: function() {
    var orderNumber = parseInt(this.params.orderNumber);
    return Meteor.subscribe('orderDetails', orderNumber);
  },
  data: function() {
    var orderNumber = parseInt(this.params.orderNumber);
    var order = Bookings.findOne({'orderNumber': orderNumber});
    return order;
  },
});

Router.route('/order/:orderNumber/edit', {
  name: 'order.edit',
  template: 'ticketDetails',
  cache: 100,
  expireIn: 60,
  waitOn: function() {
    var orderNumber = parseInt(this.params.orderNumber);
    return Meteor.subscribe('orderDetails', orderNumber);
  },
  data: function() {
    var orderNumber = parseInt(this.params.orderNumber);
    var order = Bookings.findOne({'orderNumber': orderNumber});
    return order;
  },
});

Router.route('/ticket/:seatCode', {
  name: 'ticket.details',
  template: 'ticketDetails',
  cache: 100,
  expireIn: 60,
  waitOn: function() {
    var seatCode = parseInt(this.params.seatCode);
    return Meteor.subscribe('ticketDetails', seatCode);
  },
  data: function() {
    var seatCode = parseInt(this.params.seatCode);
    var ticket = Bookings.findOne({'tickets.seatCode': seatCode});
    return ticket;
  },
});

Router.route('/order', {
  name: 'order.new',
  template: 'newOrder',
});
