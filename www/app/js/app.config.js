/* Application Configuration - IONIC
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara
 *
 * @Version
 * 1.0
 *
 */

(function() {
	'use strict';

	window.appConfig  = (function () {
		
		/**************************** Override Framework Config Start ****************************/
		
		window.config.useLogin = false;
		window.config.connectionTimeout = 10 * 1000; // 10 seconds
		
		/**************************** Override Framework Config End ****************************/
		
		/********************************** App Config Start *************************************/
		
		var urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

		/********************************** App Config End ***************************************/
			
		return {
			urlRegex : urlRegex
		}
		
	})();
})();