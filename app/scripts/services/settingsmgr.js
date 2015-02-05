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
  .factory('settingsMgr', function ($log, $q, $firebase, FIREBASE_URL) {
    
    var defaultSettings = {
      'shoppingListSortOrder' : 'aisle',
      'recipeSortOrder': 'recipename'
    };

    // var setDefaultsIfNeeded = function() {
    //   $log.debug('settingsMgr: setDefaultsIfNeeded: data.settings before', data.settings);
    //   for(var key in defaultSettings) {
    //     if(data.settings[key] == undefined) {
    //       data.settings[key] = defaultSettings[key];
    //       // var item = {};
    //       // item[key] = defaultSettings[key];
    //       // data.settings.$add(item);
    //       $log.debug('added data.settings\[', key, '\] equals ', data.settings[key]);
    //     }
    //   }
    //   data.settings.$save();
    //   $log.debug('settingsMgr: setDefaultsIfNeeded: data.settings AFTER', data.settings);
    // }

    var data = {};
    data.settings = defaultSettings;
    // $log.debug('settingsMgr: data.settings set', data.settings);

    // var fbUrl = FIREBASE_URL + '/users/';
    // data.usersRef = new Firebase(fbUrl);
    // $log.debug('settingsMgr: data.usersRef', data.usersRef);

    // data.dataRef = $firebase(data.ref);
    // data.settings = data.dataRef.$asObject();
    // data.settings.$loaded().then(
    //   function() {
    //     $log.debug('settingsMgr: data.settings from FB', data.settings);
    //     setDefaultsIfNeeded();
    //   }
    // );

   var getExistingSettingsAsync = function() {
          var deferred = $q.defer();
          // $log.debug('settingsMgr. getExistingSettingsAsync (existing)', data.settings);
          // $log.debug(data.settings);
          deferred.resolve(data.settings);
          return deferred.promise;
    }; // getExistingSettingsAsync

   var getExistingSettingAsync = function(settingName) {
          var deferred = $q.defer();
          // $log.debug('settingsMgr. getExistingSettingAsync (existing)', data.settings[settingName]);
          deferred.resolve(data.settings[settingName]);
          return deferred.promise;
    }; // getExistingSettingAsync

   var setSettingAsync = function(settingName, value) {
          var deferred = $q.defer();
          data.settings[settingName]= value;
          deferred.resolve(data.settings[settingName]);
          return deferred.promise;
    }; // setSettingAsync

   var addUserAsync = function(userUid, user) {
      var fbUrl = FIREBASE_URL + '/users/';
      data.ref = new Firebase(fbUrl);
      data.usersRef = $firebase(data.ref);
      $log.debug('settingsMgr: data.usersRef', data.usersRef);
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

      // $log.log content is tested in UNIT TEST
      $log.log(userInfo);   
      return data.usersRef.$set(userUid, userInfo);

      // var deferred = $q.defer();
      // // $log.debug('settingsMgr. addUserAsync (user)', user);
      // deferred.resolve(userInfo);
      // return deferred.promise;
    }; // addUserAsync

   var setCurrentUserAsync = function(userUid) {
          var deferred = $q.defer();
          // $log.debug('settingsMgr. setCurrentUser (user)', user);
          deferred.resolve(userUid);
          return deferred.promise;
    }; // setCurrentUser

    // Public API here
    return {
      getSettings: function () {
        return getExistingSettingsAsync();
      }, // getSettings

      getSetting: function (settingName) {
        return getExistingSettingAsync(settingName);
      }, // getSetting

      setSetting: function (settingName, value) {
        return setSettingAsync(settingName, value);
      }, // setSetting

      addUser: function (userUid, user) {
        return addUserAsync(userUid, user);
      },

      setCurrentUser: function (userUid) {
        return setCurrentUserAsync(userUid);
      },

      // THIS IS FOR UNIT TESTING ONLY
      $$$setDataSettings: function(userInfo) {
        data.settings = userInfo;
      }
    };

  });
