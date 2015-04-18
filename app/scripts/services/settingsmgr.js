'use strict';

/**
 * @ngdoc service
 * @name recipeshopperApp.settingsMgr
 * @description
 * # settingsMgr
 * Factory in the recipeshopperApp.
 */

angular.module('settingsMod', [
    'firebase',
  ]);
angular.module('settingsMod')
  .factory('settingsMgr', function ($rootScope, $log, $q, $http, $firebaseObject, FIREBASE_URL) {
    $log.debug('settingsMgr: init factory');

    var defaultSettings = {};
    var getDefaults = function () {
      $http.get('data/defaultsettings.json').success(function (result) {
        defaultSettings = result;
        // console.log('settingsMgr: getDefaults: data.settings BEFORE', data.settings);
        if (Object.keys(data.settings).length == 0) {
          data.settings = defaultSettings;
          // console.log('settingsMgr: getDefaults: data.settings', data.settings);
        }
        $log.debug('settingsMgr: getDefaults: defaultSettings', defaultSettings);
      });
    };

    var data = {};
    var initData = function () {
      data.currentUserUid = '';
      data.settings = defaultSettings;
      // console.log('settingsMgr: initData: data.settings', data.settings);
    };
    initData();
    getDefaults();

    var addUserFn = function (userUid, user) {
      var fbUrl = FIREBASE_URL + '/users/' + userUid;
      var ref = new Firebase(fbUrl);
      var userInfo = {
        myUid: userUid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      };
      for (var prop in defaultSettings) {
        if (defaultSettings.hasOwnProperty(prop)) {
          $log.debug('settingsMgr: addUserAsync:', prop + ' = ' + defaultSettings[prop]);
          userInfo[prop] = defaultSettings[prop];
        }
      }

      $log.debug('$log.logs to be unit tested:');
      $log.log(fbUrl);
      $log.log(userInfo);
      ref.set(userInfo);
    }; // addUserAsync

    var setCurrentUserAsync = function (userUid) {
      var fbUrl = FIREBASE_URL + '/users/' + userUid;
      data.ref = new Firebase(fbUrl);

      $log.debug('$log.logs to be unit tested:');
      $log.log(fbUrl);
      data.settings = $firebaseObject(data.ref);
      return data.settings.$loaded();
    }; // setCurrentUserAsync

    var clearCurrentUserAsync = function () {
      var deferred = $q.defer();
      $log.debug('settingsMgr. clearCurrentUserAsync');
      if (data && data.ref && data.settings) {
        data.settings.$destroy();
      }
      initData();
      deferred.resolve('');
      return deferred.promise;
    }; //clearCurrentUserAsync

    var currentUserHasNotChanged = function () {
      var deferred = $q.defer();
      deferred.resolve(data.currentUserUid);
      return deferred.promise;
    };

    var noCurrentUserErrorAsync = function () {
      var deferred = $q.defer();
      deferred.reject('Error: No current user');
      return deferred.promise;
    };

    var saveSettingsAsync = function () {
      if (data.currentUserUid) {
        return data.settings.$save();
      } // else
      return noCurrentUserErrorAsync();
    }; // setSettingAsync

    var setSettingAsync = function (settingName, value) {
      data.settings[settingName] = value;
      saveSettingsAsync();
    }; // setSettingAsync

    // Public API here
    return {
      addUser: function (userUid, user) {
        addUserFn(userUid, user);
      },

      setCurrentUser: function (userUid) {
        $log.debug('settingsMgr: setCurrentUser: data.currentUserUid, userUid BEFORE', data.currentUserUid, userUid);
        if (data.currentUserUid == userUid) {
          return currentUserHasNotChanged();
        }
        data.currentUserUid = userUid;
        // $log.debug('settingsMgr: setCurrentUser: data.currentUserUid, userUid', data.currentUserUid, userUid);
        var resultPromise = userUid ? setCurrentUserAsync(userUid) : clearCurrentUserAsync();
        resultPromise.then(function (result) {
          // $log.debug('settingsMgr: setCurrentUser: result', result);
          $log.debug('settingsMgr: setCurrentUser: data.settings', data.settings);
          $rootScope.$broadcast('handleCurrentUserSet');
        });
        return resultPromise;
      },

      getCurrentUser: function () {
        return data.currentUserUid;
      },

      getSettings: function () {
        return data.settings;
      }, // getSettings

      saveSettings: function () {
        return saveSettingsAsync();
      }, // saveSettings

      getSetting: function (settingName) {
        // return getExistingSettingAsync(settingName);
        return data.settings[settingName];
      }, // getSetting

      setSetting: function (settingName, value) {
        return setSettingAsync(settingName, value);
      } // setSetting

    };

  });
