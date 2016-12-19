

var Keyboard = function() {
};

cordova.argscheck = cordova.require('cordova/argscheck');
cordova.utils = cordova.require('cordova/utils');
cordova.channel = cordova.require('cordova/channel');

Keyboard.hideKeyboardAccessoryBar = function(hide) {
    cordova.exec(null, null, "Keyboard", "hideKeyboardAccessoryBar", [hide]);
};

Keyboard.close = function() {	
    cordova.exec(null, null, "Keyboard", "close", []);
};

Keyboard.show = function() {
    cordova.exec(null, null, "Keyboard", "show", []);
};

Keyboard.disableScroll = function(disable) {
    cordova.exec(null, null, "Keyboard", "disableScroll", [disable]);
};

/*
Keyboard.styleDark = function(dark) {
 cordova.exec(null, null, "Keyboard", "styleDark", [dark]);
};
*/

Keyboard.isVisible = false;

cordova.channel.onCordovaReady.subscribe(function() {
    cordova.exec(success, null, 'Keyboard', 'init', []);

    function success(msg) {
        var action = msg.charAt(0);
        if ( action === 'S' ) {
            var keyboardHeight = msg.substr(1);
            cordova.plugins.Keyboard.isVisible = true;
            cordova.fireWindowEvent('native.keyboardshow', { 'keyboardHeight': + keyboardHeight });

            //deprecated
            cordova.fireWindowEvent('native.showkeyboard', { 'keyboardHeight': + keyboardHeight });
        } else if ( action === 'H' ) {
            cordova.plugins.Keyboard.isVisible = false;
            cordova.fireWindowEvent('native.keyboardhide');

            //deprecated
            cordova.fireWindowEvent('native.hidekeyboard');
        }
    }
});

//module.exports = Keyboard;

if(!cordova.plugins)
	cordova.plugins = {};

cordova.plugins.Keyboard = Keyboard;

