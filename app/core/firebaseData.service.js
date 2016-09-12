(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      users: root.child('users'),
      emails: root.child('emails'),
      textMessages: root.child('textMessages'),
			questions: root.child('questions')
    };

    return service;
  }

})();
