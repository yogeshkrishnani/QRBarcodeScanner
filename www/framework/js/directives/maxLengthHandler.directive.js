angular.module(config.appDirectives).directive('maxLengthHandler', function() {
   
	return {
        
    	restrict: 'A',
        link: function (scope, element, attrs) {
        	
        	var max_chars = parseInt($(element).attr("maxlength"));
        	var type =  $(element).attr("type");
        	
        	if( !isNaN(max_chars)  ) {
        		
        		$(element).keydown( function(e){
        			if(e.which == 8 || e.which == 229) { // 8 and 229 for backspace
        				return true;
        			}
        			else {
        				if(type == "number") {
        					if(e.which == 69) {  //69 for 'e' in input number (exponential)
        						return false;
        					}
        					else if($(this).val().replace(/[^0-9]/g,'').length >= max_chars) {
        						return false;
        					}
        					else {
        						return true;
        					}
        				}
        				else {
        					if($(this).val().length >= max_chars) {
        						return false;
        					}
        					else {
        						return true;
        					}
        				}
        			}
        		});
        		
        		$(element).keyup( function(e){
        			if ( $(this).val().isEmpty() ) {
        		        $(this).val("");
        		    }
        			else if(type == "number") {
    					if(e.which == 69 || $(this).val().replace(/[^0-9]/g,'').length > max_chars ) {  //69 for 'e' in input number (exponential)
    						$(this).val($(this).val().substr(0, max_chars));
    					}
    				}
        			else {
        				if ( $(this).val().length > max_chars ) {
            		        $(this).val($(this).val().substr(0, max_chars));
            		    }
        			}
        		});
        		
        	}
        }
    };
});
