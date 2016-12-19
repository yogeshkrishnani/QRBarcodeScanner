function GooglePlus() {
}

GooglePlus.prototype.isAvailable = function (callback) {
  cordova.exec(callback, null, "GooglePlusAuth", "isAvailable", []);
};

GooglePlus.prototype.login = function (options, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "GooglePlusAuth", "login", [options]);
};

GooglePlus.prototype.trySilentLogin = function (options, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "GooglePlusAuth", "trySilentLogin", [options]);
};

GooglePlus.prototype.logout = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "GooglePlusAuth", "logout", []);
};

GooglePlus.prototype.disconnect = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "GooglePlusAuth", "disconnect", []);
};

GooglePlus.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.googleplus = new GooglePlus();
  return window.plugins.googleplus;
};

GooglePlus.install();