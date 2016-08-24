/* Application Modules - IONIC
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara 
 *
 * @Version
 * 1.2
 *
 */

(function () {
  'use strict';
  
  	angular.module(config.frameworkModuleName, []);

  	// Registering Base Framework Modules like directives, services, filters, etc.
  	for(var index = 0; index < config.baseFrameworkModules.length; index++ ) {
  		console.log("Registering Framework Module : " + config.baseFrameworkModules[index]);
  		config.registerFrameworkModule(config.baseFrameworkModules[index]);
  	}
  	
	// Adding Module Vendor Dependencies
  	for(var index = 0; index < config.frameworkModuleVendorDependencies.length; index++ ) {
  		console.log("Adding Framework Dependency : " + config.frameworkModuleVendorDependencies[index]);
  		config.addFrameworkDependency(config.frameworkModuleVendorDependencies[index]);
  	}
  	
})();