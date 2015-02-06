'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.settingsMgr
 * @description
 * # settingsMgr
 * Factory in the recipeshopperApp.
 */

angular
.module('settingsMod', [
  'firebase',
]);

angular.module('settingsMod')
  .factory('settingsMgr', function ($rootScope, $log, $q, $firebase, FIREBASE_URL) {
    $log.debug('settingsMgr: init factory');

    var defaultSettings = {
      'shoppingListSortOrder' : 'aisle',
      'recipeSortOrder': 'recipename'
    };

    var data = {};
    var initData = function () {
      data.currentUserUid = '';
      data.settings = defaultSettings;
    };
    initData();

   var setSettingAsync = function(settingName, value) {
          data.settings[settingName] = value;
          if(data.currentUserUid) {
            return data.settings.$save();
          }
    }; // setSettingAsync

   var addUserAsync = function(userUid, user) {
      var fbUrl = FIREBASE_URL + '/users/';
      var ref = new Firebase(fbUrl);
      var usersRef = $firebase(ref);
      $log.debug('settingsMgr: usersRef', usersRef);
      var userInfo = {
        myUid: userUid,
        firstname: user.firstname,
        lastname: user.lastname
      };
      for (var prop in defaultSettings) {
        if(defaultSettings.hasOwnProperty(prop)){
            $log.debug('settingsMgr: addUserAsync:', prop + " = " + defaultSettings[prop]);
            userInfo[prop] = defaultSettings[prop];
        }
      };

      $log.debug('$log.logs to be unit tested:');
      $log.log(fbUrl);   
      $log.log(userInfo);   
      return usersRef.$set(userUid, userInfo);
    }; // addUserAsync

   var setCurrentUserAsync = function(userUid) {
      var fbUrl = FIREBASE_URL + '/users/' + userUid;
      data.ref = new Firebase(fbUrl);
      data.settingsRef = $firebase(data.ref);

      $log.debug('$log.logs to be unit tested:');
      $log.log(fbUrl);   
      data.settings = data.settingsRef.$asObject();
      return data.settings.$loaded();
    }; // setCurrentUserAsync

    var clearCurrentUserAsync = function () {
      var deferred = $q.defer();
      $log.debug('settingsMgr. clearCurrentUserAsync');
      if(data && data.ref && data.settings) {
        data.settings.$destroy();
      }
      initData();
      deferred.resolve('');
      return deferred.promise;
    }; //clearCurrentUserAsync

    var currentUserHasNotChanged = function () {
      var deferred = $q.defer()
      deferred.resolve(data.currentUserUid);
      return deferred.promise;
    }


    // Public API here
    return {
      // getSettings: function () {
      //   return getExistingSettingsAsync();
      // }, // getSettings

      addUser: function (userUid, user) {
        return addUserAsync(userUid, user);
      },

      setCurrentUser: function (userUid) {
        $log.debug('settingsMgr: setCurrentUser: data.currentUserUid, userUid', data.currentUserUid, userUid);
        if(data.currentUserUid == userUid) {
          return currentUserHasNotChanged();
        }
        data.currentUserUid = userUid;
        var resultPromise = userUid ? setCurrentUserAsync(userUid) : clearCurrentUserAsync();
        resultPromise.then( function (data) {
            $rootScope.$broadcast('handleCurrentUserSet');
        });
        return resultPromise;
        // if(userUid) {
        //   return setCurrentUserAsync(userUid);
        // } // else 
        // return clearCurrentUserAsync();
      },

      getCurrentUser: function () {
        return data.currentUserUid;
      },

      getSetting: function (settingName) {
        // return getExistingSettingAsync(settingName);
        return data.settings[settingName];
      }, // getSetting

      setSetting: function (settingName, value) {
        return setSettingAsync(settingName, value);
      } // setSetting

      // THIS IS FOR UNIT TESTING ONLY
      // $$$setDataSettings: function(userInfo) {
      //   data.settings = userInfo;
      // }
    };

  });
