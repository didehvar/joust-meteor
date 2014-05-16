// Setup alert helpers. Used to display alerts to a user. They will appear
// just below the navigation but above all content.

alerts = new Meteor.Collection(null);

var sendAlert = function(message, style, identifier, options) {
  var msg = message + '.';
  if (alerts.find({ message: msg }).count() === 0) {
    alerts.insert({
      // Alert body.
      message: msg,

      // Added to alert class.
      style: style,

      // Used for fetching different types of alerts.
      identifier: identifier || 'general',

      // General options:
      //   'spinner': true  - adds a fontawesome spinner before message.
      //   'close': true    - adds close icon.
      options: options || {},
    });
  }
}

alert = {
  success: function(message, identifier, options) {
    sendAlert(message, 'alert-success', identifier, options);
  },
  info: function(message, identifier, options) {
    sendAlert(message, 'alert-info', identifier, options);
  },
  warning: function(message, identifier, options) {
    sendAlert(message, 'alert-warning', identifier, options);
  },
  danger: function(message, identifier, options) {
    sendAlert(message, 'alert-danger', identifier, options);
  },

  clear: function(message) {
    alerts.remove({ message: message + '.' });
  },

  clearAll: function() {
    alerts.remove({});
  }
}