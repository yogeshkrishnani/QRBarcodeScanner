angular.module(config.appDirectives).directive('ngCache', function() {

    return {
        restrict: 'A',
        link: function(scope, el, attrs) {

        	var r = new RegExp('^(?:[a-z]+:)?//', 'i');
        	
        	if($(el).is("IMG") ) {
        		attrs.$observe('ngSrc', function(src) {
                	var isUrlExternal = r.test(src);
                	if(!isUrlExternal) {
                		return;
                	}

                    ImgCache.isCached(src, function(path, success) {
                        if (success) {
                        	console.log("Image "+ src + " Is Cached");
                            ImgCache.useCachedFile(el);
                        } else {
                        	console.log("Image "+ src + " Is Not Cached, Starting To Cache It");
                            ImgCache.cacheFile(src, function() {
                            	console.log("Image "+ src + " Is Cached Now, Using It");
                                ImgCache.useCachedFile(el);
                            });
                        }
                    });
        		});
        	} else {
        		
        		attrs.$observe('ngBackgroungImage', function(src) {
        			
                	var isUrlExternal = r.test(src);
                	if(!isUrlExternal) {
                		return;
                	}

                    ImgCache.isCached(src, function(path, success) {
                        if (success) {
                        	console.log("Image "+ src + " Is Cached");
                        	ImgCache.getCachedFileURL(src, function(src, dest) {
                                 el.css({'background-image': 'url(' + dest + ')' });
                        	});
                        	
                        } else {
                        	console.log("Image "+ src + " Is Not Cached, Starting To Cache It");
                            ImgCache.cacheFile(src, function() {
                            	console.log("Image "+ src + " Is Cached");
                            	ImgCache.getCachedFileURL(src, function(src, dest) {
                                     el.css({'background-image': 'url(' + dest + ')' });
                            	});
                            });
                        }
                    });
                });
        	}
        }
    };
});