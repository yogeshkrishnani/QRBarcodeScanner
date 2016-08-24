angular.module(config.appDirectives).directive('tabbedSlideBox',['$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$timeout', '$compile' , function($ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout, $compile) {
    return {
        restrict: 'E',
        /* compile : function(element, attrs) {
        	$(element).parent("ion-view").find("ion-slide-box").find("ion-content").attr("delegate-handle", "content");
        },*/
        link: function (scope, element, attrs) {
        	
        	var noTabs = $(element).find(".tab-nav.tabs a").length;
        	var tabWidth = $(element).find(".tab-nav.tabs a").width();
        	var parentWidth = $(element).find(".tab-nav.tabs").outerWidth() + noTabs;
        	
        	/*console.log("noTabs", noTabs);
        	console.log("tabWidth", tabWidth);
        	console.log("parentWidth", parentWidth);*/
        	
        	var tabNeedsToBeScrollable = noTabs * tabWidth > parentWidth;
        	
        	console.log("tabNeedsToBeScrollable : " + tabNeedsToBeScrollable);
        	
        	if(tabNeedsToBeScrollable || attrs.scroll == "true") {
        		scope.tabScroll = true;
        		//console.log("Making Tabs Scrollable");
        		
        		$(element).addClass("scrollableTabs");
                $(element).find(".tab-nav.tabs a").wrapAll("<div class='allLinks'></div>");

                var scrollableDiv = $compile("<ion-scroll delegate-handle='tabScrollHandle' class='scrollableDiv' dir='ltr' direction='x'></ion-scroll>")(scope);
                
                $(element).find('.allLinks').append(scrollableDiv);
                $(element).find(scrollableDiv).find('.scroll').append($('.allLinks a'));
                $(element).find(scrollableDiv).find("a").wrapAll("<div class='links'></div>");
        	}
        },
        controller: function ($scope, $element) {
        	
        	$scope.invokeTabController = function(tabItem) {
        		 if(!$(tabItem).hasClass("tab-cached")) {
        			var tabController = $scope[$(tabItem).attr("tab-controller")];
            		if(angular.isFunction(tabController)) {
    					tabController(tabItem);
            		}
            		if($(tabItem).attr("tab-cache") != "false") {
            			$(tabItem).addClass("tab-cached");
            		}
        		}
        		else {
        			console.log("Tab Content Cached");
        		}
        	};
        	
        	$scope.toggleActiveTabItem = function(tabItem) {
        		$($element).find(".tab-item-active").removeClass("tab-item-active");
    			$(tabItem).addClass("tab-item-active");
        	};
        	
        	$scope.handleTabScroll = function(elem) {
        		var scrollDelegate = $ionicScrollDelegate.$getByHandle("tabScrollHandle");
				var scrollWidth = $("ion-scroll").outerWidth();
				var elementPosLeft = $(elem).offset().left;
				var elementPosTop = $(elem).offset().top;
				var elementWidth = $(elem).width();
				var scrollPos = scrollDelegate.getScrollPosition().left;
				var nextTabVisibilityFactor = 0.75; // 0 to 1
				var nextTabVisibleMargin = (1 + nextTabVisibilityFactor) * elementWidth;
				
				var leftScrollValue = (elementPosLeft + nextTabVisibleMargin + scrollPos) - scrollWidth;
				
				console.log("leftScrollValue", leftScrollValue);
				//console.log("elementPosLeft", elementPosLeft);
				//console.log("elementWidth", elementWidth);
				//console.log("scrollPos", scrollPos);
				
				scrollDelegate.scrollTo(leftScrollValue, elementPosTop, true );
        	};
        	
        	$($element).find(".tab-item").unbind("click").bind("click", function() {
    			
    			//console.log("tabItem clicked");
    			
    			if($(this).hasClass("tab-item-active"))
    				return;
    			
    			var tabIndex = $(this).index();
    			
    			if($ionicSlideBoxDelegate.currentIndex() != tabIndex) {
    				$ionicSlideBoxDelegate.slide(tabIndex);
    			}
    			else {
    				$scope.toggleActiveTabItem(this);
        			$scope.invokeTabController(this);
    			}
    			
    			if($scope.tabScroll){
    				if(!$scope.firstTabAutoClick) {
    					$scope.handleTabScroll(this);
    				}
    				else {
    					$scope.firstTabAutoClick = false;
    				}
    			}
    			// It should be in a centralized place
    			$ionicScrollDelegate.$getByHandle("content").scrollTop();
    		});
        	
        	$scope.slideHasChanged = function(index) {
        		//console.log("Slide changed");
        		var respTabItem = $($element).find(".tab-item").get(index);
        		$scope.toggleActiveTabItem(respTabItem);
        		$scope.invokeTabController(respTabItem);
			};

        	$timeout(function() { // anything you want can go here and will safely be run on the next digest.
        		$ionicSlideBoxDelegate.enableSlide(false);
        		$scope.firstTabAutoClick = true;
        		$($element).find(".tab-item").first().trigger("click"); 
    		});
        }
    };
}]);