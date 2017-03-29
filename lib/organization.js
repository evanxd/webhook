'use strict';

function Organization() {}

Organization.prototype = {
  // Assign the value then initialize index.js.
  _orgDoc: null,

  findManager: function(email) {
    try {
      var manager = this._orgDoc.querySelector(`[email="${email}"]`).parentNode;
      return manager ? {
        name: manager.getAttribute('name'),
        email: manager.getAttribute('email'),
        title: manager.getAttribute('title'),
        department: manager.getAttribute('department'),
        apiKey: manager.getAttribute('apiKey'),
      } : null;
    } catch (e) {
      console.error(e.message);
      return null;
    }
  },
};

module.exports = Organization;